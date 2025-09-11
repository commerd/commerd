import type { MetadataRoute } from "next";
import { i18nConfig } from "@/lib/i18n/config";
import { DEFAULT_SEO_CONFIG } from "@/lib/seo/constants";
import { ROUTES } from "@/lib/routes";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = DEFAULT_SEO_CONFIG.siteUrl;

  // Start with static routes
  let allRoutes = [...ROUTES];

  // TODO: Add dynamic routes here when you have them
  // Example: blog posts, products, etc.
  // const blogRes = await fetch(`${siteUrl}/api/posts`);
  // const posts = await blogRes.json();
  // allRoutes.push(...posts.map((p: any) => `/blog/${p.slug}`));

  // Build final sitemap entries
  const sitemap: MetadataRoute.Sitemap = [];

  allRoutes.forEach((path) => {
    const alternates = Object.fromEntries(
      i18nConfig.locales.map((l) => [l, `${siteUrl}/${l}${path}`])
    );

    i18nConfig.locales.forEach((lang) => {
      sitemap.push({
        url: `${siteUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.8,
        alternates: { languages: alternates },
      });
    });
  });

  return sitemap;
}
