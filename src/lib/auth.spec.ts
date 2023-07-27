import {
  hashPassword,
  comparePasswords,
  createJWT,
  validateJWT,
  httpMethod,
  isJWTVerifyPayload,
  getUserFromCookie,
} from './auth';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { assertType } from '@/helpers/utils';
import { SignJWT, jwtVerify } from 'jose';
import { PrismaClient } from '@prisma/client';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { accessEnv } from './access-env';

describe('Authentication utilities', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = {
      ...originalEnv,
      JWT_SECRET: 'testSecret',
      COOKIE_NAME: 'testCookie',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it('should hash a given password', async () => {
    const bcryptSpy = jest.spyOn(bcrypt, 'hash');
    const password = 'password';
    await hashPassword(password);
    expect(bcryptSpy).toHaveBeenCalledWith(password, 10);
  });

  it('should correctly compare a password and its hash', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    const result = await comparePasswords(password, hashedPassword);
    expect(result).toBeTruthy();
  });

  it('createJWT should create a JWT with the user payload', async () => {
    const user = { id: '1', email: 'test@example.com' };
    const jwt = await createJWT(user);
    const jwtComponents = jwt.split('.');
    expect(jwtComponents).toHaveLength(3);
  });

  it('should create a JWT with correct payload and headers', async () => {
    const user = { id: '1', email: 'test@example.com' };
    const jwt = await createJWT(user);
    const decodedJwt: any = await jwtVerify(
      jwt,
      new TextEncoder().encode(accessEnv('JWT_SECRET'))
    );
    expect(decodedJwt.payload.payload).toEqual(user);
  });

  it('should correctly validate the JWT', async () => {
    const user = { id: '1', email: 'test@example.com' };
    const jwt = await createJWT(user);
    const decodedJwt = await validateJWT(jwt);
    expect(decodedJwt.payload).toEqual(user);
  });

  it('should throw error for invalid JWT payload', async () => {
    // Create a JWT with missing 'email' field in the payload
    const secret = new TextEncoder().encode(accessEnv('JWT_SECRET'));
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;
    const invalidPayload = { id: '1' };

    const jwt = await new SignJWT({ payload: invalidPayload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(secret);

    await expect(validateJWT(jwt)).rejects.toThrow('Unexpected JWT payload');
  });

  it('should correctly retrieve the user', async () => {
    const user = { id: '1', email: 'test@example.com' };
    const jwt = await createJWT(user);
    const cookies = assertType<ReadonlyRequestCookies>({
      get: (_name: string) => {
        return { value: jwt };
      },
    });

    const mockDb = assertType<PrismaClient>({
      user: {
        findUniqueOrThrow: jest.fn().mockResolvedValue(user),
      },
    });

    const retrievedUser = await getUserFromCookie({
      cookies,
      db: mockDb,
      includeProjects: false,
    });
    expect(retrievedUser).toEqual(user);
  });

  it('should throw error when no JWT present', async () => {
    const cookies = assertType<ReadonlyRequestCookies>({
      get: (_name: string) => {
        return null;
      },
    });

    const mockDb = assertType<PrismaClient>({
      user: {
        findUniqueOrThrow: jest.fn(),
      },
    });

    await expect(
      getUserFromCookie({ cookies, db: mockDb, includeProjects: false })
    ).rejects.toThrow('No JWT');
  });

  it('getUserFromCookie should throw error when user not found', async () => {
    const user = { id: '1', email: 'test@example.com' };
    const jwt = await createJWT(user);
    const cookies = assertType<ReadonlyRequestCookies>({
      get: (_name: string) => {
        return { value: jwt };
      },
    });

    const mockDb = assertType<PrismaClient>({
      user: {
        findUniqueOrThrow: jest
          .fn()
          .mockRejectedValue(new Error('No User found')),
      },
    });

    await expect(
      getUserFromCookie({ cookies, db: mockDb, includeProjects: false })
    ).rejects.toThrowError(new Error('No User found'));
  });

  it('should identify valid and invalid payloads', () => {
    const validPayload = {
      payload: { id: '1', email: 'test@example.com' },
      exp: 1234567890,
      iat: 1234567890,
      nbf: 1234567890,
    };
    const invalidPayload = { ...validPayload, exp: 'not-a-number' };
    expect(isJWTVerifyPayload(validPayload)).toBeTruthy();
    expect(isJWTVerifyPayload(invalidPayload)).toBeFalsy();
  });

  it('should validate HTTP method correctly', async () => {
    const handler = jest.fn();
    const req = assertType<NextApiRequest>({ method: 'GET' });
    const res = assertType<NextApiResponse>({
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    });

    const wrappedHandler = httpMethod('GET')(handler);
    await wrappedHandler(req, res);
    expect(handler).toBeCalledTimes(1);
    expect(res.status).not.toBeCalled();

    wrappedHandler(assertType<NextApiRequest>({ ...req, method: 'POST' }), res);
    expect(res.status).toBeCalledWith(405);
  });
});
