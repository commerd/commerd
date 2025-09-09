import { generateMetadata as generateSEOMetadata } from "@/components/seo";
import { getSEOContent } from "@/lib/seo/content";
import { PageSEO } from "@/components/seo";
import { type Locale } from "@/lib/i18n/config";

interface PageProps {
  params: {
    locale: Locale;
  };
}

// Generate metadata for this page
export async function generateMetadata({ params }: PageProps) {
  const { locale } = params;
  const seoContent = getSEOContent('home', locale);
  return generateSEOMetadata(seoContent, locale, `/${locale}`);
}

export default function LocalizedHome({ params }: PageProps) {
  const { locale } = params;
  const seoContent = getSEOContent('home', locale);
  
  const content = {
    en: {
      title: "Welcome to Commerd",
      subtitle: "Innovative business solutions for the digital age",
      description: "Discover cutting-edge tools and services designed to help your business grow and succeed.",
      getStarted: "Get Started",
      learnMore: "Learn More",
    },
    th: {
      title: "ยินดีต้อนรับสู่ Commerd",
      subtitle: "โซลูชันธุรกิจที่ล้ำสมัยสำหรับยุคดิจิทัล",
      description: "ค้นพบเครื่องมือและบริการที่ล้ำสมัยที่ออกแบบมาเพื่อช่วยให้ธุรกิจของคุณเติบโตและประสบความสำเร็จ",
      getStarted: "เริ่มต้น",
      learnMore: "เรียนรู้เพิ่มเติม",
    },
  };
  
  const pageContent = content[locale] || content.en;
  
  return (
    <PageSEO seo={seoContent} locale={locale} pathname={`/${locale}`}>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold mb-4">
              {pageContent.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {pageContent.subtitle}
            </p>
            <div className="space-y-4">
              <p className="text-lg">
                {pageContent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {pageContent.getStarted}
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  {pageContent.learnMore}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageSEO>
  );
}
