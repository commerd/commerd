export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'th'],
  localeNames: {
    en: 'English',
    th: 'ไทย',
  },
  localeFlags: {
    en: '🇺🇸',
    th: '🇹🇭',
  },
} as const;

export type Locale = keyof typeof i18nConfig.localeNames;
