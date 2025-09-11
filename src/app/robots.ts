// src/app/robots.ts
import type { MetadataRoute } from "next";
import { DEFAULT_SEO_CONFIG } from "@/lib/seo/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${DEFAULT_SEO_CONFIG.siteUrl}/sitemap.xml`,
    host: DEFAULT_SEO_CONFIG.siteUrl,
  };
}
