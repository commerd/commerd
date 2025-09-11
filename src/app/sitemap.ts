import type { MetadataRoute } from 'next'
import { i18nConfig } from '@/lib/i18n/config'
import { DEFAULT_SEO_CONFIG } from '@/lib/seo/constants'

export const dynamic = 'force-dynamic'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = DEFAULT_SEO_CONFIG.siteUrl
  
  // Define your static routes here - add more as you create pages
  const routes = [
    '/',
    '/about',
    // Add more routes here as you create them:
    // '/products',
    // '/services', 
    // '/contact',
    // '/blog',
  ]

  // Generate sitemap entries for all locales
  const sitemap: MetadataRoute.Sitemap = []

  routes.forEach((route) => {
    // Create alternates for all locales
    const alternates = Object.fromEntries(
      i18nConfig.locales.map((locale) => [
        locale,
        `${siteUrl}/${locale}${route === '/' ? '' : route}`
      ])
    )

    // Generate entry for each locale
    i18nConfig.locales.forEach((locale) => {
      sitemap.push({
        url: `${siteUrl}/${locale}${route === '/' ? '' : route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '/' ? 1.0 : 0.8,
        alternates: {
          languages: alternates
        }
      })
    })
  })

  return sitemap
}