export const DEFAULT_SEO_CONFIG = {
  siteName: 'Commerd',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://commerd.com',
  defaultLocale: 'en',
  supportedLocales: ['en', 'th'] as string[],
  defaultOgImage: '/og-image.jpg',
  twitterHandle: '@commerd',
  author: 'Commerd Team',
} as const;

export const SEO_DEFAULTS = {
  title: 'Commerd - Your Business Solution',
  description: 'Discover innovative business solutions with Commerd. We provide cutting-edge tools and services to help your business grow and succeed.',
  keywords: ['business', 'solutions', 'innovation', 'growth', 'technology'],
  ogType: 'website' as const,
  twitterCard: 'summary_large_image' as const,
  author: 'Commerd Team',
} as const;
