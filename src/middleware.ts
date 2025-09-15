import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supportedLocales, defaultLocale } from "./lib/i18n";
import { adminMiddleware } from "./middleware-admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply admin security middleware first
  if (pathname.startsWith("/admin")) {
    return adminMiddleware(request);
  }

  // --- Exclude system routes completely ---
  if (
    pathname.startsWith("/api") ||               // API routes
    pathname.startsWith("/admin") ||             // Admin routes
    pathname === "/sitemap.xml" ||               // Sitemap
    pathname === "/robots.txt" ||                // Robots
    pathname.startsWith("/_next") ||             // Next.js internals
    pathname.startsWith("/_vercel") ||           // Vercel internals
    pathname.match(/\.[^/]+$/)                   // Any file with extension (.ico, .png, .txt, etc.)
  ) {
    return NextResponse.next();
  }

  // --- Locale handling ---
  const pathnameHasLocale = supportedLocales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const locale = pathname.split("/")[1] as string;

    if (!supportedLocales.includes(locale as any)) {
      // Invalid locale -> redirect to default
      const newPath = pathname.replace(`/${locale}`, "");
      return NextResponse.redirect(
        new URL(
          `/${defaultLocale}${newPath === "" ? "" : newPath}`,
          request.url
        )
      );
    }

    return NextResponse.next();
  }

  // No locale prefix -> redirect to default locale
  return NextResponse.redirect(
    new URL(
      `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
      request.url
    )
  );
}

// Only run on "page-like" routes
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
