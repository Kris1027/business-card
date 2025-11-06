import { createContext } from 'react'
import type { Language } from '@/locales'

export type LanguageContextType = {
  language: Language
  changeLanguage: (language: Language) => Promise<void>
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)
