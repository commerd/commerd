import { Metadata } from 'next';
import { SEOConfig, PageSEOProps } from '@/lib/seo/types';
import { 
  generateCanonicalUrl, 
  generateAlternateUrls, 
  generateKeywordsString,
  generateMetaTitle,
  validateSEOConfig 
} from '@/lib/seo/utils';
import { DEFAULT_SEO_CONFIG, SEO_DEFAULTS } from '@/lib/seo/constants';

export function generateMetadata(
  seo: SEOConfig,
  locale?: string,
  pathname?: string
): Metadata {
  const validatedSEO = validateSEOConfig(seo);
  const canonical = validatedSEO.canonical || 
    generateCanonicalUrl(DEFAULT_SEO_CONFIG.siteUrl, pathname || '/', locale);
  
  const alternateLanguages = validatedSEO.alternateLanguages || 
    generateAlternateUrls(DEFAULT_SEO_CONFIG.siteUrl, pathname || '/', DEFAULT_SEO_CONFIG.supportedLocales);

  const metadata: Metadata = {
    title: generateMetaTitle(validatedSEO.title, DEFAULT_SEO_CONFIG.siteName),
    description: validatedSEO.description,
    keywords: generateKeywordsString(validatedSEO.keywords),
    authors: [{ name: validatedSEO.author || SEO_DEFAULTS.author }],
    creator: validatedSEO.author || SEO_DEFAULTS.author,
    publisher: DEFAULT_SEO_CONFIG.siteName,
    
    // Canonical and alternates
    alternates: {
      canonical,
      languages: Object.fromEntries(
        alternateLanguages.map(alt => [alt.hrefLang, alt.href])
      ),
    },

    // Open Graph
    openGraph: {
      type: validatedSEO.ogType || SEO_DEFAULTS.ogType,
      title: validatedSEO.title,
      description: validatedSEO.description,
      url: canonical,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      images: [
        {
          url: validatedSEO.ogImage || DEFAULT_SEO_CONFIG.defaultOgImage,
          width: 1200,
          height: 630,
          alt: validatedSEO.title,
        },
      ],
      locale: locale || DEFAULT_SEO_CONFIG.defaultLocale,
    },

    // Twitter
    twitter: {
      card: validatedSEO.twitterCard || SEO_DEFAULTS.twitterCard,
      title: validatedSEO.title,
      description: validatedSEO.description,
      images: [validatedSEO.ogImage || DEFAULT_SEO_CONFIG.defaultOgImage],
      creator: DEFAULT_SEO_CONFIG.twitterHandle,
    },

    // Robots
    robots: {
      index: !validatedSEO.noindex,
      follow: !validatedSEO.nofollow,
      googleBot: {
        index: !validatedSEO.noindex,
        follow: !validatedSEO.nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Additional meta tags
    other: {
      'article:author': validatedSEO.author || SEO_DEFAULTS.author,
      'article:section': validatedSEO.section,
      'article:tag': validatedSEO.tags?.join(', '),
      'article:published_time': validatedSEO.publishedTime,
      'article:modified_time': validatedSEO.modifiedTime,
    },
  };

  return metadata;
}

interface SEOHeadProps extends PageSEOProps {
  children?: React.ReactNode;
}

export function SEOHead({ seo, locale, pathname, children }: SEOHeadProps) {
  // This component is mainly for server-side metadata generation
  // The actual metadata is handled by the generateMetadata function
  return <>{children}</>;
}
