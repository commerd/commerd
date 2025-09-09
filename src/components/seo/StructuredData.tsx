import { StructuredDataProps } from '@/lib/seo/types';

export function StructuredData({ data, type }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}

// Pre-built structured data components
export function OrganizationStructuredData({
  name,
  url,
  logo,
  description,
  contactPoint,
  sameAs,
}: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
  sameAs?: string[];
}) {
  return (
    <StructuredData
      type="Organization"
      data={{
        name,
        url,
        logo,
        description,
        contactPoint,
        sameAs,
      }}
    />
  );
}

export function WebSiteStructuredData({
  name,
  url,
  description,
  potentialAction,
}: {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}) {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name,
        url,
        description,
        potentialAction,
      }}
    />
  );
}

export function WebPageStructuredData({
  name,
  url,
  description,
  isPartOf,
  breadcrumb,
}: {
  name: string;
  url: string;
  description?: string;
  isPartOf?: {
    '@type': string;
    name: string;
    url: string;
  };
  breadcrumb?: {
    '@type': string;
    itemListElement: Array<{
      '@type': string;
      position: number;
      name: string;
      item: string;
    }>;
  };
}) {
  return (
    <StructuredData
      type="WebPage"
      data={{
        name,
        url,
        description,
        isPartOf,
        breadcrumb,
      }}
    />
  );
}

export function ArticleStructuredData({
  headline,
  description,
  image,
  author,
  publisher,
  datePublished,
  dateModified,
  url,
}: {
  headline: string;
  description: string;
  image?: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  url: string;
}) {
  return (
    <StructuredData
      type="Article"
      data={{
        headline,
        description,
        image,
        author,
        publisher,
        datePublished,
        dateModified,
        url,
      }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{
    name: string;
    url: string;
  }>;
}) {
  return (
    <StructuredData
      type="BreadcrumbList"
      data={{
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
