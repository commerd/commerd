import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Disallow: /

# Admin interface - completely blocked from crawling
# This ensures no admin content is indexed or cached`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
