// src/app/robots.ts
import type { MetadataRoute } from "next";
import { DEFAULT_SEO_CONFIG } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/private/",
        ],
      },
    ],
    sitemap: `${DEFAULT_SEO_CONFIG.siteUrl}/sitemap.xml`,
    host: DEFAULT_SEO_CONFIG.siteUrl,
  };
}
