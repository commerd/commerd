import type { MetadataRoute } from "next";
import { i18nConfig } from "@/lib/i18n/config";
import { DEFAULT_SEO_CONFIG } from "@/lib/seo/constants";
import { ROUTES } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = DEFAULT_SEO_CONFIG.siteUrl;
  const sitemap: MetadataRoute.Sitemap = [];

  ROUTES.forEach((path) => {
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
