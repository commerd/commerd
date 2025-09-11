import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n/config";
import { DEFAULT_SEO_CONFIG } from "@/lib/seo/constants";
import { getLocalizedUrl } from "@/lib/i18n/routing";
import { i18nConfig } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function SitemapPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl;
  
  // Define your actual pages here
  const staticPages = [
    { path: '', name: dict.common.home, description: dict.common.homeDescription },
    { path: '/about', name: dict.common.about, description: dict.common.aboutDescription },
    { path: '/sitemap', name: dict.common.sitemap, description: dict.common.sitemapDescription },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {dict.common.sitemap}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {dict.common.sitemapDescription}
          </p>
        </div>

        {/* Sitemap Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-8">
            {staticPages.map((page, index) => {
              const cleanPage = page.path === '' ? '/' : page.path;
              const localizedPath = getLocalizedUrl(cleanPage, locale);
              const url = `${baseUrl}${localizedPath}`;
              
              return (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {page.name}
                      </h2>
                      <p className="text-gray-600 mb-3">
                        {page.description}
                      </p>
                      <a
                        href={url}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        {url}
                      </a>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-6">
                      <a
                        href={url}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
                      >
                        {dict.common.visitPage}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {dict.common.sitemapInfo}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                {dict.common.lastUpdated}
              </h4>
              <p className="text-gray-600">
                {new Date().toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                {dict.common.totalPages}
              </h4>
              <p className="text-gray-600">
                {staticPages.length} {dict.common.pages}
              </p>
            </div>
          </div>
        </div>

        {/* Language Versions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {dict.common.availableLanguages}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {i18nConfig.locales.map((loc) => {
              const localizedPath = getLocalizedUrl('/sitemap', loc as Locale);
              const url = `${baseUrl}${localizedPath}`;
              const isCurrent = loc === locale;
              
              return (
                <a
                  key={loc}
                  href={url}
                  className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                    isCurrent
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {loc === 'en' ? 'English' : 'ไทย'}
                    </span>
                    {isCurrent && (
                      <span className="text-primary-600 text-sm font-medium">
                        {dict.common.current}
                      </span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
