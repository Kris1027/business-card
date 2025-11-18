import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'

const NavigationBar = () => {
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu()
    }
  }

  const navLinks = [
    { name: t('navigation.home'), to: '/' as const },
    { name: t('navigation.about'), to: '/about' as const },
    { name: t('navigation.contact'), to: '/contact' as const },
  ]

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900 dark:shadow-gray-800/50"
      role="navigation"
      aria-label={t('navigation.mainNavLabel')}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile header */}
        <div className="flex items-center justify-between py-4 md:hidden">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {t('navigation.brand')}
            </span>
          </Link>

          {/* Actions: Language toggle + Theme toggle + Hamburger button */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              aria-label={t('navigation.toggleMenuLabel')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="relative h-10 w-10 rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-800"
            >
              <span className="sr-only">{t('navigation.menuLabel')}</span>
              {/* Hamburger icon with animation */}
              <div className="flex h-full flex-col items-center justify-center gap-1.5">
                <span
                  className={`h-0.5 w-6 bg-gray-900 transition-all duration-300 dark:bg-gray-100 ${
                    isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-6 bg-gray-900 transition-opacity duration-300 dark:bg-gray-100 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`h-0.5 w-6 bg-gray-900 transition-all duration-300 dark:bg-gray-100 ${
                    isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden items-center justify-between py-4 md:flex">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {t('navigation.brand')}
            </span>
          </Link>

          {/* Desktop nav links + Language toggle + Theme toggle */}
          <div className="flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                className="text-gray-700 transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:text-blue-400 [&.active]:font-bold [&.active]:text-blue-600 dark:[&.active]:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-1 pb-4">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400 [&.active]:font-bold [&.active]:text-blue-600 dark:[&.active]:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
