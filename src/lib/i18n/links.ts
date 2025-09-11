/**
 * Helper to create language-aware URLs
 * @param lang - The language code (e.g., 'en', 'th')
 * @param path - The path (e.g., '/about', 'about', '')
 * @returns The localized URL (e.g., '/en/about', '/th/about', '/en')
 */
export const withLang = (lang: string, path: string = ""): string => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
};
