import { SEOConfig } from './types';
import { getLocalizedUrl, generateHreflangAlternates } from '../i18n/routing';
import { type Locale } from '../i18n/config';

export function generateCanonicalUrl(baseUrl: string, pathname: string, locale?: string): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!locale) return `${baseUrl}${cleanPath}`;
  
  const localizedPath = getLocalizedUrl(cleanPath, locale as Locale);
  return `${baseUrl}${localizedPath}`;
}

export function generateAlternateUrls(
  baseUrl: string,
  pathname: string,
  _locales: string[]
): Array<{ href: string; hrefLang: string }> {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const alternates = generateHreflangAlternates(cleanPath);
  
  return alternates.map(alt => ({
    href: `${baseUrl}${alt.href}`,
    hrefLang: alt.hrefLang === 'en' ? 'x-default' : alt.hrefLang
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

export function generateMetadata(seo: SEOConfig, locale: string, pathname: string) {
  const canonical = seo.canonical || generateCanonicalUrl(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000', pathname, locale);
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    canonical,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      type: seo.ogType || 'website',
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      card: seo.twitterCard || 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    alternates: {
      canonical,
      languages: seo.alternateLanguages?.reduce((acc, alt) => {
        acc[alt.hrefLang] = alt.href;
        return acc;
      }, {} as Record<string, string>),
    },
    robots: {
      index: !seo.noindex,
      follow: !seo.nofollow,
    },
  };
}
