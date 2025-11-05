import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from '@/locales'

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
