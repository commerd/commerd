import Link from 'next/link';
import { i18nConfig, type Locale } from '@/lib/i18n/config';
import { withLang } from '@/lib/i18n/links';
import { Logo } from '@/components/ui';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface ServerHeaderProps {
  lang: string;
  t: any;
}

export function ServerHeader({ lang, t }: ServerHeaderProps) {
  const currentLang = i18nConfig.locales.includes(lang as Locale) ? lang as Locale : 'en';

  // Generate navigation items based on current locale
  const navigationItems = [
    { href: withLang(currentLang, '/'), label: t.navigation.home },
    { href: withLang(currentLang, '/about'), label: t.navigation.about },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

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
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
