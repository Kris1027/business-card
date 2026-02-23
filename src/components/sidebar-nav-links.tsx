import { Link } from '@tanstack/react-router'
import type { NavLink, ServiceLink } from '@/types/navigation'

type SidebarNavLinksProps = {
  navLinks: ReadonlyArray<NavLink>
  serviceLinks: ReadonlyArray<ServiceLink>
  isExpanded: boolean
}

const linkClasses =
  'nav-link-hover nav-link-active-bar focus-glow block rounded-lg px-4 py-2.5 text-text-secondary transition-colors hover:text-text-link [&.active]:font-bold [&.active]:text-text-link'

export const SidebarNavLinks = ({ navLinks, serviceLinks, isExpanded }: SidebarNavLinksProps) => {
  return (
    <div className="flex flex-col gap-2">
      {navLinks.map((link, index) => (
        <Link
          key={link.to}
          to={link.to}
          className={`${linkClasses} ${isExpanded ? 'animate-sidebar-link-enter' : ''}`}
          style={isExpanded ? ({ '--stagger-index': index } as React.CSSProperties) : undefined}
        >
          {link.name}
        </Link>
      ))}

      <div
        className={`mx-4 my-2 h-px bg-border-divider ${isExpanded ? 'animate-sidebar-link-enter' : ''}`}
        style={
          isExpanded ? ({ '--stagger-index': navLinks.length } as React.CSSProperties) : undefined
        }
      />

      {serviceLinks.map((link, index) => (
        <Link
          key={link.params.serviceId}
          to={link.to}
          params={link.params}
          className={`${linkClasses} ${isExpanded ? 'animate-sidebar-link-enter' : ''}`}
          style={
            isExpanded
              ? ({ '--stagger-index': navLinks.length + 1 + index } as React.CSSProperties)
              : undefined
          }
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}
