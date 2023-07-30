import { accessEnv } from '@/lib/access-env';
import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const validateCookie = (req: NextApiRequest) => {
  const cookie = req.cookies[accessEnv('COOKIE_NAME')];
  if (!cookie) throw new Error('Not authorized');
  return cookie;
};

const createProject = async (name: string, ownerId: string) => {
  return await db.project.create({
    data: {
      name,
      ownerId,
    },
  });
};

const handleErrors = (err: unknown, res: NextApiResponse) => {
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2002'
  ) {
    return res.status(404).json({ message: 'Project name must be unique' });
  }

  const errorMessage =
    err instanceof Error ? err.message : 'Could not perform action';
  return res.status(500).json({ message: errorMessage });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookie = validateCookie(req);
    const { payload } = await validateJWT(cookie);
    await createProject(req.body.name, payload.id);

    return res.json({ data: { message: 'ok' } });
  } catch (err) {
    return handleErrors(err, res);
  }
};

export default handler;
