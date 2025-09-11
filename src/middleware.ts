import { NextRequest, NextResponse } from 'next/server';
import { supportedLocales, defaultLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.endsWith('/sitemap.xml') ||
    pathname.endsWith('/robots.txt')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = supportedLocales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname
    const locale = pathname.split('/')[1] as string;
    
    // Validate locale
    if (!supportedLocales.includes(locale as any)) {
      // Invalid locale, redirect to default locale version
      const newPath = pathname.replace(`/${locale}`, '');
      return NextResponse.redirect(new URL(`/${defaultLocale}${newPath === '' ? '' : newPath}`, request.url));
    }

    // Valid locale, continue
    return NextResponse.next();
  }

  // No locale prefix - redirect to default locale
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - other static assets
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
