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
      <body>
        {children}
      </body>
    </html>
  );
}
