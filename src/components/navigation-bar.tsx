import { useState } from 'react'

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
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
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-md"
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile header */}
        <div className="flex items-center justify-between py-4 md:hidden">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
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
            <span className="text-xl font-bold text-gray-900">Brand</span>
          </a>

          {/* Hamburger button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="relative h-10 w-10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="sr-only">Toggle menu</span>
            {/* Hamburger icon with animation */}
            <div className="flex h-full flex-col items-center justify-center gap-1.5">
              <span
                className={`h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-gray-900 transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
                  isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Desktop header */}
        <div className="hidden items-center justify-between py-4 md:flex">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
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
            <span className="text-xl font-bold text-gray-900">Brand</span>
          </a>

          {/* Desktop nav links */}
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {link.name}
              </a>
            ))}
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
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
