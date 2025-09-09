import { AppLayout } from "@/components/layout/AppLayout";
import { type Locale } from "@/lib/i18n/config";
import { headers } from 'next/headers';

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
  
  // Get the actual pathname from the request
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || `/${validLocale}`;
  
  return (
    <AppLayout locale={validLocale} pathname={pathname}>
      {children}
    </AppLayout>
  );
}
