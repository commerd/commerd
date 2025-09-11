import type { Metadata } from "next";
import { getSEOContent } from "@/lib/seo/content";
import { loadMessages } from "@/lib/i18n/loader";
import { type Locale, i18nConfig } from "@/lib/i18n/config";
import { PageSEO } from "@/components/seo";
import { DEFAULT_SEO_CONFIG } from "@/lib/seo/constants";
import { getLocalizedUrl } from "@/lib/i18n/routing";
import { ContactForm } from "@/components/contact";

interface PageProps {
  params: Promise<{ lang: string }>;
}

// Generate metadata for this page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const seoContent = getSEOContent('contact', locale);
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl;
  
  // Generate canonical URL for this locale
  const canonicalPath = getLocalizedUrl('/contact', locale);
  const canonical = `${baseUrl}${canonicalPath}`;
  
  // Generate hreflang alternates
  const alternates: Record<string, string> = {};
  i18nConfig.locales.forEach(altLocale => {
    const altPath = getLocalizedUrl('/contact', altLocale);
    alternates[altLocale] = `${baseUrl}${altPath}`;
  });
  
  // Add x-default pointing to English
  const defaultPath = getLocalizedUrl('/contact', 'en');
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

export default async function LocalizedContactPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const seoContent = getSEOContent('contact', locale);
  
  // Load contact messages directly
  const t = await loadMessages(locale, 'contact');
  
  return (
    <>
      <PageSEO
        locale={locale}
        pathname={`/${locale}/contact`}
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

        {/* Contact Info Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  {t.info?.title}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t.info?.email?.title}
                      </h3>
                      <a 
                        href="mailto:contact@commerd.com" 
                        className="text-primary-600 hover:text-primary-700 text-lg"
                      >
                        contact@commerd.com
                      </a>
                      <p className="text-gray-600 mt-1">
                        {t.info?.email?.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t.info?.response_time?.title}
                      </h3>
                      <p className="text-gray-600">
                        {t.info?.response_time?.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t.info?.languages?.title}
                      </h3>
                      <p className="text-gray-600">
                        {t.info?.languages?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t.form?.title}
                </h3>
                
                <ContactForm 
                  labels={{
                    name: t.form?.fields?.name,
                    email: t.form?.fields?.email,
                    subject: t.form?.fields?.subject,
                    message: t.form?.fields?.message,
                    submit: t.form?.submit,
                    sending: t.form?.sending,
                    success: t.form?.success,
                    error: t.form?.error
                  }}
                />

                <p className="text-sm text-gray-500 mt-4">
                  {t.form?.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.faq?.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.faq?.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.faq?.items?.map((item: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
