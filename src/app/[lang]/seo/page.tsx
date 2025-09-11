import type { Metadata } from "next";
import { getSEOContent } from "@/lib/seo/content";
import { loadMessages } from "@/lib/i18n/loader";
import { type Locale, i18nConfig } from "@/lib/i18n/config";
import { PageSEO } from "@/components/seo";
import { DEFAULT_SEO_CONFIG } from "@/lib/seo/constants";
import { getLocalizedUrl } from "@/lib/i18n/routing";

interface PageProps {
  params: Promise<{ lang: string }>;
}

// Generate metadata for this page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const seoContent = getSEOContent('seo', locale);
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl;
  
  // Generate canonical URL for this locale
  const canonicalPath = getLocalizedUrl('/seo', locale);
  const canonical = `${baseUrl}${canonicalPath}`;
  
  // Generate hreflang alternates
  const alternates: Record<string, string> = {};
  i18nConfig.locales.forEach(altLocale => {
    const altPath = getLocalizedUrl('/seo', altLocale);
    alternates[altLocale] = `${baseUrl}${altPath}`;
  });
  
  // Add x-default pointing to English
  const defaultPath = getLocalizedUrl('/seo', 'en');
  alternates['x-default'] = `${baseUrl}${defaultPath}`;

  return {
    title: seoContent.title,
    description: seoContent.description,
    alternates: {
      canonical,
      languages: alternates,
    },
  };
}

export default async function LocalizedSEOPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const seoContent = getSEOContent('seo', locale);
  
  // Load SEO messages directly
  const t = await loadMessages(locale, 'seo');
  
  return (
    <>
      <PageSEO
        locale={locale}
        pathname={`/${locale}/seo`}
        seo={seoContent}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t.hero?.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
                {t.hero?.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t.services?.keyword_research?.title}
                </h3>
                <p className="text-gray-600">
                  {t.services?.keyword_research?.description}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t.services?.on_page?.title}
                </h3>
                <p className="text-gray-600">
                  {t.services?.on_page?.description}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t.services?.link_building?.title}
                </h3>
                <p className="text-gray-600">
                  {t.services?.link_building?.description}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t.services?.technical?.title}
                </h3>
                <p className="text-gray-600">
                  {t.services?.technical?.description}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t.services?.local?.title}
                </h3>
                <p className="text-gray-600">
                  {t.services?.local?.description}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t.services?.analytics?.title}
                </h3>
                <p className="text-gray-600">
                  {t.services?.analytics?.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.cta?.title}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {t.cta?.subtitle}
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              {t.cta?.button}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
