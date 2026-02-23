import { useTranslation } from 'react-i18next'
import Footer from '@/components/footer'
import NavigationBar from '@/components/navigation-bar'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col bg-surface-page lg:grid lg:grid-cols-[auto_1fr]">
      <a
        href="#main-content"
        className="focus-glow sr-only z-[100] rounded-md bg-interactive-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t('accessibility.skipToContent')}
      </a>
      <NavigationBar />
      <div className="flex flex-1 flex-col">
        <main
          id="main-content"
          className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default AppLayout
