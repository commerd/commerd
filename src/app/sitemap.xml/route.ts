import { NextResponse } from "next/server";

const SITE = "https://commerd.com";

export async function GET() {
  const urls = [
    { loc: `${SITE}/en/`, changefreq: "daily", priority: "1.0" },
    { loc: `${SITE}/en/about`, changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE}/th/`, changefreq: "daily", priority: "1.0" },
    { loc: `${SITE}/th/about`, changefreq: "weekly", priority: "0.8" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${u.loc.replace(
      "/th",
      "/en"
    )}" />
    <xhtml:link rel="alternate" hreflang="th" href="${u.loc.replace(
      "/en",
      "/th"
    )}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.loc.replace(
      "/th",
      "/en"
    )}" />
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
