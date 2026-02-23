import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

type NavLink = {
  name: string
  to: '/' | '/about' | '/contact'
}

type ServiceLink = {
  name: string
  to: '/services/$serviceId'
  params: { serviceId: string }
}

type NavigationMenuPanelProps = {
  navLinks: ReadonlyArray<NavLink>
  serviceLinks: ReadonlyArray<ServiceLink>
  isOpen: boolean
  onLinkClick: () => void
}

const headingClasses = 'mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-text-muted'

const linkClasses =
  'nav-link-hover nav-link-active-bar focus-glow block rounded-lg px-4 py-2.5 text-text-secondary transition-colors hover:text-text-link [&.active]:font-bold [&.active]:text-text-link'

export const NavigationMenuPanel = ({
  navLinks,
  serviceLinks,
  isOpen,
  onLinkClick,
}: NavigationMenuPanelProps) => {
  const { t } = useTranslation()

  let staggerIndex = 0

  return (
    <div className="grid grid-cols-1 gap-4 px-2 py-4 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border-divider">
      <div>
        <h3
          className={`${headingClasses} ${isOpen ? 'animate-menu-item-enter' : ''}`}
          style={{ '--stagger-index': staggerIndex++ } as React.CSSProperties}
        >
          {t('navigation.pagesLabel')}
        </h3>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onLinkClick}
            tabIndex={isOpen ? undefined : -1}
            className={`${linkClasses} ${isOpen ? 'animate-menu-item-enter' : ''}`}
            style={{ '--stagger-index': staggerIndex++ } as React.CSSProperties}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="md:pl-6">
        <h3
          className={`${headingClasses} ${isOpen ? 'animate-menu-item-enter' : ''}`}
          style={{ '--stagger-index': staggerIndex++ } as React.CSSProperties}
        >
          {t('navigation.servicesLabel')}
        </h3>
        {serviceLinks.map(link => (
          <Link
            key={link.params.serviceId}
            to={link.to}
            params={link.params}
            onClick={onLinkClick}
            tabIndex={isOpen ? undefined : -1}
            className={`${linkClasses} ${isOpen ? 'animate-menu-item-enter' : ''}`}
            style={{ '--stagger-index': staggerIndex++ } as React.CSSProperties}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
