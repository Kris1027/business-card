import { useTranslation } from 'react-i18next'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { useTheme } from '@/hooks/use-theme'

export const ThemeToggle = () => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
      aria-label={theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')}
    >
      {theme === 'light' ? <HiMoon className="h-5 w-5" /> : <HiSun className="h-5 w-5" />}
    </button>
  )
}
