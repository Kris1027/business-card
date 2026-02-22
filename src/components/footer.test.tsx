import { renderWithRouter, screen, waitFor } from '@/test/router-utils'
import i18n from '@/i18n/config'
import Footer from '@/components/footer'

vi.mock('@/components/logo', () => ({
  default: () => <div data-testid="logo" />,
}))

describe('Footer', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('pl')
  })

  it('renders footer with contentinfo role', async () => {
    renderWithRouter(<Footer />)

    await waitFor(() => {
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })

  it('renders section headings', async () => {
    renderWithRouter(<Footer />)

    await waitFor(() => {
      expect(screen.getByText('Szybkie linki')).toBeInTheDocument()
      expect(screen.getByText('Usługi')).toBeInTheDocument()
    })
  })

  it('renders content in English when language is changed', async () => {
    await i18n.changeLanguage('en')
    renderWithRouter(<Footer />)

    await waitFor(() => {
      expect(screen.getByText('Quick Links')).toBeInTheDocument()
      expect(screen.getByText('Services')).toBeInTheDocument()
      expect(screen.getByText('Contact Info')).toBeInTheDocument()
    })
  })

  it('renders all service links in Polish', async () => {
    renderWithRouter(<Footer />)

    await waitFor(() => {
      expect(screen.getByText('Doradztwo sprzętowe')).toBeInTheDocument()
      expect(screen.getByText('Składanie PC')).toBeInTheDocument()
      expect(screen.getByText('Tworzenie stron')).toBeInTheDocument()
      expect(screen.getByText('Pomoc techniczna')).toBeInTheDocument()
    })
  })

  it('renders all service links in English', async () => {
    await i18n.changeLanguage('en')
    renderWithRouter(<Footer />)

    await waitFor(() => {
      expect(screen.getByText('Equipment Advising')).toBeInTheDocument()
      expect(screen.getByText('PC Assembly')).toBeInTheDocument()
      expect(screen.getByText('Web Development')).toBeInTheDocument()
      expect(screen.getByText('Technical Support')).toBeInTheDocument()
    })
  })
})
