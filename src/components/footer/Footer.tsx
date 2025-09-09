import Link from 'next/link';
import { type Locale } from '@/lib/i18n/config';
import { ServerMessageProvider } from '@/lib/i18n/server';
import { getLocalizedUrl } from '@/lib/i18n/utils';

interface FooterProps {
  locale: Locale;
  messages: ServerMessageProvider;
}

export function Footer({ locale, messages }: FooterProps) {
  const t = messages.getMessages('footer');


  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/commerd', icon: '🐦' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/commerd', icon: '💼' },
    { name: 'Facebook', href: 'https://facebook.com/commerd', icon: '📘' },
    { name: 'YouTube', href: 'https://youtube.com/commerd', icon: '📺' },
    { name: 'GitHub', href: 'https://github.com/commerd', icon: '🐙' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t.company.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={getLocalizedUrl('/about', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.about}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/careers', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.careers}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/press', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.press}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/partners', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.partners}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/contact', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t.product.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={getLocalizedUrl('/features', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.product.features}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/pricing', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.product.pricing}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/integrations', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.product.integrations}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/api', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.product.api}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/updates', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.product.updates}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t.support.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={getLocalizedUrl('/help', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.support.help}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/docs', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.support.documentation}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/community', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.support.community}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/status', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.support.status}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/support', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.support.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t.legal.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={getLocalizedUrl('/privacy', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.privacy}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/terms', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.terms}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/cookies', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.cookies}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/security', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.security}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/compliance', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.compliance}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t.newsletter.title}</h3>
            <p className="text-gray-300 mb-4 text-sm">
              {t.newsletter.description}
            </p>
            
            <form className="space-y-2">
              <input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {t.newsletter.subscribe}
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">{t.social.title}</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              {t.bottom.copyright}
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 text-sm">{t.bottom.madeWith}</span>
              <span className="text-gray-400 text-xs">{t.bottom.version}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
