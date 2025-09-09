export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  noindex?: boolean;
  nofollow?: boolean;
  alternateLanguages?: AlternateLanguage[];
  structuredData?: Record<string, unknown>;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export interface AlternateLanguage {
  href: string;
  hrefLang: string;
}

export interface PageSEOProps {
  seo: SEOConfig;
  locale?: string;
  pathname?: string;
}

export interface StructuredDataProps {
  data: Record<string, unknown>;
  type: 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'Product' | 'BreadcrumbList';
}
