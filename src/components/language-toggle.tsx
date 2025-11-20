import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiLanguage } from 'react-icons/hi2'
import { useLanguage } from '@/hooks/use-language'
import type { Language } from '@/locales'

export const LanguageToggle = () => {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages: { code: Language; label: string }[] = [
    { code: 'pl', label: t('language.polish') },
    { code: 'en', label: t('language.english') },
  ]

  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  const handleLanguageChange = async (newLanguage: Language) => {
    await changeLanguage(newLanguage)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        onClick={toggleDropdown}
        aria-label={t('language.languageLabel')}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="focus-glow rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
      >
        <HiLanguage className="h-5 w-5" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-card)] shadow-lg"
        >
          <div className="py-1">
            {languages.map(lang => (
              <button
                key={lang.code}
                role="menuitem"
                onClick={() => handleLanguageChange(lang.code)}
                className={`focus-glow w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[var(--color-surface-hover)] ${
                  language === lang.code
                    ? 'bg-[var(--color-info-bg)] text-[var(--color-text-link)]'
                    : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
