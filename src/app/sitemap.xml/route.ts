import { NextResponse } from 'next/server'
import { i18nConfig } from '@/lib/i18n/config'
import { DEFAULT_SEO_CONFIG } from '@/lib/seo/constants'

export const dynamic = 'force-dynamic'

export async function GET() {
  const siteUrl = DEFAULT_SEO_CONFIG.siteUrl
  
  // Define your static routes here - add more as you create pages
  const routes = [
    '/',
    '/about',
    '/seo',
    '/contact',
  ]

  // Generate XML manually for proper formatting
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`

  routes.forEach((route) => {
    i18nConfig.locales.forEach((locale) => {
      const url = `${siteUrl}/${locale}${route === '/' ? '' : route}`
      const lastmod = new Date().toISOString()
      const priority = route === '/' ? '1.0' : '0.8'
      
      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>`
      
      // Add hreflang alternates
      i18nConfig.locales.forEach((altLocale) => {
        const altUrl = `${siteUrl}/${altLocale}${route === '/' ? '' : route}`
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}" />`
      })
      
      xml += `
  </url>`
    })
  })

  xml += `
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  })
}
