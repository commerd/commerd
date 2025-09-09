import { generateMetadata as generateSEOMetadata } from "@/components/seo";
import { getSEOContent } from "@/lib/seo/content";
import { PageSEO } from "@/components/seo";
import { createServerMessageProvider } from "@/lib/i18n/server";
import { type Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

// Generate metadata for this page
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const seoContent = getSEOContent('home', locale);
  return generateSEOMetadata(seoContent, locale, `/${locale}`);
}

export default async function LocalizedHome({ params }: PageProps) {
  const { locale } = await params;
  const seoContent = getSEOContent('home', locale);
  
  // Load messages using the new system
  const messages = await createServerMessageProvider(locale, [
    'home'
  ]);
  
  const t = messages.getMessages('home');
  
  return (
    <PageSEO seo={seoContent} locale={locale} pathname={`/${locale}`}>
      <div>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                {t.subtitle}
              </p>
              <p className="text-lg mb-12 max-w-3xl mx-auto text-green-50">
                {t.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {t.getStarted}
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                  {t.learnMore}
                </button>
                <button className="border-2 border-green-300 text-green-100 px-8 py-3 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-colors">
                  {t.watchDemo}
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t.features.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {t.features.subtitle}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.features.items.map((feature: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-2xl font-bold mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
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
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Ready to Transform Your Ecommerce Business?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Join Thai businesses that trust Commerd for world-class SEO, CRO, design, and growth strategies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Start Your Project
                  </button>
                  <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Book Free Consultation
                  </button>
                </div>
              </div>
            </div>
          </section>
      </div>
    </PageSEO>
  );
}
