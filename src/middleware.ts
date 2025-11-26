import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Enforce HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    const proto = req.headers.get('x-forwarded-proto') || req.nextUrl.protocol;
    if (proto && proto !== 'https') {
      const url = req.nextUrl.clone();
      url.protocol = 'https';
      return NextResponse.redirect(url);
    }
  }

  // Add a small set of security headers at runtime as a defense-in-depth.
  const headers = res.headers;
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', "geolocation=(), microphone=(), camera=()");

  return res;
}

export const config = {
  matcher: '/:path*',
};
