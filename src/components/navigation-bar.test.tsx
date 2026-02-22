import { renderWithRouter, screen, waitFor, userEvent } from '@/test/router-utils'
import i18n from '@/i18n/config'
import NavigationBar from '@/components/navigation-bar'

vi.mock('@/components/logo', () => ({
  default: ({ className }: { className?: string }) => (
    <img src="test-logo.png" alt="techKris" className={className} />
  ),
}))

describe('NavigationBar', () => {
  beforeEach(async () => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    await i18n.changeLanguage('pl')
  })

  it('renders navigation landmark', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })

  it('renders logo image', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      const logos = screen.getAllByRole('img')
      expect(logos.length).toBeGreaterThan(0)
    })
  })

  it('renders theme and language toggle buttons', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(3)
    })
  })

  it('renders mobile menu toggle button', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      expect(screen.getByLabelText(/przełącz menu nawigacji/i)).toBeInTheDocument()
    })
  })

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup()
    renderWithRouter(<NavigationBar />)

    const menuButton = await waitFor(() => screen.getByLabelText(/przełącz menu nawigacji/i))
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders all service links in Polish', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      expect(screen.getAllByText('Doradztwo sprzętowe')).toBeTruthy()
      expect(screen.getAllByText('Składanie PC')).toBeTruthy()
      expect(screen.getAllByText('Tworzenie stron')).toBeTruthy()
      expect(screen.getAllByText('Pomoc techniczna')).toBeTruthy()
    })
  })

  it('renders all service links in English', async () => {
    await i18n.changeLanguage('en')
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      expect(screen.getAllByText('Equipment Advising')).toBeTruthy()
      expect(screen.getAllByText('PC Assembly')).toBeTruthy()
      expect(screen.getAllByText('Web Development')).toBeTruthy()
      expect(screen.getAllByText('Technical Support')).toBeTruthy()
    })
  })
})
