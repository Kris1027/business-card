import { render, screen } from '@/test/test-utils'
import i18n from '@/i18n/config'

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    createFileRoute: () => (options: Record<string, unknown>) => ({ options }),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  }
})

vi.mock('@/components/seo', () => ({ default: () => null }))
vi.mock('@/components/json-ld', () => ({
  BreadcrumbJsonLd: () => null,
  ServiceJsonLd: () => null,
}))
vi.mock('@/components/picture', () => ({
  Picture: ({ alt }: { alt: string }) => <img alt={alt} />,
}))
vi.mock('@/assets/pc-1.jpg?w=640;960;1280;1920&format=webp;jpg&as=picture', () => ({
  default: 'test-file-stub',
}))
vi.mock('@/assets/pc-2.jpg?w=640;960;1280;1920&format=webp;jpg&as=picture', () => ({
  default: 'test-file-stub',
}))
vi.mock('@/assets/web-1.jpg?w=640;960;1280;1920&format=webp;jpg&as=picture', () => ({
  default: 'test-file-stub',
}))
vi.mock('@/assets/help-1.webp?w=640;960;1280;1920&format=webp;jpg&as=picture', () => ({
  default: 'test-file-stub',
}))

const { Route } = await import('@/routes/services/$serviceId')

describe('ServiceDetail', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders service title for a valid service', () => {
    const useParamsSpy = vi.fn().mockReturnValue({ serviceId: 'equipment-advising' })
    Route.useParams = useParamsSpy

    const ServiceDetail = Route.options.component as React.ComponentType
    render(<ServiceDetail />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Doradztwo w doborze sprzętu' })
    ).toBeInTheDocument()
  })

  it('renders not found message for invalid service', () => {
    const useParamsSpy = vi.fn().mockReturnValue({ serviceId: 'non-existent' })
    Route.useParams = useParamsSpy

    const ServiceDetail = Route.options.component as React.ComponentType
    render(<ServiceDetail />)

    expect(screen.getByText('Usługa nie została znaleziona')).toBeInTheDocument()
  })

  it('renders technical support service in Polish', () => {
    const useParamsSpy = vi.fn().mockReturnValue({ serviceId: 'technical-support' })
    Route.useParams = useParamsSpy

    const ServiceDetail = Route.options.component as React.ComponentType
    render(<ServiceDetail />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Pomoc techniczna i konfiguracja systemu',
      })
    ).toBeInTheDocument()
  })

  it('renders content in English when language is changed', async () => {
    await i18n.changeLanguage('en')
    const useParamsSpy = vi.fn().mockReturnValue({ serviceId: 'computer-assembly' })
    Route.useParams = useParamsSpy

    const ServiceDetail = Route.options.component as React.ComponentType
    render(<ServiceDetail />)

    expect(screen.getByRole('heading', { level: 1, name: 'Computer Assembly' })).toBeInTheDocument()
  })
})
