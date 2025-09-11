import type { MetadataRoute } from "next";

const SITE = "https://commerd.com";
const LOCALES = ["en", "th"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE}/${locale}/sitemap.xml`,
    lastModified: new Date(),
  }));
}
