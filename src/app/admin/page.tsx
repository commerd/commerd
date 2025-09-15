import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your Commerd content and settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Messages Card */}
        <div className="admin-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
          <p className="text-gray-600 mb-4">Manage translations and localized content</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>English</span>
              <span className="admin-badge admin-badge-success">Complete</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Thai</span>
              <span className="admin-badge admin-badge-success">Complete</span>
            </div>
          </div>
          <Link href="/admin/messages" className="admin-button">
            Manage Messages
          </Link>
        </div>

        {/* Pages Card */}
        <div className="admin-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pages</h2>
          <p className="text-gray-600 mb-4">Create and edit website pages</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Home</span>
              <span className="admin-badge admin-badge-success">Published</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>About</span>
              <span className="admin-badge admin-badge-success">Published</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Contact</span>
              <span className="admin-badge admin-badge-success">Published</span>
            </div>
          </div>
          <Link href="/admin/pages" className="admin-button">
            Manage Pages
          </Link>
        </div>

        {/* SEO Card */}
        <div className="admin-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO</h2>
          <p className="text-gray-600 mb-4">Optimize search engine visibility</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Meta Tags</span>
              <span className="admin-badge admin-badge-success">Optimized</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Sitemap</span>
              <span className="admin-badge admin-badge-success">Updated</span>
            </div>
          </div>
          <Link href="/admin/seo" className="admin-button">
            Manage SEO
          </Link>
        </div>

        {/* Analytics Card */}
        <div className="admin-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h2>
          <p className="text-gray-600 mb-4">View website performance metrics</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Page Views</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Unique Visitors</span>
              <span className="font-semibold">567</span>
            </div>
          </div>
          <button className="admin-button admin-button-secondary">
            View Analytics
          </button>
        </div>

        {/* Content Card */}
        <div className="admin-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content</h2>
          <p className="text-gray-600 mb-4">Manage blog posts and articles</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Published</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Drafts</span>
              <span className="font-semibold">3</span>
            </div>
          </div>
          <button className="admin-button admin-button-secondary">
            Manage Content
          </button>
        </div>

        {/* Settings Card */}
        <div className="admin-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
          <p className="text-gray-600 mb-4">Configure site settings and preferences</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Site Name</span>
              <span className="font-semibold">Commerd</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Default Language</span>
              <span className="font-semibold">English</span>
            </div>
          </div>
          <Link href="/admin/settings" className="admin-button">
            Manage Settings
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/messages/new" className="admin-button admin-button-secondary">
            Add New Translation
          </Link>
          <Link href="/admin/pages/new" className="admin-button admin-button-secondary">
            Create New Page
          </Link>
          <button className="admin-button admin-button-secondary">
            Export Content
          </button>
          <button className="admin-button admin-button-secondary">
            Import Content
          </button>
        </div>
      </div>
    </div>
  );
}
