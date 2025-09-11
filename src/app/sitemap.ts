import type { MetadataRoute } from "next";

const SITE = "https://commerd.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/en/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${SITE}/th/sitemap.xml`,
      lastModified: new Date(),
    },
  ];
}
