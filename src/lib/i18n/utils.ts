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
