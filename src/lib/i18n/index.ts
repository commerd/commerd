export * from "./config";
export { getDictionary } from "./loader";
export { TranslationProvider, useT } from "./client";
export * from "./routing";
export { getOtherLocale } from "./utils";
export { withLang } from "./links";
import { i18nConfig, type Locale } from "./config";

// Convenience exports
export const supportedLocales = i18nConfig.locales as readonly Locale[];
export const defaultLocale = i18nConfig.defaultLocale;