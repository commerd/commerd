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
  const seoContent = getSEOContent('conversion-optimization', locale);
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl;
  
  // Generate canonical URL for this locale
  const canonicalPath = getLocalizedUrl('/conversion-optimization', locale);
  const canonical = `${baseUrl}${canonicalPath}`;
  
  // Generate hreflang alternates
  const alternates: Record<string, string> = {};
  i18nConfig.locales.forEach(altLocale => {
    const altPath = getLocalizedUrl('/conversion-optimization', altLocale);
    alternates[altLocale] = `${baseUrl}${altPath}`;
  });
  
  // Add x-default pointing to English
  const defaultPath = getLocalizedUrl('/conversion-optimization', 'en');
  alternates['x-default'] = `${baseUrl}${defaultPath}`;

  return {
    title: seoContent.title,
    description: seoContent.description,
    keywords: seoContent.keywords,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: seoContent.title,
      description: seoContent.description,
      type: seoContent.ogType,
      url: canonical,
    },
  };
}

export default async function ConversionOptimizationPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const seoContent = getSEOContent('conversion-optimization', locale);
  
  // Load CRO messages
  const t = await loadMessages(locale, 'conversion-optimization');
  
  return (
    <>
      <PageSEO
        locale={locale}
        pathname={`/${locale}/conversion-optimization`}
        seo={seoContent}
      />
      
      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>
            </div>
          </div>
        </header>

        {/* Introduction Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {t.introduction.title}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {t.introduction.content}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.introduction.key_points.map((point: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.benefits.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.benefits.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.benefits.items.map((benefit: any, index: number) => (
                <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {benefit.icon === 'trending-up' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      )}
                      {benefit.icon === 'users' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      )}
                      {benefit.icon === 'dollar-sign' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      )}
                      {benefit.icon === 'target' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      )}
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.process.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.process.subtitle}
              </p>
            </div>
            <div className="space-y-8">
              {t.process.steps.map((step: any, index: number) => (
                <div key={index} className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 p-6 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.strategies.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.strategies.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {t.strategies.categories.map((category: any, index: number) => (
                <div key={index} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-3">
                    {category.tactics.map((tactic: string, tacticIndex: number) => (
                      <li key={tacticIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.tools.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.tools.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.tools.categories.map((category: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.tools.map((tool: string, toolIndex: number) => (
                      <li key={toolIndex} className="text-gray-700 text-sm">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.case_study.title}
              </h2>
              <p className="text-xl text-gray-600">
                {t.case_study.subtitle}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  <strong>Background:</strong> {t.case_study.background}
                </p>
                <p className="text-gray-700 mb-6">
                  <strong>Challenge:</strong> {t.case_study.challenge}
                </p>
                <p className="text-gray-700 mb-8">
                  <strong>Solution:</strong> {t.case_study.solution}
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Results:</h3>
                <ul className="space-y-2 mb-8">
                  {t.case_study.results.map((result: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Learnings:</h3>
                <ul className="space-y-2">
                  {t.case_study.key_learnings.map((learning: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.faq.title}
              </h2>
            </div>
            <div className="space-y-6">
              {t.faq.questions.map((faq: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.getting_started.title}
              </h2>
              <p className="text-xl text-gray-600">
                {t.getting_started.subtitle}
              </p>
            </div>
            <div className="space-y-6">
              {t.getting_started.steps.map((step: any, index: number) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              {t.cta.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-center space-x-3 text-primary-100">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              {t.cta.button}
            </button>
          </div>
        </section>
      </article>
    </>
  );
}
