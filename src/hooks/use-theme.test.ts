import { renderHook, act } from '@testing-library/react'
import { useTheme } from '@/hooks/use-theme'
import { ThemeProvider } from '@/components/theme-provider'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('throws when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider'
    )
  })

  it('returns light theme by default', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    expect(result.current.theme).toBe('light')
  })

  it('reads initial theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')

    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    expect(result.current.theme).toBe('dark')
  })

  it('toggles between light and dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('dark')

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('light')
  })

  it('persists theme to localStorage on change', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    act(() => {
      result.current.setTheme('dark')
    })

    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
