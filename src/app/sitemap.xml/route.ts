import { NextResponse } from 'next/server'
import { i18nConfig } from '@/lib/i18n/config'
import { DEFAULT_SEO_CONFIG } from '@/lib/seo/constants'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const BASE = DEFAULT_SEO_CONFIG.siteUrl
const LOCALES = i18nConfig.locales
const DEFAULT = i18nConfig.defaultLocale

// Helper to generate URL for a path and locale
const urlFor = (path: string, locale: string) =>
  locale === DEFAULT ? `${BASE}${path}` : `${BASE}/${locale}${path === '/' ? '' : path}`

// Function to dynamically discover pages
function discoverPages(): Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }> {
  const pages: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }> = []
  
  try {
    const langDir = join(process.cwd(), 'src/app/[lang]')
    const items = readdirSync(langDir)
    
    for (const item of items) {
      const itemPath = join(langDir, item)
      const stat = statSync(itemPath)
      
      if (stat.isDirectory() && item !== 'layout.tsx') {
        // It's a page directory
        const pagePath = `/${item}`
        
        // Determine priority and change frequency based on page type
        let priority = 0.7
        let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'
        
        if (item === 'page.tsx' || item === '') {
          priority = 1.0
          changeFrequency = 'daily'
        } else if (['about', 'contact'].includes(item)) {
          priority = 0.9
          changeFrequency = 'monthly'
        } else if (['seo', 'conversion-optimization'].includes(item)) {
          priority = 0.8
          changeFrequency = 'weekly'
        }
        
        pages.push({ path: pagePath, priority, changeFrequency })
      }
    }
    
    // Always include the home page
    pages.unshift({ path: '/', priority: 1.0, changeFrequency: 'daily' })
    
  } catch (error) {
    console.error('Error discovering pages:', error)
    // Fallback to hardcoded pages if discovery fails
    return [
      { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
      { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
      { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
      { path: '/seo', priority: 0.6, changeFrequency: 'yearly' as const },
      { path: '/conversion-optimization', priority: 0.8, changeFrequency: 'weekly' as const },
    ]
  }
  
  return pages
}

export async function GET() {
  // Dynamically discover all pages
  const PAGES = discoverPages()
  
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
