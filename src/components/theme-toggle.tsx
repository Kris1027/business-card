import { useTranslation } from 'react-i18next'
import { HiMoon, HiSun } from 'react-icons/hi2'
import { useTheme } from '@/hooks/use-theme'

export const ThemeToggle = () => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800"
      aria-label={theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')}
    >
      {theme === 'light' ? <HiMoon className="h-5 w-5" /> : <HiSun className="h-5 w-5" />}
    </button>
  )
}
