import { type Locale } from "@/lib/i18n/config";

/**
 * Get appropriate font class based on locale and weight
 * @param locale - The current locale
 * @param weight - Font weight (default: 'regular')
 * @param italic - Whether to use italic variant (default: false)
 * @returns CSS class name for the font
 */
export function getFontClass(
  locale: Locale,
  weight: 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black' = 'regular',
  italic: boolean = false
): string {
  // Use Kanit font for all locales with Tailwind classes
  const weightMap = {
    'thin': 'font-thin',
    'extralight': 'font-extralight', 
    'light': 'font-light',
    'regular': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
    'extrabold': 'font-extrabold',
    'black': 'font-black'
  };
  
  const italicClass = italic ? 'italic' : '';
  return `font-kanit ${weightMap[weight]} ${italicClass}`.trim();
}

/**
 * Get font classes for common text elements
 */
export const thaiFontClasses = {
  // Headings
  h1: (locale: Locale) => getFontClass(locale, 'extrabold'),
  h2: (locale: Locale) => getFontClass(locale, 'bold'),
  h3: (locale: Locale) => getFontClass(locale, 'semibold'),
  h4: (locale: Locale) => getFontClass(locale, 'semibold'),
  h5: (locale: Locale) => getFontClass(locale, 'medium'),
  h6: (locale: Locale) => getFontClass(locale, 'medium'),
  
  // Body text
  body: (locale: Locale) => getFontClass(locale, 'medium'),
  bodyBold: (locale: Locale) => getFontClass(locale, 'semibold'),
  
  // UI elements
  button: (locale: Locale) => getFontClass(locale, 'semibold'),
  caption: (locale: Locale) => getFontClass(locale, 'regular'),
  small: (locale: Locale) => getFontClass(locale, 'regular'),
} as const;

/**
 * Combine font class with other classes
 * @param locale - The current locale
 * @param fontType - Type of text element
 * @param additionalClasses - Additional CSS classes
 * @returns Combined class string
 */
export function getTextClasses(
  locale: Locale,
  fontType: keyof typeof thaiFontClasses,
  additionalClasses: string = ''
): string {
  const fontClass = thaiFontClasses[fontType](locale);
  return [fontClass, additionalClasses].filter(Boolean).join(' ');
}
