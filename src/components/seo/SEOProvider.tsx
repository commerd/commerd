import { ReactNode } from 'react';
import { 
  OrganizationStructuredData, 
  WebSiteStructuredData 
} from './StructuredData';
import { DEFAULT_SEO_CONFIG } from '@/lib/seo/constants';

interface SEOProviderProps {
  children: ReactNode;
  locale?: string;
}

export function SEOProvider({ children }: SEOProviderProps) {
  return (
    <>
      {/* Global Organization Schema */}
      <OrganizationStructuredData
        name={DEFAULT_SEO_CONFIG.siteName}
        url={DEFAULT_SEO_CONFIG.siteUrl}
        logo={`${DEFAULT_SEO_CONFIG.siteUrl}/logo.png`}
        description="Innovative business solutions and digital transformation services"
        contactPoint={{
          contactType: 'customer service',
          email: 'contact@commerd.com',
        }}
        sameAs={[
          'https://twitter.com/commerd',
          'https://linkedin.com/company/commerd',
          'https://github.com/commerd',
        ]}
      />

      {/* Global Website Schema */}
      <WebSiteStructuredData
        name={DEFAULT_SEO_CONFIG.siteName}
        url={DEFAULT_SEO_CONFIG.siteUrl}
        description="Discover innovative business solutions with Commerd"
        potentialAction={{
          '@type': 'SearchAction',
          target: `${DEFAULT_SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        }}
      />

      {children}
    </>
  );
}
