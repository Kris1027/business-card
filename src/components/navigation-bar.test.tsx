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

  it('renders a single logo image', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      const logos = screen.getAllByRole('img')
      expect(logos).toHaveLength(1)
    })
  })

  it('renders theme and language toggle buttons', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(3)
    })
  })

  it('renders hamburger button with aria-expanded', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      const menuButton = screen.getByLabelText(/przełącz menu nawigacji/i)
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('renders hamburger icon with aria-hidden div', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      const menuButton = screen.getByLabelText(/przełącz menu nawigacji/i)
      const hamburgerDiv = menuButton.querySelector('[aria-hidden="true"]')
      expect(hamburgerDiv).toBeInTheDocument()
    })
  })

  it('toggles menu on button click', async () => {
    const user = userEvent.setup()
    renderWithRouter(<NavigationBar />)

    const menuButton = await waitFor(() => screen.getByLabelText(/przełącz menu nawigacji/i))
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('applies stagger animation classes when menu is open', async () => {
    const user = userEvent.setup()
    renderWithRouter(<NavigationBar />)

    const menuButton = await waitFor(() => screen.getByLabelText(/przełącz menu nawigacji/i))
    await user.click(menuButton)

    const animatedElements = document.querySelectorAll('.animate-menu-item-enter')
    expect(animatedElements.length).toBeGreaterThan(0)
  })

  it('closes menu on Escape key', async () => {
    const user = userEvent.setup()
    renderWithRouter(<NavigationBar />)

    const menuButton = await waitFor(() => screen.getByLabelText(/przełącz menu nawigacji/i))
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders all service links in Polish', async () => {
    const user = userEvent.setup()
    renderWithRouter(<NavigationBar />)

    const menuButton = await waitFor(() => screen.getByLabelText(/przełącz menu nawigacji/i))
    await user.click(menuButton)

    expect(screen.getByText('Doradztwo sprzętowe')).toBeInTheDocument()
    expect(screen.getByText('Składanie PC')).toBeInTheDocument()
    expect(screen.getByText('Tworzenie stron')).toBeInTheDocument()
    expect(screen.getByText('Pomoc techniczna')).toBeInTheDocument()
  })

  it('renders all service links in English', async () => {
    await i18n.changeLanguage('en')
    const user = userEvent.setup()
    renderWithRouter(<NavigationBar />)

    const menuButton = await waitFor(() => screen.getByLabelText(/toggle navigation menu/i))
    await user.click(menuButton)

    expect(screen.getByText('Equipment Advising')).toBeInTheDocument()
    expect(screen.getByText('PC Assembly')).toBeInTheDocument()
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('Technical Support')).toBeInTheDocument()
  })
})
