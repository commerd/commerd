import type { Metadata } from "next";
import { ReactNode } from "react";
import { getDictionary, TranslationProvider, supportedLocales, defaultLocale, type Locale } from "@/lib/i18n";
import { ServerHeader } from "@/components/header/ServerHeader";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/LanguageProvider";

export async function generateStaticParams() {
  return supportedLocales.map((lng: Locale) => ({ lang: lng }));
}

export async function generateMetadata({ params: _params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return { title: "Commerd" };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = supportedLocales.includes(lang as Locale) ? lang as Locale : defaultLocale;
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
