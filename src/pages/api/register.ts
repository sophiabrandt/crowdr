import { accessEnv } from '@/lib/access-env';
import { createJWT, hashPassword, httpMethod } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return await db.user.create({
    data: {
      email,
      password: await hashPassword(password),
      firstName,
      lastName,
    },
  });
};

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await registerUser(
    req.body.email,
    req.body.password,
    req.body.firstName,
    req.body.lastName
  );

  const jwt = await createJWT(user);

  res.setHeader(
    'Set-Cookie',
    serialize(accessEnv('COOKIE_NAME'), jwt, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  return res.status(201).json({});
};

export default httpMethod('POST')(registerHandler);
