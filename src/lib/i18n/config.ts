export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'da', 'sv', 'no', 'de', 'fr', 'es'],
  localeNames: {
    en: 'English',
    da: 'Dansk',
    sv: 'Svenska',
    no: 'Norsk',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
  },
  localeFlags: {
    en: '🇺🇸',
    da: '🇩🇰',
    sv: '🇸🇪',
    no: '🇳🇴',
    de: '🇩🇪',
    fr: '🇫🇷',
    es: '🇪🇸',
  },
} as const;

export type Locale = keyof typeof i18nConfig.localeNames;
