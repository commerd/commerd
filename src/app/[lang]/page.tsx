import { generateMetadata as generateSEOMetadata } from "@/components/seo";
import { getSEOContent } from "@/lib/seo/content";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n/config";
import { PageSEO } from "@/components/seo";

interface PageProps {
  params: Promise<{ lang: string }>;
}

// Generate metadata for this page
export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const seoContent = getSEOContent('home', locale);
  return generateSEOMetadata(seoContent, locale, `/${locale}`);
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const seoContent = getSEOContent('home', locale);
  
  // Load dictionary using the new system
  const dict = await getDictionary(locale);
  const t = dict.home;
  
  return (
    <>
      <PageSEO
        locale={locale}
        pathname={`/${locale}`}
        seo={seoContent}
      >
        <></>
      </PageSEO>
      
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {t.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {t.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors">
                  {t.getStarted}
                </button>
                <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors">
                  {t.learnMore}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.features.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.features.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.features.items.map((feature: any, index: number) => (
                <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s transform your digital presence with our proven strategies.
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              {t.watchDemo}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
