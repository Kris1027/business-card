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
  LocalBusinessJsonLd: () => null,
  WebSiteJsonLd: () => null,
}))
vi.mock('@/components/image-carousel', () => ({
  ImageCarousel: () => <div data-testid="image-carousel" />,
}))
vi.mock('@/components/service-card', () => ({
  ServiceCard: ({ title, shortDescription }: { title: string; shortDescription?: string }) => (
    <div>
      <span>{title}</span>
      {shortDescription && <span>{shortDescription}</span>}
    </div>
  ),
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
vi.mock('@/assets/prebuild-1.webp?w=640;960;1280&format=webp&as=picture', () => ({
  default: 'test-file-stub',
}))
vi.mock('@/assets/help-1.webp?w=640;960;1280;1920&format=webp;jpg&as=picture', () => ({
  default: 'test-file-stub',
}))

const { Route } = await import('@/routes/index')
const Index = Route.options.component as React.ComponentType

describe('Index', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders the image carousel', () => {
    render(<Index />)
    expect(screen.getByTestId('image-carousel')).toBeInTheDocument()
  })

  it('renders all four service cards', () => {
    render(<Index />)
    expect(screen.getByText('Doradztwo w doborze sprzętu')).toBeInTheDocument()
    expect(screen.getByText('Składanie komputerów')).toBeInTheDocument()
    expect(screen.getByText('Tworzenie stron internetowych')).toBeInTheDocument()
    expect(screen.getByText('Pomoc techniczna i konfiguracja systemu')).toBeInTheDocument()
  })

  it('renders content in English when language is changed', async () => {
    await i18n.changeLanguage('en')
    render(<Index />)
    expect(screen.getByText('Equipment Advising')).toBeInTheDocument()
    expect(screen.getByText('Computer Assembly')).toBeInTheDocument()
    expect(screen.getByText('Website Building')).toBeInTheDocument()
    expect(screen.getByText('Technical Support & System Setup')).toBeInTheDocument()
  })
})
