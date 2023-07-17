import { accessEnv } from '@/lib/access-env';
import { comparePasswords, createJWT, httpMethod } from '@/lib/auth';
import { db } from '@/lib/db';
import { User } from '@prisma/client';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const findUser = async (
  email: string,
  password: string
): Promise<{ isSameUser: boolean; user: User | null }> => {
  const user: User | null = await db.user.findUnique({
    where: {
      email,
    },
  });

  const isSameUser = await comparePasswords(password, user?.password ?? '');

  return { isSameUser, user };
};

const authenticateUser =
  (
    handler: (
      user: User,
      req: NextApiRequest,
      res: NextApiResponse
    ) => Promise<void>
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { isSameUser, user } = await findUser(
      req.body.email,
      req.body.password
    );
    if (!user || !isSameUser) {
      return res.status(401).json({ message: 'Invalid user or password' });
    }
    return handler(user, req, res);
  };

const signInHandler = authenticateUser(
  async (
    user: User,
    _req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> => {
    const jwt = await createJWT(user);

    res.setHeader(
      'Set-Cookie',
      serialize(accessEnv('COOKIE_NAME'), jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    return res.status(201).json({ message: 'User signed in successfully' });
  }
);

export default httpMethod('POST')(signInHandler);
