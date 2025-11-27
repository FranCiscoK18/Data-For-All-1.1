import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/denuncias', '/admin', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((pathname === '/login' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/denuncias', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/denuncias/:path*', '/admin/:path*', '/profile/:path*', '/login', '/signup'],
};
