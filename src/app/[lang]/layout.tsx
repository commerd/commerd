import type { Metadata } from "next";
import { ReactNode } from "react";
import { getDictionary, TranslationProvider, type Locale } from "@/lib/i18n";
import { i18nConfig } from "@/lib/i18n/config";
import { ServerHeader } from "@/components/header/ServerHeader";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { DEFAULT_SEO_CONFIG } from "@/lib/seo/constants";
import { getLocalizedUrl } from "@/lib/i18n/routing";

export async function generateStaticParams() {
  return i18nConfig.locales.map((lng: Locale) => ({ lang: lng }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = i18nConfig.locales.includes(lang as Locale) ? lang as Locale : i18nConfig.defaultLocale;
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl;
  
  // Generate canonical URL for this locale
  const canonicalPath = getLocalizedUrl('/', locale);
  const canonical = `${baseUrl}${canonicalPath}`;
  
  // Generate hreflang alternates
  const alternates: Record<string, string> = {};
  i18nConfig.locales.forEach(altLocale => {
    const altPath = getLocalizedUrl('/', altLocale);
    alternates[altLocale] = `${baseUrl}${altPath}`;
  });
  
  // Add x-default pointing to English
  const defaultPath = getLocalizedUrl('/', 'en');
  alternates['x-default'] = `${baseUrl}${defaultPath}`;

  return {
    title: "Commerd",
    alternates: {
      canonical,
      languages: alternates,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = i18nConfig.locales.includes(lang as Locale) ? lang as Locale : i18nConfig.defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <LanguageProvider>
      <TranslationProvider dict={dict}>
        <div className="min-h-screen flex flex-col">
          <ServerHeader lang={lang} t={dict.header} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </TranslationProvider>
    </LanguageProvider>
  );
}
