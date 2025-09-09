import Link from 'next/link';
import { type Locale, i18nConfig } from '@/lib/i18n/config';
import { ServerMessageProvider } from '@/lib/i18n/server';
import { getLocalizedUrl, getOtherLocale, getOtherLocaleUrl } from '@/lib/i18n/utils';

interface HeaderProps {
  locale: Locale;
  messages: ServerMessageProvider;
}

export function Header({ locale, messages }: HeaderProps) {
  const t = messages.getMessages('header');

  const navigationItems = [
    { href: getLocalizedUrl('/', locale), label: t.navigation.home },
    { href: getLocalizedUrl('/about', locale), label: t.navigation.about },
    { href: getLocalizedUrl('/services', locale), label: t.navigation.services },
    { href: getLocalizedUrl('/solutions', locale), label: t.navigation.solutions },
    { href: getLocalizedUrl('/blog', locale), label: t.navigation.blog },
    { href: getLocalizedUrl('/contact', locale), label: t.navigation.contact },
  ];

  const otherLocale = getOtherLocale(locale);
  const otherLocaleUrl = getOtherLocaleUrl(locale);

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href={getLocalizedUrl('/', locale)} 
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">{t.logo}</span>
                <span className="text-xs text-gray-500 -mt-1">{t.tagline}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm text-gray-600">{t.language.label}:</span>
              <div className="flex items-center space-x-1">
                {/* Current language indicator */}
                <span className="px-2 py-1 text-sm rounded bg-gray-100 text-gray-700">
                  {i18nConfig.localeFlags[locale]} {i18nConfig.localeNames[locale]}
                </span>
                {/* Switch to other language */}
                <Link
                  href={otherLocaleUrl}
                  className="px-2 py-1 text-sm rounded transition-colors bg-blue-600 text-white hover:bg-blue-700"
                >
                  {i18nConfig.localeFlags[otherLocale]} {i18nConfig.localeNames[otherLocale]}
                </Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href={getLocalizedUrl('/contact', locale)}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t.actions.signIn}
              </Link>
              <Link
                href={getLocalizedUrl('/get-started', locale)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {t.actions.getStarted}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
