import { MetadataRoute } from 'next';
import { DEFAULT_SEO_CONFIG } from '@/lib/seo/constants';
import { i18nConfig } from '@/lib/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl;
  
  // Define your main pages here
  const staticPages = [
    '',
    '/about',
    '/services',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each page and locale
  staticPages.forEach(page => {
    i18nConfig.locales.forEach(locale => {
      const url = locale === i18nConfig.defaultLocale 
        ? `${baseUrl}${page}`
        : `${baseUrl}/${locale}${page}`;
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            i18nConfig.locales.map(loc => [
              loc === i18nConfig.defaultLocale ? 'x-default' : loc,
              loc === i18nConfig.defaultLocale 
                ? `${baseUrl}${page}`
                : `${baseUrl}/${loc}${page}`
            ])
          ),
        },
      });
    });
  });

  return sitemap;
}
