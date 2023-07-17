import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';
import { accessEnv } from './access-env';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface Payload {
  id: string;
  email: string;
}

interface JWTVerifyPayload {
  payload: Payload;
  exp: number;
  iat: number;
  nbf: number;
}

export const getDecodedSecret = (): Uint8Array => {
  return new TextEncoder().encode(accessEnv('JWT_SECRET'));
};

export const hashPassword = (password: string | Buffer) =>
  bcrypt.hash(password, 10);

export const comparePasswords = (
  plainTextPassword: string | Buffer,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user: Partial<User>) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;
  const secret = getDecodedSecret();

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(secret);
};

function isJWTVerifyPayload(obj: any): obj is JWTVerifyPayload {
  return (
    obj &&
    typeof obj === 'object' &&
    'payload' in obj &&
    typeof obj.payload === 'object' &&
    'id' in obj.payload &&
    typeof obj.payload.id === 'string' &&
    'email' in obj.payload &&
    typeof obj.payload.email === 'string' &&
    'exp' in obj &&
    typeof obj.exp === 'number' &&
    'iat' in obj &&
    typeof obj.iat === 'number' &&
    'nbf' in obj &&
    typeof obj.nbf === 'number'
  );
}

const verifyAndValidateJWT = async (
  jwt: string | Uint8Array,
  secret: Uint8Array
): Promise<JWTVerifyPayload> => {
  const { payload } = await jwtVerify(jwt, secret);

  if (!isJWTVerifyPayload(payload)) {
    throw new Error('Unexpected JWT payload');
  }

  return payload;
};

export const validateJWT = async (
  jwt: string | Uint8Array
): Promise<JWTVerifyPayload> => {
  const secret = getDecodedSecret();
  return verifyAndValidateJWT(jwt, secret);
};

export const getUserFromCookie = async (cookies: RequestCookies) => {
  const cookieName = accessEnv('COOKIE_NAME');
  const jwt = cookies.get(cookieName);
  if (!jwt) {
    throw new Error('No JWT');
  }

  const {
    payload: { id },
  } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const httpMethod =
  (method: string) =>
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    return handler(req, res);
  };
