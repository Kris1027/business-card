import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage)
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
        aria-haspopup="true"
        className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="py-1">
            {languages.map(lang => (
              <button
                key={lang.code}
                role="menuitem"
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700 ${
                  language === lang.code
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
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
