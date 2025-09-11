import { type Locale } from './config';
import { getLocalizedUrl as getLocalizedUrlFromRouting, computeLocalizedUrl } from './routing';

/**
 * Get localized URL for a given path and locale
 * @param path - The path to localize (e.g., '/about', '/contact')
 * @param locale - The current locale
 * @returns The localized URL
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
  return getLocalizedUrlFromRouting(path, locale);
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
 * Get the URL for the other locale (homepage only)
 * @param currentLocale - The current locale
 * @returns The URL for the other locale homepage
 */
export function getOtherLocaleUrl(currentLocale: Locale): string {
  const otherLocale = getOtherLocale(currentLocale);
  return getLocalizedUrl('/', otherLocale);
}

/**
 * Get the equivalent URL in the other locale for the current path
 * @param currentPath - The current path (e.g., '/about', '/contact', '/th/about')
 * @param currentLocale - The current locale
 * @returns The equivalent URL in the other locale
 */
export function getOtherLocaleUrlForPath(currentPath: string, currentLocale: Locale): string {
  const otherLocale = getOtherLocale(currentLocale);
  return computeLocalizedUrl(currentPath, otherLocale);
}
