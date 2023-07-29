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

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: payload.id,
    },
  });

  return res.json({ data: { message: 'ok' } });
};

export default handler;
