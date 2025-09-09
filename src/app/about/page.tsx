import { generateMetadata as generateSEOMetadata } from "@/components/seo";
import { getSEOContent } from "@/lib/seo/content";
import { PageSEO } from "@/components/seo";
import { createServerMessageProvider } from "@/lib/i18n/server";
import { type Locale } from "@/lib/i18n/config";
import { AppLayout } from "@/components/layout/AppLayout";

// Generate metadata for this page
export async function generateMetadata() {
  const seoContent = getSEOContent('about', 'en');
  return generateSEOMetadata(seoContent, 'en', '/about');
}

export default async function About() {
  const locale: Locale = 'en';
  const seoContent = getSEOContent('about', locale);
  
  // Load messages for this page
  const messages = await createServerMessageProvider(locale, [
    'about'
  ]);
  
  const t = messages.getMessages('about');
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: t.title, url: '/about' },
  ];
  
  return (
    <AppLayout locale={locale} pathname="/about">
      <PageSEO 
        seo={seoContent} 
        locale={locale} 
        pathname="/about"
        breadcrumbs={breadcrumbs}
      >
        <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                {t.title}
              </h1>
              <p className="text-xl text-gray-600">
                {t.subtitle}
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t.mission.title}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t.mission.content}
                </p>
              </section>
              
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t.story.title}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t.story.content}
                </p>
              </section>
              
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t.values.title}</h2>
                <ul className="space-y-4">
                  {t.values.items.map((value: any, index: number) => (
                    <li key={index} className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
        </div>
      </PageSEO>
    </AppLayout>
  );
}