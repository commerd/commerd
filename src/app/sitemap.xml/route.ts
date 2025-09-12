import { NextResponse } from 'next/server'
import { i18nConfig } from '@/lib/i18n/config'
import { DEFAULT_SEO_CONFIG } from '@/lib/seo/constants'

const BASE = DEFAULT_SEO_CONFIG.siteUrl
const LOCALES = i18nConfig.locales
const DEFAULT = i18nConfig.defaultLocale

// Helper to generate URL for a path and locale
const urlFor = (path: string, locale: string) =>
  locale === DEFAULT ? `${BASE}${path}` : `${BASE}/${locale}${path === '/' ? '' : path}`

// Define pages with their sitemap configuration
const PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/seo', priority: 0.6, changeFrequency: 'yearly' as const },
] as const

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PAGES.map(({ path, priority, changeFrequency }) => {
  const url = urlFor(path, DEFAULT)
  const lastModified = new Date().toISOString()
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
${LOCALES.map(locale => {
  const localeUrl = urlFor(path, locale)
  return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${localeUrl}"/>`
}).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>
  </url>`
}).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
