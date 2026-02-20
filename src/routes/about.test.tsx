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
  PersonJsonLd: () => null,
}))
vi.mock('@/components/picture', () => ({
  Picture: ({ alt }: { alt: string }) => <img alt={alt} />,
}))
vi.mock('@/assets/profil-1.jpg?w=512&format=webp;jpg&as=picture', () => ({
  default: 'test-file-stub',
}))

const { Route } = await import('@/routes/about')
const About = Route.options.component as React.ComponentType

describe('About', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders the name and heading', () => {
    render(<About />)
    expect(screen.getByText('Krzysztof Obarzanek')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'O mnie' })).toBeInTheDocument()
  })

  it('renders the technologies section', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2, name: 'Technologie' })).toBeInTheDocument()
    expect(screen.getByText('HTML5')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders content in English when language is changed', async () => {
    await i18n.changeLanguage('en')
    render(<About />)
    expect(screen.getByRole('heading', { level: 2, name: 'About Me' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Technologies' })).toBeInTheDocument()
  })
})
