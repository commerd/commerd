import { MetadataRoute } from 'next';
import { DEFAULT_SEO_CONFIG } from '@/lib/seo/constants';
import { i18nConfig } from '@/lib/i18n/config';
import { getLocalizedUrl } from '@/lib/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl;
  
  // Root sitemap with all pages and hreflang alternates
  const staticPages = [
    '',        // Homepage
    '/about',  // About page
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each page and locale with hreflang
  staticPages.forEach(page => {
    const cleanPage = page === '' ? '/' : page;
    
    i18nConfig.locales.forEach(locale => {
      const localizedPath = getLocalizedUrl(cleanPage, locale);
      const url = `${baseUrl}${localizedPath}`;
      
      // Generate hreflang alternates for this page
      const alternates: Record<string, string> = {};
      i18nConfig.locales.forEach(altLocale => {
        const altPath = getLocalizedUrl(cleanPage, altLocale);
        const altUrl = `${baseUrl}${altPath}`;
        alternates[altLocale] = altUrl;
      });
      
      // Add x-default pointing to English
      const defaultPath = getLocalizedUrl(cleanPage, 'en');
      alternates['x-default'] = `${baseUrl}${defaultPath}`;
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemap;
}
