import type { MetadataRoute } from "next";

const SITE = "https://commerd.com";
const LOCALES = ["en", "th"] as const;

// Tells Next to generate multiple sitemap files
export async function generateSitemaps() {
  return LOCALES.map((lang) => ({ id: lang }));
}

// Generates each individual sitemap (e.g. /en/sitemap.xml, /th/sitemap.xml)
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
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE}/${l}${r.path}`]).concat([
          ["x-default", `${SITE}/en${r.path}`],
        ])
      ),
    },
  }));
}
