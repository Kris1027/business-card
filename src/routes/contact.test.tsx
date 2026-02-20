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
vi.mock('@/components/json-ld', () => ({
  BreadcrumbJsonLd: () => null,
  LocalBusinessJsonLd: () => null,
}))

const { Route } = await import('@/routes/contact')
const Contact = Route.options.component as React.ComponentType

describe('Contact', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders the page heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { level: 1, name: 'Skontaktuj się' })).toBeInTheDocument()
  })

  it('renders all contact methods', () => {
    render(<Contact />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('kris1027.dev@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('+48 792 542 841')).toBeInTheDocument()
    expect(screen.getByText('Discord')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })

  it('renders content in English when language is changed', async () => {
    await i18n.changeLanguage('en')
    render(<Contact />)
    expect(screen.getByRole('heading', { level: 1, name: 'Get in Touch' })).toBeInTheDocument()
  })
})
