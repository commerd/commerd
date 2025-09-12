'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { withLang } from '@/lib/i18n/links'
import { i18nConfig, type Locale } from '@/lib/i18n/config'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

interface MobileMenuProps {
  navigationItems: Array<{ href: string; label: string }>
  t: any
}

export function MobileMenu({ navigationItems, t }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { lang } = useParams<{ lang: string }>()
  const currentLang = i18nConfig.locales.includes(lang as Locale) ? lang as Locale : 'en'

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={closeMenu}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          
          {/* Menu Panel */}
          <div className="relative bg-white shadow-xl max-w-sm w-full h-full ml-auto">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t.navigation.menu || 'Menu'}
                </h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-6 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Language Switcher */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {t.language?.label || 'Language'}
                  </span>
                  <LanguageSwitcher />
                </div>
              </div>

              {/* Contact CTA */}
              <div className="p-4 border-t border-gray-200">
                <Link
                  href={withLang(currentLang, '/contact')}
                  onClick={closeMenu}
                  className="block w-full text-center px-4 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  {t.actions?.contact || 'Contact Us'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
