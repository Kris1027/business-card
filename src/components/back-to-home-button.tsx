import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

type BackToHomeButtonProps = {
  variant?: 'primary' | 'secondary'
  className?: string
}

const BackToHomeButton = ({ variant = 'primary', className = '' }: BackToHomeButtonProps) => {
  const { t } = useTranslation()

  const baseClasses =
    'inline-flex items-center gap-2 rounded-lg font-semibold shadow-md transition-all duration-300 hover:gap-3 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95'

  const variantClasses = {
    primary:
      'bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900',
    secondary:
      'bg-gray-100 px-6 py-3 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900',
  }

  return (
    <Link to="/" className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {t('services.backToHome')}
    </Link>
  )
}

export { BackToHomeButton }
