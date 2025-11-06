import { useTranslation } from 'react-i18next'
import AppLayout from '@/components/app-layout'

const Home = () => {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <div className="flex min-h-[80vh] items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{t('home.title')}</h1>
      </div>
    </AppLayout>
  )
}

export default Home
