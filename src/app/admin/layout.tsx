import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";
import { Kanit } from "next/font/google";
import { AdminSecurity } from "@/components/admin/AdminSecurity";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { AuthGuard } from "@/components/admin/AuthGuard";
import { UserMenu } from "@/components/admin/UserMenu";
import "./admin.css";

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-kanit',
});

export const metadata: Metadata = {
  title: "Admin Dashboard - Commerd",
  description: "Content management system for Commerd",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className={kanit.variable}>
      <body className="font-kanit bg-gray-50">
        <AdminSecurity />
        <AuthProvider>
          <AuthGuard>
            <div className="min-h-screen flex">
              {/* Sidebar */}
              <aside className="w-64 bg-white shadow-lg">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-8">Commerd Admin</h1>
                  <nav className="space-y-2">
                    <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/admin/messages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      Messages
                    </Link>
                    <Link href="/admin/pages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      Pages
                    </Link>
                    <Link href="/admin/seo" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      SEO
                    </Link>
                    <Link href="/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      Settings
                    </Link>
                  </nav>
                </div>
              </aside>

              {/* Main content */}
              <main className="flex-1 p-8">
                {/* Header with user menu */}
                <div className="flex justify-end mb-6">
                  <UserMenu />
                </div>
                {children}
              </main>
            </div>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
