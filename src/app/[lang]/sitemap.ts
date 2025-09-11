import type { MetadataRoute } from "next";

const SITE = "https://commerd.com";
const LOCALES = ["en", "th"] as const;

export async function generateSitemaps() {
  // This tells Next to create /en/sitemap.xml and /th/sitemap.xml
  return LOCALES.map((lang) => ({ id: lang }));
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const validLang = LOCALES.includes(id as any) ? id : "en";

  const routes = [
    { path: "/" },
    { path: "/about" },
  ];

  return routes.map((r) => ({
    url: `${SITE}/${validLang}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.path === "/" ? "daily" : "weekly",
    priority: r.path === "/" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE}/${l}${r.path}`]).concat([
          ["x-default", `${SITE}/en${r.path}`],
        ])
      ),
    },
  }));
}
