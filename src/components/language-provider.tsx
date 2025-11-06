import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageContext } from '@/contexts/language-context'
import type { Language } from '@/locales'

type LanguageProviderProps = {
  children: React.ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<Language>(i18n.language as Language)

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language

    // Save to localStorage
    try {
      localStorage.setItem('language', language)
    } catch {
      // Fail gracefully if localStorage is unavailable
    }
  }, [language])

  const changeLanguage = (newLanguage: Language) => {
    i18n.changeLanguage(newLanguage)
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
