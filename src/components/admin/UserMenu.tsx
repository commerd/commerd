"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {user.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium">{user.email}</span>
        <svg
          className={`w-4 h-4 transition-transform ${showMenu ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.email}</p>
            <p className="text-xs text-gray-500">Admin User</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
