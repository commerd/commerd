import { generateMetadata as generateSEOMetadata } from "@/components/seo";
import { getSEOContent } from "@/lib/seo/content";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n/config";
import { PageSEO } from "@/components/seo";
import { HomePage } from "@/components/homepage";

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
      />
      
      <HomePage t={t} />
    </>
  );
}
