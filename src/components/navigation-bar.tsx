import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { Link } from '@tanstack/react-router'
import HamburgerIcon from '@/components/hamburger-icon'
import { LanguageToggle } from '@/components/language-toggle'
import Logo from '@/components/logo'
import { NavigationMenuPanel } from '@/components/navigation-menu-panel'
import { SidebarNavLinks } from '@/components/sidebar-nav-links'
import { ThemeToggle } from '@/components/theme-toggle'
import { SERVICE_IDS } from '@/constants/navigation-links'
import { useClickOutside } from '@/hooks/use-click-outside'

const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed'

const getInitialCollapsed = (): boolean => {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true'
  } catch {
    return false
  }
}

const LINK_EXIT_DURATION_MS = 600

const NavigationBar = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsed)
  const [isLinksExiting, setIsLinksExiting] = useState(false)
  const [expandCount, setExpandCount] = useState(0)
  const navRef = useRef<HTMLElement>(null)
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) {
        clearTimeout(collapseTimerRef.current)
      }
    }
  }, [])

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

  const toggleCollapse = () => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current)
      collapseTimerRef.current = null
    }

    if (!isCollapsed && !isLinksExiting) {
      setIsLinksExiting(true)
      collapseTimerRef.current = setTimeout(() => {
        setIsCollapsed(true)
        setIsLinksExiting(false)
        try {
          localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'true')
        } catch {
          /* localStorage unavailable */
        }
      }, LINK_EXIT_DURATION_MS)
    } else {
      setIsLinksExiting(false)
      setIsCollapsed(false)
      setExpandCount(c => c + 1)
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'false')
      } catch {
        /* localStorage unavailable */
      }
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
    <>
      {/* Mobile / Tablet navigation */}
      <nav
        ref={navRef}
        className="sticky top-0 z-50 bg-[var(--color-nav-bg)] shadow-md backdrop-blur-xl lg:hidden"
        role="navigation"
        aria-label={t('navigation.mobileNavLabel')}
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
                className="focus-glow relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg hover:bg-surface-hover"
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

      {/* Desktop sidebar navigation */}
      <nav
        className={`hidden border-r border-border-default bg-[var(--color-nav-bg)] backdrop-blur-xl transition-all duration-300 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}`}
        role="navigation"
        aria-label={t('navigation.sidebarNavLabel')}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div
            className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
          >
            <Link to="/" className="focus-glow inline-block rounded-lg p-1">
              <Logo />
            </Link>
          </div>
          <button
            onClick={toggleCollapse}
            aria-label={
              isCollapsed ? t('navigation.expandSidebar') : t('navigation.collapseSidebar')
            }
            className="focus-glow flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-link"
          >
            {isCollapsed ? (
              <HiChevronRight className="h-5 w-5" />
            ) : (
              <HiChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isCollapsed ? 'max-h-0' : 'max-h-screen'}`}
        >
          <div className="mx-4 h-0.5 rounded-full bg-interactive-primary" />

          <div className="flex-1 overflow-y-auto px-2 py-4">
            <SidebarNavLinks
              key={expandCount}
              navLinks={navLinks}
              serviceLinks={serviceLinks}
              isExpanded={!isCollapsed && !isLinksExiting}
            />
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-border-default px-4 py-3">
            <LanguageToggle dropdownDirection="up" />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavigationBar
