// Central route list for sitemap generation
export const ROUTES = [
  "/", 
  "/about", 
  // Add more static pages here as you create them
  // "/contact",
  // "/blog",
  // "/products",
] as const;

export type Route = typeof ROUTES[number];
