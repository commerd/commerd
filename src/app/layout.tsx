import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Commerd",
  description: "Premium Ecommerce Solutions for Thai Businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/kanit/v17/nKKX-Go6G5tXcraQGwU.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/kanit/v17/nKKZ-Go6G5tXcoaS.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            body { font-family: "Kanit", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
            .font-kanit { font-family: "Kanit", sans-serif !important; }
            h1 { font-family: "Kanit", sans-serif !important; font-weight: 800 !important; }
            p { font-family: "Kanit", sans-serif !important; font-weight: 500 !important; }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
