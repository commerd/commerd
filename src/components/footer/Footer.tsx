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
    { name: 'Twitter', href: 'https://twitter.com/commerd', icon: 'T' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/commerd', icon: 'L' },
    { name: 'Facebook', href: 'https://facebook.com/commerd', icon: 'F' },
    { name: 'YouTube', href: 'https://youtube.com/commerd', icon: 'Y' },
    { name: 'GitHub', href: 'https://github.com/commerd', icon: 'G' },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-green-200">
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

          {/* Services Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t.services.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={getLocalizedUrl('/seo', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.seo}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/cro', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.cro}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/design', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.design}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/analytics', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.analytics}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/consulting', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.consulting}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t.resources.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={getLocalizedUrl('/case-studies', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.caseStudies}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/blog', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.blog}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/guides', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.guides}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/tools', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.tools}
                </Link>
              </li>
              <li>
                <Link 
                  href={getLocalizedUrl('/webinars', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.webinars}
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
                  href={getLocalizedUrl('/disclaimer', locale)} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.disclaimer}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t.social.title}</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-lg font-bold bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              {t.copyright}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
