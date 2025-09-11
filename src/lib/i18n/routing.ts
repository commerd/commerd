import { i18nConfig, type Locale } from './config';

/**
 * Generate the localized URL for a given path and locale
 * @param pathname - The current pathname (e.g., "/about")
 * @param locale - The target locale
 * @returns The localized URL (e.g., "/th/about" or "/about" for English)
 */
export function getLocalizedUrl(pathname: string, locale: Locale): string {
  // Remove any existing locale prefix
  const cleanPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
  const normalizedPath = cleanPath === '/' ? '' : cleanPath;
  
  // For English (default locale), no prefix
  if (locale === 'en') {
    return normalizedPath === '' ? '/' : normalizedPath;
  }
  
  // For other locales, add prefix
  return `/${locale}${normalizedPath}`;
}

/**
 * Generate hreflang alternates for all supported locales
 * @param pathname - The current pathname
 * @returns Array of hreflang objects
 */
export function generateHreflangAlternates(pathname: string) {
  return i18nConfig.locales.map(locale => ({
    hrefLang: locale,
    href: getLocalizedUrl(pathname, locale),
  }));
}

/**
 * Get the canonical URL for the current locale and pathname
 * @param pathname - The current pathname
 * @param locale - The current locale
 * @returns The canonical URL
 */
export function getCanonicalUrl(pathname: string, locale: Locale): string {
  return getLocalizedUrl(pathname, locale);
}

/**
 * Extract locale from pathname
 * @param pathname - The pathname to extract locale from
 * @returns The locale or null if not found
 */
export function extractLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (i18nConfig.locales.includes(potentialLocale as Locale)) {
    return potentialLocale as Locale;
  }
  
  return null;
}

/**
 * Get the pathname without locale prefix
 * @param pathname - The pathname to clean
 * @returns The clean pathname
 */
export function getPathnameWithoutLocale(pathname: string): string {
  const locale = extractLocaleFromPathname(pathname);
  if (locale && locale !== 'en') {
    return pathname.replace(`/${locale}`, '') || '/';
  }
  return pathname;
}

/**
 * Check if a pathname has a locale prefix
 * @param pathname - The pathname to check
 * @returns True if pathname has a locale prefix
 */
export function hasLocalePrefix(pathname: string): boolean {
  return extractLocaleFromPathname(pathname) !== null;
}

/**
 * Compute localized URL for language switching
 * Preserves path, query, and hash parameters
 * @param currentPathname - The current pathname
 * @param targetLocale - The target locale
 * @param searchParams - Optional search parameters
 * @param hash - Optional hash fragment
 * @returns The localized URL
 */
export function computeLocalizedUrl(
  currentPathname: string,
  targetLocale: Locale,
  searchParams?: URLSearchParams | string,
  hash?: string
): string {
  // Get the clean pathname without current locale
  const cleanPath = getPathnameWithoutLocale(currentPathname);
  
  // Generate the localized path
  const localizedPath = getLocalizedUrl(cleanPath, targetLocale);
  
  // Build the URL with search params and hash
  let url = localizedPath;
  
  if (searchParams) {
    const params = typeof searchParams === 'string' ? searchParams : searchParams.toString();
    if (params) {
      url += `?${params}`;
    }
  }
  
  if (hash) {
    url += `#${hash}`;
  }
  
  return url;
}
