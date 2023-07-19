import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import middleware from './middleware';
import { assertType } from './util';

jest.mock('jose', () => ({ jwtVerify: jest.fn() }));
jest.mock('./lib/access-env', () => ({
  accessEnv: jest.fn().mockReturnValue('SECRET'),
}));

describe('Middleware', () => {
  const mockCookiesGet = jest.fn();

  const mockReq = assertType<NextRequest>({
    nextUrl: { pathname: '', host: '', protocol: '' },
    cookies: { get: mockCookiesGet },
  });

  beforeEach(() => {
    jest.spyOn(NextResponse, 'next').mockReturnValueOnce(new NextResponse());
    jest
      .spyOn(NextResponse, 'redirect')
      .mockReturnValueOnce(new NextResponse());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next for specific paths', async () => {
    const paths = ['/api', '/_next', '/static', '/signin', '/register'];
    for (const path of paths) {
      mockReq.nextUrl.pathname = path;
      await middleware(mockReq);
      expect(NextResponse.next).toHaveBeenCalled();
    }
  });

  it('should redirect to signin if no JWT in cookies', async () => {
    mockReq.nextUrl.pathname = '/private';
    mockCookiesGet.mockReturnValue(undefined);
    await middleware(mockReq);
    expect(NextResponse.redirect).toHaveBeenCalled();
  });

  it('should call next if JWT is valid', async () => {
    mockReq.nextUrl.pathname = '/private';
    mockCookiesGet.mockReturnValue({ value: 'valid_jwt' });
    assertType<jest.Mock>(jwtVerify).mockResolvedValue({
      payload: 'valid_payload',
    });
    await middleware(mockReq);
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it('should redirect to signin if JWT is invalid', async () => {
    mockReq.nextUrl.pathname = '/private';
    mockCookiesGet.mockReturnValue({ value: 'invalid_jwt' });
    assertType<jest.Mock>(jwtVerify).mockRejectedValue(new Error());
    await middleware(mockReq);
    expect(NextResponse.redirect).toHaveBeenCalled();
  });
});
