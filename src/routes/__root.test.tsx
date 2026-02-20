import { render, screen } from '@/test/test-utils'
import i18n from '@/i18n/config'

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    createRootRoute: (options: Record<string, unknown>) => ({ options }),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
    useRouter: () => ({ invalidate: vi.fn() }),
  }
})

vi.mock('@/components/app-layout', () => ({ default: () => null }))
vi.mock('@/components/back-to-home-button', () => ({
  BackToHomeButton: () => <a href="/">Back to home</a>,
}))

const { Route } = await import('@/routes/__root')
const NotFoundPage = Route.options.notFoundComponent as React.ComponentType
const ErrorPage = Route.options.errorComponent as React.ComponentType

describe('NotFoundPage', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders 404 heading and description', () => {
    render(<NotFoundPage />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Nie znaleziono strony')).toBeInTheDocument()
  })

  it('renders in English when language is changed', async () => {
    await i18n.changeLanguage('en')
    render(<NotFoundPage />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page not found')).toBeInTheDocument()
  })
})

describe('ErrorPage', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders error heading and retry button', () => {
    render(<ErrorPage />)
    expect(screen.getByText('Coś poszło nie tak')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Spróbuj ponownie' })).toBeInTheDocument()
  })
})
