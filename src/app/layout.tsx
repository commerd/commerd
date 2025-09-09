import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SEOProvider } from "@/components/seo";
import { DEFAULT_SEO_CONFIG, SEO_DEFAULTS } from "@/lib/seo/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_SEO_CONFIG.siteUrl),
  title: {
    default: SEO_DEFAULTS.title,
    template: `%s | ${DEFAULT_SEO_CONFIG.siteName}`,
  },
  description: SEO_DEFAULTS.description,
  keywords: [...SEO_DEFAULTS.keywords],
  authors: [{ name: SEO_DEFAULTS.author }],
  creator: SEO_DEFAULTS.author,
  publisher: DEFAULT_SEO_CONFIG.siteName,
  
  // Open Graph
  openGraph: {
    type: SEO_DEFAULTS.ogType,
    locale: DEFAULT_SEO_CONFIG.defaultLocale,
    url: DEFAULT_SEO_CONFIG.siteUrl,
    siteName: DEFAULT_SEO_CONFIG.siteName,
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [
      {
        url: DEFAULT_SEO_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SEO_DEFAULTS.title,
      },
    ],
  },

  // Twitter
  twitter: {
    card: SEO_DEFAULTS.twitterCard,
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [DEFAULT_SEO_CONFIG.defaultOgImage],
    creator: DEFAULT_SEO_CONFIG.twitterHandle,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SEOProvider>
          {children}
        </SEOProvider>
      </body>
    </html>
  );
}
