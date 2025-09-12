"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useT } from '@/lib/i18n';
import { withLang } from '@/lib/i18n/links';
import { getTextClasses } from '@/lib/utils/fonts';
import { type Locale } from '@/lib/i18n/config';

export function Footer() {
  const { lang } = useParams<{ lang: string }>();
  const t = useT<{ footer: any }>().footer;
  const currentLang = (typeof lang === "string" ? lang : "en") as Locale;


  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/commerd', icon: 'T' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/commerd', icon: 'L' },
    { name: 'Facebook', href: 'https://facebook.com/commerd', icon: 'F' },
    { name: 'YouTube', href: 'https://youtube.com/commerd', icon: 'Y' },
    { name: 'GitHub', href: 'https://github.com/commerd', icon: 'G' },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Section */}
          <div className="lg:col-span-1">
            <h3 className={getTextClasses(currentLang, 'h3', "text-lg mb-4")}>{t.company.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={withLang(currentLang, '/about')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.about}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/careers')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.careers}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/press')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.press}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/partners')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.partners}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/contact')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.company.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-1">
            <h3 className={getTextClasses(currentLang, 'h3', "text-lg mb-4")}>{t.services.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={withLang(currentLang, '/seo')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.seo}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/conversion-optimization')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.cro}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/design')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.design}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/analytics')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.analytics}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/consulting')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.services.consulting}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="lg:col-span-1">
            <h3 className={getTextClasses(currentLang, 'h3', "text-lg mb-4")}>{t.resources.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={withLang(currentLang, '/case-studies')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.caseStudies}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/blog')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.blog}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/guides')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.guides}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/tools')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.tools}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/webinars')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.resources.webinars}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="lg:col-span-1">
            <h3 className={getTextClasses(currentLang, 'h3', "text-lg mb-4")}>{t.legal.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={withLang(currentLang, '/privacy')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.privacy}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/terms')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.terms}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/cookies')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.cookies}
                </Link>
              </li>
              <li>
                <Link 
                  href={withLang(currentLang, '/disclaimer')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.legal.disclaimer}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="lg:col-span-1">
            <h3 className={getTextClasses(currentLang, 'h3', "text-lg mb-4")}>{t.social.title}</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-lg font-bold bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
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
