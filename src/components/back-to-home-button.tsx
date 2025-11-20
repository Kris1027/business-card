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
    'focus-glow-pulse inline-flex items-center gap-2 rounded-lg font-semibold shadow-md transition-all duration-300 hover:gap-3 hover:shadow-lg focus-visible:shadow-[0_0_0_3px_var(--color-focus-glow-inner),0_0_20px_var(--color-focus-glow-outer)] focus-visible:outline-none active:scale-95'

  const variantClasses = {
    primary:
      'bg-[var(--color-interactive-primary)] px-4 py-2 text-white hover:bg-[var(--color-interactive-primary-hover)]',
    secondary:
      'bg-[var(--color-surface-hover)] px-6 py-3 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]',
  }

  return (
    <Link to="/" className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <HiChevronLeft className="h-5 w-5" />
      {t('services.backToHome')}
    </Link>
  )
}

export { BackToHomeButton }
