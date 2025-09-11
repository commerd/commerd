// SEO Components and Utilities
export { PageSEO } from './PageSEO';

// Structured Data
export {
  StructuredData,
  OrganizationStructuredData,
  WebSiteStructuredData,
  WebPageStructuredData,
  ArticleStructuredData,
  BreadcrumbStructuredData,
} from './StructuredData';

// Utilities and Types
export { generateMetadata } from '@/lib/seo/utils';
export type { SEOConfig, PageSEOProps, StructuredDataProps } from '@/lib/seo/types';
export { DEFAULT_SEO_CONFIG, SEO_DEFAULTS } from '@/lib/seo/constants';
export { getSEOContent } from '@/lib/seo/content';
export { i18nConfig, type Locale } from '@/lib/i18n/config';