import { render } from '@testing-library/react'
import { HelmetProvider } from '@dr.pogodin/react-helmet'
import i18n from '@/i18n/config'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import Seo from '@/components/seo'

vi.mock('@/constants/site-config', () => ({
  SITE_URL: 'https://techkris.eu',
  DEFAULT_OG_IMAGE: '/og-image.png',
}))

const renderSeo = (props: { title: string; description: string; path?: string }) => {
  const context = {} as { helmet?: Record<string, unknown> }
  render(
    <HelmetProvider context={context}>
      <ThemeProvider>
        <LanguageProvider>
          <Seo {...props} />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
  return context
}

describe('Seo', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders title', () => {
    renderSeo({ title: 'Test Title', description: 'Test description' })
    expect(document.title).toBe('Test Title')
  })

  it('renders description meta tag', () => {
    renderSeo({ title: 'Test', description: 'Test description' })
    const description = document.querySelector('meta[name="description"]')
    expect(description).toHaveAttribute('content', 'Test description')
  })

  it('renders canonical link with path', () => {
    renderSeo({ title: 'Title', description: 'Desc', path: '/about' })
    const canonical = document.querySelector('link[rel="canonical"]')
    expect(canonical).toHaveAttribute('href', 'https://techkris.eu/about')
  })
})
