import { MetadataRoute } from 'next';
import { DEFAULT_SEO_CONFIG } from '@/lib/seo/constants';
import { i18nConfig, type Locale } from '@/lib/i18n/config';
import { getLocalizedUrl } from '@/lib/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl;
  
  // Define your actual pages here (only include pages that exist)
  const staticPages = [
    '',        // Homepage
    '/about',  // About page
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each page and locale
  staticPages.forEach(page => {
    const cleanPage = page === '' ? '/' : page;
    
    i18nConfig.locales.forEach(locale => {
      const localizedPath = getLocalizedUrl(cleanPage, locale as Locale);
      const url = `${baseUrl}${localizedPath}`;
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    });
  });

  return sitemap;
}
