import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supportedLocales, defaultLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Belt-and-braces guard - immediately skip XML/TXT files
  if (pathname.endsWith('.xml') || pathname.endsWith('.txt')) {
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

// Exact pattern from next-intl docs - excludes dot paths
export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
