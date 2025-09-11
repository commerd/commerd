import type { MetadataRoute } from "next";

const SITE = "https://commerd.com";
const LOCALES = ["en", "th"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Define your route list once; keep it small & explicit.
  const routes = [
    { path: "/", updated: "2025-09-01" },
    { path: "/about", updated: "2025-09-01" },
  ];

  // Build alternates for each url
  const toEntry = (path: string): MetadataRoute.Sitemap[0] => ({
    url: `${SITE}/th${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE}/${l}${path}`]).concat([
          ["x-default", `${SITE}${path}`],
        ])
      ),
    },
  });

  return routes.map((r) => toEntry(r.path));
}
