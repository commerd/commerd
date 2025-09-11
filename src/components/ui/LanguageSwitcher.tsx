"use client";
import { usePathname, useRouter, useParams } from "next/navigation";
import { supportedLocales, defaultLocale, i18nConfig } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useParams<{ lang: string }>();

  const current = typeof lang === "string" ? lang : defaultLocale;

  function switchTo(next: string) {
    const segments = pathname.split("/");      // ['', lang, ...rest]
    segments[1] = next;                        // replace lang segment
    router.push(segments.join("/") || "/");
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Language:</span>
      <div className="flex items-center space-x-1">
        {supportedLocales.map((l) => (
          <button
            key={l}
            onClick={() => switchTo(l)}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              l === current 
                ? "bg-primary-100 text-primary-800" 
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
          >
{i18nConfig.localeNames[l as keyof typeof i18nConfig.localeNames]}
          </button>
        ))}
      </div>
    </div>
  );
}
