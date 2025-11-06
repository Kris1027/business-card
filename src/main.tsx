import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import '@/i18n/config'
import Home from '@/pages/home'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeProvider } from '@/components/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        <LanguageProvider>
          <Home />
        </LanguageProvider>
      </ThemeProvider>
    </Suspense>
  </StrictMode>
)
