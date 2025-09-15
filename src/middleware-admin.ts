import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_SECURITY_CONFIG } from './lib/admin/security';

export function adminMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Create response
  const response = NextResponse.next();

  // Add security headers
  Object.entries(ADMIN_SECURITY_CONFIG.headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add additional security headers
  response.headers.set('X-Admin-Interface', 'true');
  response.headers.set('X-Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
