"use client";
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const lang = params?.lang as string || 'en';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <>{children}</>;
}
