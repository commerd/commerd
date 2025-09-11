const fs = require('fs');
const path = require('path');

const siteUrl = 'https://commerd.com';
const routes = ['/', '/about'];
const locales = ['en', 'th'];

function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  routes.forEach(route => {
    locales.forEach(locale => {
      const url = `${siteUrl}/${locale}${route === '/' ? '' : route}`;
      const lastmod = new Date().toISOString();
      const priority = route === '/' ? '1.0' : '0.8';
      
      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>`;

      // Add hreflang alternates
      locales.forEach(lang => {
        const alternateUrl = `${siteUrl}/${lang}${route === '/' ? '' : route}`;
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${alternateUrl}" />`;
      });

      sitemap += `
  </url>
`;
    });
  });

  sitemap += `</urlset>`;

  // Write sitemap
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  
  // Write robots.txt
  const robots = `User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

Host: ${siteUrl}
Sitemap: ${siteUrl}/sitemap.xml
`;
  
  fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robots);
  
  console.log('✅ Sitemap and robots.txt generated successfully!');
  console.log(`📄 Generated ${routes.length * locales.length} URLs`);
}

generateSitemap();
