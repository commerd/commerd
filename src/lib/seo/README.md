# SEO Architecture Documentation

This document outlines the comprehensive SEO architecture implemented in the Commerd project, designed for scalability, internationalization, and optimal search engine performance.

## Architecture Overview

The SEO system is built with a hierarchical component structure that separates concerns and provides maximum flexibility:

```
src/
├── lib/seo/
│   ├── types.ts          # TypeScript interfaces and types
│   ├── utils.ts          # Utility functions for SEO operations
│   ├── constants.ts      # Default configurations and constants
│   └── content.ts        # Multi-language SEO content management
├── components/seo/
│   ├── SEOHead.tsx       # Core metadata generation
│   ├── SEOProvider.tsx   # Global SEO context provider
│   ├── PageSEO.tsx       # Page-specific SEO wrapper
│   ├── StructuredData.tsx # Rich snippets and schema markup
│   └── index.ts          # Centralized exports
└── lib/i18n/
    └── config.ts         # Internationalization configuration
```

## Key Features

### 1. **Server-Side SEO**
- All SEO components are server-side rendered
- No `use client` directives in SEO components
- Optimal performance and search engine compatibility

### 2. **Internationalization Ready**
- Support for multiple languages (EN, DA, SV, NO, DE, FR, ES)
- Automatic hreflang generation
- Localized content management
- Language-specific metadata

### 3. **Structured Data**
- Pre-built schema.org components
- Organization, Website, WebPage, Article schemas
- Breadcrumb navigation markup
- Custom structured data support

### 4. **Dynamic Metadata**
- Page-specific metadata generation
- Template-based title generation
- Automatic canonical URL generation
- Open Graph and Twitter Card optimization

### 5. **SEO Content Management**
- Centralized content repository
- Multi-language content support
- Easy content updates and maintenance
- Type-safe content management

## Usage Examples

### Basic Page Implementation

```tsx
import { generateMetadata as generateSEOMetadata } from "@/components/seo";
import { getSEOContent } from "@/lib/seo/content";
import { PageSEO } from "@/components/seo";

// Generate metadata for this page
export async function generateMetadata() {
  const seoContent = getSEOContent('home', 'en');
  return generateSEOMetadata(seoContent, 'en', '/');
}

export default function Home() {
  const seoContent = getSEOContent('home', 'en');
  
  return (
    <PageSEO seo={seoContent} locale="en" pathname="/">
      {/* Your page content */}
    </PageSEO>
  );
}
```

### Adding New Pages

1. **Add content to `content.ts`:**
```typescript
export const seoContent: Record<string, Record<Locale, SEOConfig>> = {
  // ... existing content
  newPage: {
    en: {
      title: 'New Page Title',
      description: 'Page description',
      keywords: ['keyword1', 'keyword2'],
    },
    // ... other languages
  },
};
```

2. **Create the page component:**
```tsx
export async function generateMetadata() {
  const seoContent = getSEOContent('newPage', 'en');
  return generateSEOMetadata(seoContent, 'en', '/new-page');
}

export default function NewPage() {
  const seoContent = getSEOContent('newPage', 'en');
  
  return (
    <PageSEO seo={seoContent} locale="en" pathname="/new-page">
      {/* Page content */}
    </PageSEO>
  );
}
```

### Custom Structured Data

```tsx
import { StructuredData } from "@/components/seo";

<StructuredData
  type="Product"
  data={{
    name: "Product Name",
    description: "Product description",
    price: "99.99",
    currency: "USD",
  }}
/>
```

## Configuration

### Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
GOOGLE_SITE_VERIFICATION=your_verification_code
YANDEX_VERIFICATION=your_verification_code
YAHOO_VERIFICATION=your_verification_code
```

### Site Configuration

Update `src/lib/seo/constants.ts`:

```typescript
export const DEFAULT_SEO_CONFIG = {
  siteName: 'Your Site Name',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com',
  defaultLocale: 'en',
  supportedLocales: ['en', 'da', 'sv', 'no', 'de', 'fr', 'es'],
  defaultOgImage: '/og-image.jpg',
  twitterHandle: '@yourhandle',
  author: 'Your Name',
} as const;
```

## Best Practices

### 1. **Content Structure**
- Keep SEO content in the centralized `content.ts` file
- Use descriptive, keyword-rich titles and descriptions
- Maintain consistent tone across languages
- Update content regularly for freshness

### 2. **Technical SEO**
- Always use the `generateMetadata` function for pages
- Implement proper breadcrumb navigation
- Use semantic HTML structure
- Optimize images with proper alt text

### 3. **Performance**
- All SEO components are server-side rendered
- Minimal JavaScript for SEO functionality
- Optimized structured data loading
- Efficient metadata generation

### 4. **Scalability**
- Add new languages by updating the i18n config
- Extend structured data types as needed
- Use the content management system for easy updates
- Maintain consistent component hierarchy

## Monitoring and Analytics

### Google Search Console
- Monitor search performance
- Track structured data errors
- Analyze international targeting

### SEO Tools Integration
- Built-in support for verification codes
- Sitemap and robots.txt generation
- Meta tag optimization

## Future Enhancements

The architecture is designed to support:
- Dynamic content generation
- A/B testing for SEO elements
- Advanced analytics integration
- Content management system integration
- Automated SEO auditing

This SEO architecture provides a solid foundation for scaling your content and international presence while maintaining optimal search engine performance.
