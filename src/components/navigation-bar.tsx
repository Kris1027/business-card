import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { SERVICE_IDS } from '@/constants/navigation-links'
import Logo from '@/components/logo'

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

  const serviceLinks = [
    {
      name: t('navigation.equipmentAdvising'),
      to: '/services/$service-id' as const,
      params: { 'service-id': SERVICE_IDS.EQUIPMENT_ADVISING },
    },
    {
      name: t('navigation.computerAssembly'),
      to: '/services/$service-id' as const,
      params: { 'service-id': SERVICE_IDS.COMPUTER_ASSEMBLY },
    },
    {
      name: t('navigation.websiteBuilding'),
      to: '/services/$service-id' as const,
      params: { 'service-id': SERVICE_IDS.WEBSITE_BUILDING },
    },
  ]

  return (
    <nav
      className="sticky top-0 z-50 bg-[var(--color-surface-card)] shadow-md"
      role="navigation"
      aria-label={t('navigation.mainNavLabel')}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile header */}
        <div className="flex items-center justify-between md:hidden">
          {/* Logo */}
          <Link to="/" onClick={closeMobileMenu} className="focus-glow rounded-lg p-1">
            <Logo />
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
              className="focus-glow relative h-10 w-10 rounded-lg p-2 hover:bg-[var(--color-surface-hover)]"
            >
              <span className="sr-only">{t('navigation.menuLabel')}</span>
              {isMobileMenuOpen ? (
                <HiXMark className="h-6 w-6 text-[var(--color-text-primary)]" />
              ) : (
                <HiBars3 className="h-6 w-6 text-[var(--color-text-primary)]" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden items-center justify-between md:flex">
          {/* Logo */}
          <Link to="/" className="focus-glow rounded-lg p-1">
            <Logo size="lg" />
          </Link>

          {/* Desktop nav links + Language toggle + Theme toggle */}
          <div className="flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                className="focus-glow rounded-md px-2 py-1 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-link)] [&.active]:font-bold [&.active]:text-[var(--color-text-link)]"
              >
                {link.name}
              </Link>
            ))}
            {serviceLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                params={link.params}
                className="focus-glow rounded-md px-2 py-1 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-link)] [&.active]:font-bold [&.active]:text-[var(--color-text-link)]"
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
                className="focus-glow block rounded-lg px-4 py-3 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-link)] [&.active]:font-bold [&.active]:text-[var(--color-text-link)]"
              >
                {link.name}
              </Link>
            ))}
            {serviceLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                params={link.params}
                onClick={closeMobileMenu}
                className="focus-glow block rounded-lg px-4 py-3 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-link)] [&.active]:font-bold [&.active]:text-[var(--color-text-link)]"
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
