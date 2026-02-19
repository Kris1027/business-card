import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { HiEnvelope, HiPhone, HiMapPin, HiClipboardDocument, HiCheck } from 'react-icons/hi2'
import { SiDiscord, SiGithub, SiLinkedin } from 'react-icons/si'
import { contactInfo } from '@/constants/contact-info'
import { SITE_URL } from '@/constants/site-config'
import Seo from '@/components/seo'
import { BreadcrumbJsonLd, LocalBusinessJsonLd } from '@/components/json-ld'

const CheckIcon = () => <HiCheck className="h-5 w-5 text-success" />

const CopyIcon = () => <HiClipboardDocument className="h-5 w-5" />

const Contact = () => {
  const { t } = useTranslation()
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copyToClipboard = (text: string, field: string) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedField(field)
        timeoutRef.current = window.setTimeout(() => {
          setCopiedField(null)
          timeoutRef.current = null
        }, 2000)
      })
      .catch(err => {
        console.error('Failed to copy to clipboard:', err)
      })
  }

  const breadcrumbItems = [
    { name: t('navigation.home'), url: SITE_URL },
    { name: t('navigation.contact'), url: `${SITE_URL}/contact` },
  ]

  return (
    <>
      <Seo
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        path="/contact"
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <LocalBusinessJsonLd
        name="techKris"
        description={t('seo.contact.description')}
        email={contactInfo.email}
        telephone={contactInfo.phone}
        address={{
          locality: 'Zabrze',
          region: 'Silesian Voivodeship',
          country: 'Poland',
        }}
      />
      <div className="py-12">
        <div className="mx-auto max-w-4xl">
          <div className="animate-fade-in-up mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-text-primary">{t('contact.title')}</h1>
            <p className="text-lg text-text-body">{t('contact.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className="animate-fade-in-up group rounded-xl bg-surface-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: '0ms' }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info-bg text-info-text transition-transform duration-300 group-hover:scale-110">
                    <HiEnvelope className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">{t('contact.email')}</h3>
                </div>
                <button
                  onClick={() => copyToClipboard(contactInfo.email, 'email')}
                  className="focus-glow cursor-pointer rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-hover hover:text-text-secondary"
                  aria-label={t('contact.copyToClipboard')}
                >
                  {copiedField === 'email' ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="focus-glow inline-block rounded-md px-2 py-1 text-text-body transition-colors hover:text-text-link"
                aria-label={t('contact.emailLabel', { email: contactInfo.email })}
              >
                {contactInfo.email}
              </a>
              {copiedField === 'email' && (
                <p className="mt-2 text-sm text-success-text">{t('contact.copied')}</p>
              )}
            </div>

            <div
              className="animate-fade-in-up group rounded-xl bg-surface-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: '100ms' }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success-bg text-success-text transition-transform duration-300 group-hover:scale-110">
                    <HiPhone className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">{t('contact.phone')}</h3>
                </div>
                <button
                  onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                  className="focus-glow cursor-pointer rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-hover hover:text-text-secondary"
                  aria-label={t('contact.copyToClipboard')}
                >
                  {copiedField === 'phone' ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="focus-glow inline-block rounded-md px-2 py-1 text-text-body transition-colors hover:text-success-text"
                aria-label={t('contact.phoneLabel', { phone: contactInfo.phone })}
              >
                {contactInfo.phone}
              </a>
              {copiedField === 'phone' && (
                <p className="mt-2 text-sm text-success-text">{t('contact.copied')}</p>
              )}
            </div>

            <div
              className="animate-fade-in-up group rounded-xl bg-surface-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: '200ms' }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning-bg text-warning-text transition-transform duration-300 group-hover:scale-110">
                  <HiMapPin className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{t('contact.location')}</h3>
              </div>
              <a
                href={contactInfo.locationMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-glow inline-block rounded-md px-2 py-1 text-text-body transition-colors hover:text-warning-text"
                aria-label={t('contact.locationLabel')}
              >
                {contactInfo.location}
              </a>
            </div>

            <div
              className="animate-fade-in-up group rounded-xl bg-surface-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: '300ms' }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-discord-bg text-discord-text transition-transform duration-300 group-hover:scale-110">
                    <SiDiscord className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {t('contact.discord')}
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(contactInfo.discord, 'discord')}
                  className="focus-glow cursor-pointer rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-hover hover:text-text-secondary"
                  aria-label={t('contact.copyToClipboard')}
                >
                  {copiedField === 'discord' ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              <p className="text-text-body" aria-label={t('contact.discordLabel')}>
                {contactInfo.discord}
              </p>
              {copiedField === 'discord' && (
                <p className="mt-2 text-sm text-success-text">{t('contact.copied')}</p>
              )}
            </div>

            <div
              className="animate-fade-in-up group rounded-xl bg-surface-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: '400ms' }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-hover text-text-primary transition-transform duration-300 group-hover:scale-110">
                  <SiGithub className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{t('contact.github')}</h3>
              </div>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-glow inline-block rounded-md px-2 py-1 text-text-body transition-colors hover:text-text-primary"
                aria-label={t('contact.githubLabel')}
              >
                {contactInfo.github.replace('https://', '')}
              </a>
            </div>

            <div
              className="animate-fade-in-up group rounded-xl bg-surface-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: '500ms' }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info-bg text-info-text transition-transform duration-300 group-hover:scale-110">
                  <SiLinkedin className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{t('contact.linkedin')}</h3>
              </div>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-glow inline-block rounded-md px-2 py-1 text-text-body transition-colors hover:text-text-link"
                aria-label={t('contact.linkedinLabel')}
              >
                {contactInfo.linkedin.replace('https://', '')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const Route = createFileRoute('/contact')({
  component: Contact,
})
