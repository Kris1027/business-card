import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { HelmetProvider } from '@dr.pogodin/react-helmet'
import { ErrorBoundary } from 'react-error-boundary'
import { Analytics } from '@vercel/analytics/react'
import '@/index.css'
import '@/i18n/config'
import { LanguageProvider } from '@/components/language-provider'
import RootErrorFallback from '@/components/root-error-fallback'
import { ThemeProvider } from '@/components/theme-provider'
import { routeTree } from '@/routeTree.gen'

const router = createRouter({ routeTree, scrollRestoration: true })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <HelmetProvider>
        <Suspense
          fallback={
            <div
              className="flex min-h-screen items-center justify-center bg-surface-page"
              role="status"
              aria-live="polite"
            >
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-default border-t-interactive-primary" />
              <span className="sr-only">Loading...</span>
            </div>
          }
        >
          <ThemeProvider>
            <LanguageProvider>
              <RouterProvider router={router} />
            </LanguageProvider>
          </ThemeProvider>
        </Suspense>
      </HelmetProvider>
    </ErrorBoundary>
    <Analytics />
  </StrictMode>
)
