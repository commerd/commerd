"use client";
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const lang = params?.lang as string || 'en';

  useEffect(() => {
    // Set the language attribute on the html element
    document.documentElement.lang = lang;
  }, [lang]);

  return <>{children}</>;
}
