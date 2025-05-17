import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt_access')?.value;

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/login';
  const isProtectedPage = pathname.startsWith('/home');

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // อื่น ๆ ปล่อยผ่าน
  return NextResponse.next();
}
