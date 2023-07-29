import { accessEnv } from '@/lib/access-env';
import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = req.cookies[accessEnv('COOKIE_NAME')];
  if (!cookie) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  const { payload } = await validateJWT(cookie);

  try {
    await db.project.create({
      data: {
        name: req.body.name,
        ownerId: payload.id,
      },
    });
    return res.json({ data: { message: 'ok' } });
  } catch (err) {
    const message =
      err instanceof Error ? `${err.message}` : 'Could not perform action';
    return res.status(500).json({ message });
  }
};

export default handler;
