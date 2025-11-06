import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, resources, SUPPORTED_LANGUAGES } from '@/locales'

/**
 * INTENTIONAL DUPLICATION: This function is duplicated in index.html (lines 22-29)
 * for FOUC prevention. The inline script runs before React loads and cannot import
 * ES modules. If you modify this logic (including SUPPORTED_LANGUAGES), you MUST
 * update index.html accordingly.
 */
const getBrowserLanguage = (): string => {
  try {
    const browserLang = navigator.language.split('-')[0]
    return SUPPORTED_LANGUAGES.includes(browserLang as never) ? browserLang : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

const getStoredLanguage = (): string => {
  try {
    const stored = localStorage.getItem('language')
    return stored && SUPPORTED_LANGUAGES.includes(stored as never) ? stored : getBrowserLanguage()
  } catch {
    return getBrowserLanguage()
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
