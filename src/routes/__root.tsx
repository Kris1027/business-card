import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useTranslation } from 'react-i18next'
import { HiExclamationTriangle, HiMagnifyingGlass } from 'react-icons/hi2'
import AppLayout from '@/components/app-layout'
import { BackToHomeButton } from '@/components/back-to-home-button'

const RootLayout = () => (
  <>
    <AppLayout>
      <Outlet />
    </AppLayout>
    <TanStackRouterDevtools />
  </>
)

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center py-20 text-center">
      <HiMagnifyingGlass className="mb-6 h-20 w-20 text-text-muted" />
      <h1 className="mb-3 text-6xl font-bold text-text-primary">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-text-secondary">
        {t('error.notFoundTitle')}
      </h2>
      <p className="mb-8 max-w-md text-lg text-text-body">{t('error.notFoundDescription')}</p>
      <BackToHomeButton />
    </div>
  )
}

const ErrorPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const handleRetry = () => {
    router.invalidate()
  }

  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center py-20 text-center">
      <HiExclamationTriangle className="mb-6 h-20 w-20 text-warning" />
      <h1 className="mb-3 text-4xl font-bold text-text-primary">{t('error.errorTitle')}</h1>
      <p className="mb-8 max-w-md text-lg text-text-body">{t('error.errorDescription')}</p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleRetry}
          className="focus-glow inline-flex items-center gap-2 rounded-lg bg-interactive-primary px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-interactive-primary-hover hover:shadow-lg active:scale-95"
        >
          {t('error.tryAgain')}
        </button>
        <BackToHomeButton variant="secondary" />
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
})
