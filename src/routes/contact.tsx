import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { HiEnvelope, HiPhone, HiMapPin, HiClipboardDocument, HiCheck } from 'react-icons/hi2'
import { SiDiscord, SiGithub, SiLinkedin } from 'react-icons/si'
import { contactInfo } from '@/constants/contact-info'

const CheckIcon = () => <HiCheck className="h-5 w-5 text-green-500 dark:text-green-400" />

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

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-800/50"
            style={{ animationDelay: '0ms' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
                  <HiEnvelope className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {t('contact.email')}
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(contactInfo.email, 'email')}
                className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label={t('contact.copyToClipboard')}
              >
                {copiedField === 'email' ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              aria-label={t('contact.emailLabel', { email: contactInfo.email })}
            >
              {contactInfo.email}
            </a>
            {copiedField === 'email' && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                {t('contact.copied')}
              </p>
            )}
          </div>

          <div
            className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-800/50"
            style={{ animationDelay: '100ms' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-transform duration-300 group-hover:scale-110 dark:bg-green-900/30 dark:text-green-400">
                  <HiPhone className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {t('contact.phone')}
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label={t('contact.copyToClipboard')}
              >
                {copiedField === 'phone' ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="text-gray-600 transition-colors hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
              aria-label={t('contact.phoneLabel', { phone: contactInfo.phone })}
            >
              {contactInfo.phone}
            </a>
            {copiedField === 'phone' && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                {t('contact.copied')}
              </p>
            )}
          </div>

          <div
            className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-800/50"
            style={{ animationDelay: '200ms' }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600 transition-transform duration-300 group-hover:scale-110 dark:bg-red-900/30 dark:text-red-400">
                <HiMapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('contact.location')}
              </h3>
            </div>
            <a
              href={contactInfo.locationMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
              aria-label={t('contact.locationLabel')}
            >
              {contactInfo.location}
            </a>
          </div>

          <div
            className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-800/50"
            style={{ animationDelay: '300ms' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-900/30 dark:text-purple-400">
                  <SiDiscord className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {t('contact.discord')}
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(contactInfo.discord, 'discord')}
                className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label={t('contact.copyToClipboard')}
              >
                {copiedField === 'discord' ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300" aria-label={t('contact.discordLabel')}>
              {contactInfo.discord}
            </p>
            {copiedField === 'discord' && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                {t('contact.copied')}
              </p>
            )}
          </div>

          <div
            className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-800/50"
            style={{ animationDelay: '400ms' }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900 transition-transform duration-300 group-hover:scale-110 dark:bg-gray-700 dark:text-gray-100">
                <SiGithub className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('contact.github')}
              </h3>
            </div>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              aria-label={t('contact.githubLabel')}
            >
              {contactInfo.github.replace('https://', '')}
            </a>
          </div>

          <div
            className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 dark:shadow-gray-800/50"
            style={{ animationDelay: '500ms' }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-300">
                <SiLinkedin className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('contact.linkedin')}
              </h3>
            </div>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-300"
              aria-label={t('contact.linkedinLabel')}
            >
              {contactInfo.linkedin.replace('https://', '')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/contact')({
  component: Contact,
})
