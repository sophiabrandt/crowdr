import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { accessEnv } from './lib/access-env';
const PUBLIC_FILE = /\.(.*)$/;

const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(accessEnv('JWT_SECRET'))
  );

  return payload;
};

const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/register') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(accessEnv('COOKIE_NAME'));

  if (!jwt) {
    req.nextUrl.pathname = '/signin';
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    req.nextUrl.pathname = '/signin';
    return NextResponse.redirect(req.nextUrl);
  }
};

export default middleware;
