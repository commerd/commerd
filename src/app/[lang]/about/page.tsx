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
  const seoContent = getSEOContent('about', locale);
  return generateSEOMetadata(seoContent, locale, `/${locale}/about`);
}

export default async function LocalizedAboutPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const seoContent = getSEOContent('about', locale);
  
  // Load dictionary using the new system
  const dict = await getDictionary(locale);
  const t = dict.about;
  
  return (
    <>
      <PageSEO
        locale={locale}
        pathname={`/${locale}/about`}
        seo={seoContent}
      >
        <></>
      </PageSEO>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {t.mission.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t.mission.content}
                </p>
              </div>
              <div className="bg-primary-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t.values.title}
                </h3>
                <ul className="space-y-3">
                  {t.values.items.map((value: any, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 mr-3">✓</span>
                      <div>
                        <span className="font-semibold text-gray-900">{value.title}</span>
                        <p className="text-gray-700 text-sm">{value.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.story.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                {t.story.content}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help transform your business.
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Get in Touch
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
