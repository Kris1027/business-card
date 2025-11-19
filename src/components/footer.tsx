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
      className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main footer content - grid layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="md" />
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-blue-400 dark:focus:ring-offset-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {t('footer.servicesTitle')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map(link => (
                <li key={link.params['service-id']}>
                  <Link
                    to={link.to}
                    params={link.params}
                    className="text-sm text-gray-600 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-blue-400 dark:focus:ring-offset-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
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
                    className="flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-blue-400 dark:focus:ring-offset-gray-900"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span className="break-all">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200 dark:border-gray-800" />

        {/* Bottom section - social links and copyright */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Social links */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('footer.followMe')}:
            </span>
            <div className="flex gap-3">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="text-gray-600 transition-all duration-200 hover:scale-110 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-blue-400 dark:focus:ring-offset-gray-900"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('footer.allRightsReserved', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
