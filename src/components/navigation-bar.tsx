import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import HamburgerIcon from '@/components/hamburger-icon'
import { LanguageToggle } from '@/components/language-toggle'
import Logo from '@/components/logo'
import { NavigationMenuPanel } from '@/components/navigation-menu-panel'
import { ThemeToggle } from '@/components/theme-toggle'
import { SERVICE_IDS } from '@/constants/navigation-links'
import { useClickOutside } from '@/hooks/use-click-outside'

const NavigationBar = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu()
    }
  }

  useClickOutside(navRef, closeMenu)

  const navLinks = [
    { name: t('navigation.home'), to: '/' as const },
    { name: t('navigation.about'), to: '/about' as const },
    { name: t('navigation.contact'), to: '/contact' as const },
  ]

  const serviceLinks = [
    {
      name: t('navigation.equipmentAdvising'),
      to: '/services/$serviceId' as const,
      params: { serviceId: SERVICE_IDS.EQUIPMENT_ADVISING },
    },
    {
      name: t('navigation.computerAssembly'),
      to: '/services/$serviceId' as const,
      params: { serviceId: SERVICE_IDS.COMPUTER_ASSEMBLY },
    },
    {
      name: t('navigation.websiteBuilding'),
      to: '/services/$serviceId' as const,
      params: { serviceId: SERVICE_IDS.WEBSITE_BUILDING },
    },
    {
      name: t('navigation.technicalSupport'),
      to: '/services/$serviceId' as const,
      params: { serviceId: SERVICE_IDS.TECHNICAL_SUPPORT },
    },
  ]

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-[var(--color-nav-bg)] shadow-md backdrop-blur-xl"
      role="navigation"
      aria-label={t('navigation.mainNavLabel')}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={closeMenu} className="focus-glow rounded-lg p-1">
            <Logo />
          </Link>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              aria-label={t('navigation.toggleMenuLabel')}
              aria-expanded={isMenuOpen}
              aria-controls="nav-menu"
              className="focus-glow relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface-hover"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
      </div>

      <div
        id="nav-menu"
        className={`grid transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-2 h-0.5 rounded-full bg-interactive-primary" />
            <NavigationMenuPanel
              navLinks={navLinks}
              serviceLinks={serviceLinks}
              isOpen={isMenuOpen}
              onLinkClick={closeMenu}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
