import { Link } from '@tanstack/react-router'
import type { NavLink, ServiceLink } from '@/types/navigation'

type SidebarNavLinksProps = {
  navLinks: ReadonlyArray<NavLink>
  serviceLinks: ReadonlyArray<ServiceLink>
}

const linkClasses =
  'nav-link-hover nav-link-active-bar focus-glow block rounded-lg px-4 py-2.5 text-text-secondary transition-colors hover:text-text-link [&.active]:font-bold [&.active]:text-text-link'

export const SidebarNavLinks = ({ navLinks, serviceLinks }: SidebarNavLinksProps) => {
  return (
    <div className="flex flex-col gap-2">
      {navLinks.map(link => (
        <Link key={link.to} to={link.to} className={linkClasses}>
          {link.name}
        </Link>
      ))}

      <div className="mx-4 my-2 h-px bg-border-divider" />

      {serviceLinks.map(link => (
        <Link key={link.params.serviceId} to={link.to} params={link.params} className={linkClasses}>
          {link.name}
        </Link>
      ))}
    </div>
  )
}
