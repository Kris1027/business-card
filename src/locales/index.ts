import { en } from '@/locales/en'
import { pl } from '@/locales/pl'

export const SUPPORTED_LANGUAGES = ['en', 'pl'] as const
export const DEFAULT_LANGUAGE = 'en' as const

export const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
}

export type Language = (typeof SUPPORTED_LANGUAGES)[number]
