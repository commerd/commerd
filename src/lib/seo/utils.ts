import { SEOConfig } from './types';

export function generateCanonicalUrl(baseUrl: string, pathname: string, locale?: string): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const localePrefix = locale && locale !== 'en' ? `/${locale}` : '';
  return `${baseUrl}${localePrefix}${cleanPath}`;
}

export function generateAlternateUrls(
  baseUrl: string,
  pathname: string,
  locales: string[]
): Array<{ href: string; hrefLang: string }> {
  return locales.map(locale => ({
    href: generateCanonicalUrl(baseUrl, pathname, locale),
    hrefLang: locale === 'en' ? 'x-default' : locale
  }));
}

export function generateKeywordsString(keywords?: string[]): string {
  return keywords ? keywords.join(', ') : '';
}

export function generateMetaTitle(title: string, siteName?: string, separator = '|'): string {
  return siteName ? `${title} ${separator} ${siteName}` : title;
}

export function generateMetaDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
}

export function validateSEOConfig(seo: SEOConfig): SEOConfig {
  return {
    ...seo,
    title: seo.title.trim(),
    description: generateMetaDescription(seo.description),
    keywords: seo.keywords?.filter(Boolean).map(k => k.trim()),
  };
}

export function generateStructuredDataUrl(baseUrl: string, pathname: string): string {
  return `${baseUrl}${pathname}`;
}
