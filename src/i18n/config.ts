import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from '@/locales'

/**
 * INTENTIONAL DUPLICATION: This function is duplicated in index.html (lines 19-26)
 * for FOUC prevention. The inline script runs before React loads and cannot import
 * ES modules. If you modify this logic, you MUST update index.html accordingly.
 */
const getBrowserLanguage = (): string => {
  try {
    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'en' || browserLang === 'pl' ? browserLang : 'pl'
  } catch {
    return 'pl'
  }
}

const getStoredLanguage = (): string => {
  try {
    const stored = localStorage.getItem('language')
    return stored === 'en' || stored === 'pl' ? stored : getBrowserLanguage()
  } catch {
    return getBrowserLanguage()
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
