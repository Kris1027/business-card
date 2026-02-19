import { useTranslation } from 'react-i18next'
import { Picture } from '@/components/picture'
import logo from '@/assets/logo-1.png?w=192&format=webp;png&as=picture'

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
    <Picture
      data={logo}
      alt={t('navigation.brand')}
      sizes="96px"
      className={`${sizeClasses[size]} dark:brightness-0 dark:invert ${className}`}
      loading="eager"
    />
  )
}

export default Logo
