import { useTranslation } from 'react-i18next'
import logo from '@/assets/logo-1.png'

type LogoProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Logo = ({ size = 'lg', className = '' }: LogoProps) => {
  const { t } = useTranslation()

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  }

  return (
    <img
      src={logo}
      alt={t('navigation.brand')}
      className={`${sizeClasses[size]} dark:brightness-0 dark:invert ${className}`}
    />
  )
}

export default Logo
