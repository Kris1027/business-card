import { renderHook, act } from '@testing-library/react'
import i18n from '@/i18n/config'
import { useLanguage } from '@/hooks/use-language'
import { LanguageProvider } from '@/components/language-provider'

describe('useLanguage', () => {
  beforeEach(() => {
    localStorage.clear()
    i18n.changeLanguage('pl')
  })

  it('throws when used outside LanguageProvider', () => {
    expect(() => renderHook(() => useLanguage())).toThrow(
      'useLanguage must be used within a LanguageProvider'
    )
  })

  it('returns current language from i18n', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: LanguageProvider })

    expect(result.current.language).toBe('pl')
  })

  it('changes language', async () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: LanguageProvider })

    await act(async () => {
      await result.current.changeLanguage('en')
    })

    expect(result.current.language).toBe('en')
    expect(i18n.language).toBe('en')
  })

  it('persists language to localStorage', async () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: LanguageProvider })

    await act(async () => {
      await result.current.changeLanguage('en')
    })

    expect(localStorage.getItem('language')).toBe('en')
  })

  it('updates html lang attribute', async () => {
    const { result } = renderHook(() => useLanguage(), { wrapper: LanguageProvider })

    await act(async () => {
      await result.current.changeLanguage('en')
    })

    expect(document.documentElement.lang).toBe('en')
  })
})
