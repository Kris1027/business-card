import { useTranslation } from 'react-i18next'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { useTheme } from '@/hooks/use-theme'

export const ThemeToggle = () => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="focus-glow-pulse rounded-lg p-2 text-[var(--color-text-secondary)] transition-shadow duration-300 hover:bg-[var(--color-surface-hover)] focus-visible:shadow-[0_0_0_3px_var(--color-focus-glow-inner),0_0_20px_var(--color-focus-glow-outer)] focus-visible:outline-none"
      aria-label={theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')}
    >
      {theme === 'light' ? <HiMoon className="h-5 w-5" /> : <HiSun className="h-5 w-5" />}
    </button>
  )
}
