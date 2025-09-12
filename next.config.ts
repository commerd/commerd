import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/components/seo', '@/lib/seo'],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization for better SEO
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.commerd.com',
      },
    ],
  },
  
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO (example)
  async redirects() {
    return [
      // Add redirects as needed for SEO
    ];
  },
};

export default nextConfig;
