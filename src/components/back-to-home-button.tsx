import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { HiChevronLeft } from 'react-icons/hi2'

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
      'bg-[var(--color-interactive-primary)] px-4 py-2 text-white hover:bg-[var(--color-interactive-primary-hover)] focus:ring-[var(--color-focus-ring)]',
    secondary:
      'bg-[var(--color-surface-hover)] px-6 py-3 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] focus:ring-[var(--color-border-default)]',
  }

  return (
    <Link to="/" className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <HiChevronLeft className="h-5 w-5" />
      {t('services.backToHome')}
    </Link>
  )
}

export { BackToHomeButton }
