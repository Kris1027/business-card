import { useTheme } from '@/hooks/use-theme'
import { useTranslation } from 'react-i18next'
import logoLight from '@/assets/logo-11.png'
import logoDark from '@/assets/logo-22.png'

type LogoProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const logo = theme === 'dark' ? logoDark : logoLight

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
  }

  return (
    <img
      src={logo}
      alt={t('navigation.brand')}
      className={`${sizeClasses[size]} rounded-lg ${className}`}
    />
  )
}

export default Logo
