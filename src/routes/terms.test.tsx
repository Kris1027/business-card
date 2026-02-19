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

const { Route } = await import('@/routes/terms')
const Terms = Route.options.component as React.ComponentType

describe('Terms', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders the page heading', () => {
    render(<Terms />)
    expect(screen.getByRole('heading', { level: 1, name: 'Regulamin' })).toBeInTheDocument()
  })

  it('renders terms content sections', () => {
    render(<Terms />)
    expect(screen.getByText('1. Postanowienia ogólne')).toBeInTheDocument()
    expect(screen.getByText('8. Prawo właściwe')).toBeInTheDocument()
  })

  it('renders content in English when language is changed', async () => {
    await i18n.changeLanguage('en')
    render(<Terms />)
    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Service' })).toBeInTheDocument()
    expect(screen.getByText('1. General Provisions')).toBeInTheDocument()
  })
})
