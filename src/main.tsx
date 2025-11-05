import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import Home from '@/pages/home'
import { ThemeProvider } from '@/components/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  </StrictMode>
)
