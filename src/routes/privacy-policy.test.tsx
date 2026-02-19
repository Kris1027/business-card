import { render, screen } from '@/test/test-utils'
import i18n from '@/i18n/config'

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    createFileRoute: () => (options: Record<string, unknown>) => ({ options }),
  }
})

vi.mock('@/components/seo', () => ({ default: () => null }))
vi.mock('@/components/json-ld', () => ({ BreadcrumbJsonLd: () => null }))

const { Route } = await import('@/routes/privacy-policy')
const PrivacyPolicy = Route.options.component as React.ComponentType

describe('PrivacyPolicy', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders the page heading', () => {
    render(<PrivacyPolicy />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Polityka prywatności' })
    ).toBeInTheDocument()
  })

  it('renders privacy policy content sections', () => {
    render(<PrivacyPolicy />)
    expect(screen.getByText('1. Administrator danych')).toBeInTheDocument()
    expect(screen.getByText('7. Pliki cookies')).toBeInTheDocument()
  })

  it('renders content in English when language is changed', async () => {
    await i18n.changeLanguage('en')
    render(<PrivacyPolicy />)
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument()
    expect(screen.getByText('1. Data Controller')).toBeInTheDocument()
  })
})
