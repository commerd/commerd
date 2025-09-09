import { type Locale } from './config';

/**
 * Get localized URL for a given path and locale
 * @param path - The path to localize (e.g., '/about', '/contact')
 * @param locale - The current locale
 * @returns The localized URL
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
  if (locale === 'en') {
    return path === '/' ? '/' : path;
  } else {
    return path === '/' ? '/th' : `/th${path}`;
  }
}

/**
 * Get the other locale for language switching
 * @param currentLocale - The current locale
 * @returns The other locale
 */
export function getOtherLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'th' : 'en';
}

/**
 * Get the URL for the other locale
 * @param currentLocale - The current locale
 * @returns The URL for the other locale
 */
export function getOtherLocaleUrl(currentLocale: Locale): string {
  const otherLocale = getOtherLocale(currentLocale);
  return otherLocale === 'en' ? '/' : '/th';
}

/**
 * Get the equivalent URL in the other locale for the current path
 * @param currentPath - The current path (e.g., '/about', '/contact', '/th/about')
 * @param currentLocale - The current locale
 * @returns The equivalent URL in the other locale
 */
export function getOtherLocaleUrlForPath(currentPath: string, currentLocale: Locale): string {
  const otherLocale = getOtherLocale(currentLocale);
  
  // Handle the case where currentPath is just the locale prefix (e.g., '/th' or '/en')
  if (currentPath === `/${currentLocale}`) {
    return otherLocale === 'en' ? '/' : '/th';
  }
  
  // Remove locale prefix if present
  let cleanPath = currentPath;
  if (currentLocale === 'th' && currentPath.startsWith('/th')) {
    cleanPath = currentPath.replace('/th', '') || '/';
  } else if (currentLocale === 'en' && currentPath.startsWith('/en')) {
    cleanPath = currentPath.replace('/en', '') || '/';
  }
  // If no locale prefix, use the path as-is
  
  return getLocalizedUrl(cleanPath, otherLocale);
}
