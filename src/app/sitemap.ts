import type { MetadataRoute } from "next";

const SITE = "https://commerd.com";
const LOCALES = ["en", "th"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/" },
    { path: "/about" },
  ];

  return LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.path === "/" ? "daily" : "weekly",
      priority: route.path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE}/${l}${route.path}`]).concat([
            ["x-default", `${SITE}/en${route.path}`],
          ])
        ),
      },
    }))
  );
}
