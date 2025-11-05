import { useEffect, useState } from 'react'
import { ThemeContext, type Theme } from '@/contexts/theme-context'

const getInitialTheme = (): Theme => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme | null
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme
      }

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
  } catch {
    // Fail gracefully if localStorage is unavailable (e.g., private browsing, SSR)
  }

  return 'light'
}

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', theme)
      }
    } catch {
      // Fail gracefully if localStorage is unavailable (e.g., private browsing)
    }
  }, [theme])

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
