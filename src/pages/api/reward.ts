import { validateCookie, validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const addReward = async (
  name: string,
  description: string,
  expected_due: string,
  projectId: string,
  ownerId: string
) => {
  return await db.reward.create({
    data: {
      name,
      description,
      expected_due,
      ownerId,
      projectId,
    },
  });
};

const handleErrors = (err: unknown, res: NextApiResponse) => {
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2002'
  ) {
    return res.status(404).json({ message: 'Unique constraint error' });
  }

  const errorMessage =
    err instanceof Error ? err.message : 'Could not perform action';
  return res.status(500).json({ message: errorMessage });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookie = validateCookie(req);
    const { payload } = await validateJWT(cookie);
    await addReward(
      req.body.name,
      req.body.description,
      req.body.expected_due,
      req.body.projectId,
      payload.id
    );

    return res.json({ data: { message: 'ok' } });
  } catch (err) {
    return handleErrors(err, res);
  }
};

export default handler;
