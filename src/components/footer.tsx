import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa'
import { HiMail, HiPhone } from 'react-icons/hi'
import { contactInfo } from '@/constants/contact-info'
import { SERVICE_IDS } from '@/constants/navigation-links'
import Logo from '@/components/logo'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { to: '/', label: t('navigation.home') },
    { to: '/about', label: t('navigation.about') },
    { to: '/contact', label: t('navigation.contact') },
  ]

  const serviceLinks = [
    {
      to: '/services/$service-id' as const,
      params: { 'service-id': SERVICE_IDS.EQUIPMENT_ADVISING },
      label: t('navigation.equipmentAdvising'),
    },
    {
      to: '/services/$service-id' as const,
      params: { 'service-id': SERVICE_IDS.COMPUTER_ASSEMBLY },
      label: t('navigation.computerAssembly'),
    },
    {
      to: '/services/$service-id' as const,
      params: { 'service-id': SERVICE_IDS.WEBSITE_BUILDING },
      label: t('navigation.websiteBuilding'),
    },
  ]

  const contactInfoItems = [
    {
      icon: HiMail,
      text: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      ariaLabel: t('contact.emailLabel', { email: contactInfo.email }),
    },
    {
      icon: HiPhone,
      text: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      ariaLabel: t('contact.phoneLabel', { phone: contactInfo.phone }),
    },
    {
      icon: FaMapMarkerAlt,
      text: contactInfo.location,
      href: contactInfo.locationMapUrl,
      ariaLabel: t('contact.locationLabel'),
      external: true,
    },
  ]

  const socialLinks = [
    {
      icon: FaGithub,
      href: contactInfo.github,
      ariaLabel: t('contact.githubLabel'),
      name: 'GitHub',
    },
    {
      icon: FaLinkedin,
      href: contactInfo.linkedin,
      ariaLabel: t('contact.linkedinLabel'),
      name: 'LinkedIn',
    },
  ]

  return (
    <footer
      role="contentinfo"
      aria-label={t('footer.footerLabel')}
      className="border-t border-border-divider bg-surface-card"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main footer content - grid layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="focus-glow inline-block rounded-md px-2 py-1 text-sm text-text-body transition-colors hover:text-text-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
              {t('footer.servicesTitle')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map(link => (
                <li key={link.params['service-id']}>
                  <Link
                    to={link.to}
                    params={link.params}
                    className="focus-glow inline-block rounded-md px-2 py-1 text-sm text-text-body transition-colors hover:text-text-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-3">
              {contactInfoItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={item.ariaLabel}
                    className="focus-glow flex items-center gap-2 rounded-md px-2 py-1 text-sm text-text-body transition-colors hover:text-text-link"
                  >
                    <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="break-all">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border-divider" />

        {/* Bottom section - social links and copyright */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Social links */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-text-primary">{t('footer.followMe')}:</span>
            <div className="flex gap-3">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="focus-glow rounded-md p-2 text-text-body transition-all hover:scale-110 hover:text-text-link"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-body">
            {t('footer.allRightsReserved', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
