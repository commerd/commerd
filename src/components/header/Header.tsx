import Link from 'next/link';
import { type Locale, i18nConfig } from '@/lib/i18n/config';
import { ServerMessageProvider } from '@/lib/i18n/server';
import { getLocalizedUrl, getOtherLocale, getOtherLocaleUrl, getOtherLocaleUrlForPath } from '@/lib/i18n/utils';

interface HeaderProps {
  locale: Locale;
  messages: ServerMessageProvider;
  pathname?: string;
}

export function Header({ locale, messages, pathname = '/' }: HeaderProps) {
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
  const otherLocaleUrl = pathname ? getOtherLocaleUrlForPath(pathname, locale) : getOtherLocaleUrl(locale);

  return (
    <header className="bg-white shadow-lg border-b border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={getLocalizedUrl('/', locale)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
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
                {/* Current language - clickable but highlighted */}
                <Link
                  href={pathname}
                  className="px-2 py-1 text-sm rounded transition-colors bg-green-100 text-green-800 hover:bg-green-200"
                >
                  {i18nConfig.localeNames[locale]}
                </Link>
                {/* Switch to other language */}
                <Link
                  href={otherLocaleUrl}
                  className="px-2 py-1 text-sm rounded transition-colors bg-green-600 text-white hover:bg-green-700"
                >
                  {i18nConfig.localeNames[otherLocale]}
                </Link>
              </div>
            </div>


          </div>
        </div>
      </div>
    </header>
  );
}
