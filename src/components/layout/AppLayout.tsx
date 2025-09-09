import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { createServerMessageProvider } from "@/lib/i18n/server";
import { type Locale } from "@/lib/i18n/config";

interface AppLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  pathname?: string;
}

export async function AppLayout({ children, locale, pathname = '/' }: AppLayoutProps) {
  // Load messages for header and footer
  const messages = await createServerMessageProvider(locale, [
    'header',
    'footer'
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} messages={messages} pathname={pathname} />
      <main className="flex-1">
        {children}
      </main>
      <Footer locale={locale} messages={messages} />
    </div>
  );
}
