"use client";

import { useState, useEffect } from 'react';

interface PageInfo {
  name: string;
  path: string;
  locale: string;
  title: string;
  description: string;
  lastModified: string;
  status: 'published' | 'draft' | 'archived';
}

export default function PagesPage() {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPages = async () => {
      try {
        // For now, we'll create a mock list of pages
        // In a real implementation, this would scan the app directory
        const mockPages: PageInfo[] = [
          {
            name: 'Home',
            path: '/',
            locale: 'en',
            title: 'Commerd - Premium Ecommerce Solutions',
            description: 'Transform your digital presence with our proven strategies',
            lastModified: '2024-01-15',
            status: 'published'
          },
          {
            name: 'Home',
            path: '/th',
            locale: 'th',
            title: 'Commerd - โซลูชันอีคอมเมิร์ซระดับพรีเมียม',
            description: 'เปลี่ยนการมีอยู่ดิจิทัลของคุณด้วยกลยุทธ์ที่พิสูจน์แล้ว',
            lastModified: '2024-01-15',
            status: 'published'
          },
          {
            name: 'About',
            path: '/about',
            locale: 'en',
            title: 'About Us - Commerd',
            description: 'Learn about our mission and values',
            lastModified: '2024-01-10',
            status: 'published'
          },
          {
            name: 'About',
            path: '/th/about',
            locale: 'th',
            title: 'เกี่ยวกับเรา - Commerd',
            description: 'เรียนรู้เกี่ยวกับภารกิจและค่านิยมของเรา',
            lastModified: '2024-01-10',
            status: 'published'
          },
          {
            name: 'Contact',
            path: '/contact',
            locale: 'en',
            title: 'Contact Us - Commerd',
            description: 'Get in touch with our team',
            lastModified: '2024-01-12',
            status: 'published'
          },
          {
            name: 'Contact',
            path: '/th/contact',
            locale: 'th',
            title: 'ติดต่อเรา - Commerd',
            description: 'ติดต่อทีมงานของเรา',
            lastModified: '2024-01-12',
            status: 'published'
          },
          {
            name: 'SEO',
            path: '/seo',
            locale: 'en',
            title: 'SEO Services - Commerd',
            description: 'Professional SEO services for your business',
            lastModified: '2024-01-08',
            status: 'published'
          },
          {
            name: 'SEO',
            path: '/th/seo',
            locale: 'th',
            title: 'บริการ SEO - Commerd',
            description: 'บริการ SEO มืออาชีพสำหรับธุรกิจของคุณ',
            lastModified: '2024-01-08',
            status: 'published'
          },
          {
            name: 'Conversion Optimization',
            path: '/conversion-optimization',
            locale: 'en',
            title: 'Conversion Optimization - Commerd',
            description: 'Optimize your conversion rates with our expertise',
            lastModified: '2024-01-05',
            status: 'published'
          },
          {
            name: 'Conversion Optimization',
            path: '/th/conversion-optimization',
            locale: 'th',
            title: 'การเพิ่มประสิทธิภาพการแปลง - Commerd',
            description: 'เพิ่มประสิทธิภาพอัตราการแปลงด้วยความเชี่ยวชาญของเรา',
            lastModified: '2024-01-05',
            status: 'published'
          }
        ];

        setPages(mockPages);
      } catch (error) {
        console.error('Error loading pages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'admin-badge admin-badge-success';
      case 'draft':
        return 'admin-badge admin-badge-warning';
      case 'archived':
        return 'admin-badge admin-badge-error';
      default:
        return 'admin-badge admin-badge-warning';
    }
  };

  const getLocaleFlag = (locale: string) => {
    switch (locale) {
      case 'en':
        return '🇺🇸';
      case 'th':
        return '🇹🇭';
      default:
        return '🌐';
    }
  };

  return (
    <div className="admin-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Management</h1>
        <p className="text-gray-600">Manage website pages and content</p>
      </div>

      {/* Page Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="admin-card">
          <h3 className="font-semibold text-gray-900 mb-2">Total Pages</h3>
          <p className="text-2xl font-bold text-primary-600">{pages.length}</p>
        </div>
        <div className="admin-card">
          <h3 className="font-semibold text-gray-900 mb-2">Published</h3>
          <p className="text-2xl font-bold text-green-600">
            {pages.filter(p => p.status === 'published').length}
          </p>
        </div>
        <div className="admin-card">
          <h3 className="font-semibold text-gray-900 mb-2">Drafts</h3>
          <p className="text-2xl font-bold text-orange-600">
            {pages.filter(p => p.status === 'draft').length}
          </p>
        </div>
        <div className="admin-card">
          <h3 className="font-semibold text-gray-900 mb-2">Archived</h3>
          <p className="text-2xl font-bold text-red-600">
            {pages.filter(p => p.status === 'archived').length}
          </p>
        </div>
      </div>

      {/* Pages Table */}
      <div className="admin-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">All Pages</h2>
          <div className="flex space-x-2">
            <button className="admin-button">
              Create New Page
            </button>
            <button className="admin-button admin-button-secondary">
              Export Pages
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Loading pages...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Locale</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Last Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page, index) => (
                  <tr key={index}>
                    <td>
                      <div className="font-medium text-gray-900">{page.name}</div>
                      <div className="text-sm text-gray-500 font-mono">{page.path}</div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getLocaleFlag(page.locale)}</span>
                        <span className="text-sm font-medium">{page.locale.toUpperCase()}</span>
                      </div>
                    </td>
                    <td>
                      <div className="max-w-xs truncate" title={page.title}>
                        {page.title}
                      </div>
                    </td>
                    <td>
                      <div className="max-w-xs truncate text-sm text-gray-600" title={page.description}>
                        {page.description}
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(page.status)}>
                        {page.status}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-500">{page.lastModified}</span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Archive
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="admin-card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="admin-button admin-button-secondary">
            Create New Page
          </button>
          <button className="admin-button admin-button-secondary">
            Bulk Edit Pages
          </button>
          <button className="admin-button admin-button-secondary">
            Export All Pages
          </button>
          <button className="admin-button admin-button-secondary">
            Import Pages
          </button>
        </div>
      </div>
    </div>
  );
}
