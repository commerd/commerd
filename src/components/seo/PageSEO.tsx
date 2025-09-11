import { ReactNode } from 'react';
import { SEOConfig } from '@/lib/seo/types';
import { WebPageStructuredData, BreadcrumbStructuredData } from './StructuredData';
import { generateCanonicalUrl } from '@/lib/seo/utils';
import { DEFAULT_SEO_CONFIG } from '@/lib/seo/constants';

interface PageSEOComponentProps {
  seo: SEOConfig;
  locale?: string;
  pathname?: string;
  children?: ReactNode;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export function PageSEO({ 
  seo, 
  locale, 
  pathname, 
  children, 
  breadcrumbs 
}: PageSEOComponentProps) {
  const canonical = seo.canonical || 
    generateCanonicalUrl(DEFAULT_SEO_CONFIG.siteUrl, pathname || '/', locale);

  return (
    <>
      {/* Page-specific structured data */}
      <WebPageStructuredData
        name={seo.title}
        url={canonical}
        description={seo.description}
        isPartOf={{
          '@type': 'WebSite',
          name: DEFAULT_SEO_CONFIG.siteName,
          url: DEFAULT_SEO_CONFIG.siteUrl,
        }}
        breadcrumb={breadcrumbs ? {
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        } : undefined}
      />

      {/* Breadcrumb structured data */}
      {breadcrumbs && (
        <BreadcrumbStructuredData items={breadcrumbs} />
      )}

      {/* Custom structured data */}
      {seo.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.structuredData, null, 2),
          }}
        />
      )}

      {children}
    </>
  );
}
