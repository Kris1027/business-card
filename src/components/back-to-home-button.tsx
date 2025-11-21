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
    'focus-glow inline-flex items-center gap-2 rounded-lg font-semibold shadow-md transition-all hover:gap-3 hover:shadow-lg active:scale-95'

  const variantClasses = {
    primary: 'bg-interactive-primary px-4 py-2 text-white hover:bg-interactive-primary-hover',
    secondary: 'bg-surface-hover px-6 py-3 text-text-primary hover:bg-border-default',
  }

  return (
    <Link to="/" className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <HiChevronLeft className="h-5 w-5" />
      {t('services.backToHome')}
    </Link>
  )
}

export { BackToHomeButton }
