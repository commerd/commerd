import { AppLayout } from "@/components/layout/AppLayout";
import { type Locale } from "@/lib/i18n/config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate locale and cast to Locale type
  const validLocale = (locale === 'en' || locale === 'th') ? locale as Locale : 'en';
  
  return (
    <AppLayout locale={validLocale}>
      {children}
    </AppLayout>
  );
}
