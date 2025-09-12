import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-kanit',
});

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
    <html className={kanit.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
