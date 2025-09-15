/**
 * Admin Security Configuration
 * Comprehensive security measures for the admin interface
 */

export const ADMIN_SECURITY_CONFIG = {
  // Meta tags for search engines
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },

  // Additional bot-specific directives
  botDirectives: [
    'googlebot',
    'bingbot', 
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
  ],

  // Security headers
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },

  // Routes to exclude from sitemap and robots
  excludedRoutes: [
    '/admin',
    '/admin/*',
    '/api/admin',
    '/api/admin/*',
  ],

  // Keyboard shortcuts to disable
  disabledKeys: [
    'F12', // Developer tools
    'Ctrl+Shift+I', // Developer tools
    'Ctrl+Shift+C', // Element selector
    'Ctrl+Shift+J', // Console
    'Ctrl+U', // View source
  ],
};

/**
 * Generate robots.txt content for admin subdomain
 */
export function generateAdminRobotsTxt(): string {
  return `User-agent: *
Disallow: /

# Admin interface - completely blocked from crawling
# This ensures no admin content is indexed or cached

# Additional bot-specific blocks
User-agent: Googlebot
Disallow: /

User-agent: Bingbot
Disallow: /

User-agent: Slurp
Disallow: /

User-agent: DuckDuckBot
Disallow: /

User-agent: Baiduspider
Disallow: /

User-agent: YandexBot
Disallow: /

User-agent: facebookexternalhit
Disallow: /

User-agent: Twitterbot
Disallow: /

User-agent: LinkedInBot
Disallow: /`;
}

/**
 * Check if a route should be excluded from sitemap
 */
export function shouldExcludeFromSitemap(pathname: string): boolean {
  return ADMIN_SECURITY_CONFIG.excludedRoutes.some(route => {
    if (route.endsWith('/*')) {
      const baseRoute = route.slice(0, -2);
      return pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });
}

/**
 * Generate security meta tags for admin pages
 */
export function generateSecurityMetaTags() {
  const tags = [
    { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet, noimageindex, nocache' },
  ];

  // Add bot-specific meta tags
  ADMIN_SECURITY_CONFIG.botDirectives.forEach(bot => {
    tags.push({ name: bot, content: 'noindex, nofollow' });
  });

  return tags;
}
