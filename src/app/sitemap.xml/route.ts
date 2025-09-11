import { NextResponse } from 'next/server';

const SITE = "https://commerd.com";
const LOCALES = ["en", "th"] as const;

export async function GET() {
  const routes = [
    { path: "/" },
    { path: "/about" },
  ];

  const urls = LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE}/${locale}${route.path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: route.path === "/" ? "daily" : "weekly",
      priority: route.path === "/" ? 1 : 0.8,
      alternates: LOCALES.map((l) => ({
        hreflang: l,
        href: `${SITE}/${l}${route.path}`,
      })).concat([{
        hreflang: "x-default",
        href: `${SITE}/en${route.path}`,
      }]),
    }))
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
    ${url.alternates.map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
