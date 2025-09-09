import { generateMetadata as generateSEOMetadata } from "@/components/seo";
import { getSEOContent } from "@/lib/seo/content";
import { PageSEO } from "@/components/seo";
import { createServerMessageProvider } from "@/lib/i18n/server";
import { type Locale } from "@/lib/i18n/config";
import { AppLayout } from "@/components/layout/AppLayout";

// Generate metadata for the homepage
export async function generateMetadata() {
  const seoContent = getSEOContent('home', 'en');
  return generateSEOMetadata(seoContent, 'en', '/');
}

export default async function HomePage() {
  const locale: Locale = 'en';
  const seoContent = getSEOContent('home', locale);
  
  // Load only the messages needed for this page
  const messages = await createServerMessageProvider(locale, [
    'header',
    'footer', 
    'home'
  ]);
  
  const t = messages.getMessages('home');
  
  return (
    <AppLayout locale={locale}>
      <PageSEO seo={seoContent} locale={locale} pathname="/">
        <div>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {t.subtitle}
              </p>
              <p className="text-lg mb-12 max-w-3xl mx-auto text-blue-50">
                {t.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {t.getStarted}
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  {t.learnMore}
                </button>
                <button className="border-2 border-blue-300 text-blue-100 px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors">
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
                    <div className="text-4xl mb-4">{feature.icon}</div>
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
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Join thousands of businesses that trust Commerd for their digital transformation needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Start Free Trial
                  </button>
                  <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Schedule Demo
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageSEO>
    </AppLayout>
  );
}
