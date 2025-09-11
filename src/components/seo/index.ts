// Core SEO components
export { PageSEO } from './PageSEO';
export { generateMetadata } from '@/lib/seo/utils';

// Structured data components
export {
  StructuredData,
  OrganizationStructuredData,
  WebSiteStructuredData,
  WebPageStructuredData,
  ArticleStructuredData,
  BreadcrumbStructuredData,
} from './StructuredData';

// Types and utilities
export type { SEOConfig, PageSEOProps, StructuredDataProps } from '@/lib/seo/types';
export { DEFAULT_SEO_CONFIG, SEO_DEFAULTS } from '@/lib/seo/constants';
export { getSEOContent } from '@/lib/seo/content';
export { i18nConfig, type Locale } from '@/lib/i18n/config';
