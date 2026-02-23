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

  it('renders both navigation landmarks', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      const navs = screen.getAllByRole('navigation')
      expect(navs).toHaveLength(2)
    })
  })

  it('renders logo images in both navs', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      const logos = screen.getAllByRole('img')
      expect(logos).toHaveLength(2)
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

    expect(screen.getAllByText('Doradztwo sprzętowe').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Składanie PC').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Tworzenie stron').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Pomoc techniczna').length).toBeGreaterThanOrEqual(1)
  })

  it('renders sidebar collapse toggle with correct aria-label', async () => {
    renderWithRouter(<NavigationBar />)

    await waitFor(() => {
      const collapseButton = screen.getByLabelText(/zwiń panel/i)
      expect(collapseButton).toBeInTheDocument()
    })
  })

  it('toggles sidebar collapse state on button click', async () => {
    const user = userEvent.setup()
    renderWithRouter(<NavigationBar />)

    const collapseButton = await waitFor(() => screen.getByLabelText(/zwiń panel/i))
    await user.click(collapseButton)

    expect(screen.getByLabelText(/rozwiń panel/i)).toBeInTheDocument()
  })

  it('renders all service links in English', async () => {
    await i18n.changeLanguage('en')
    const user = userEvent.setup()
    renderWithRouter(<NavigationBar />)

    const menuButton = await waitFor(() => screen.getByLabelText(/toggle navigation menu/i))
    await user.click(menuButton)

    expect(screen.getAllByText('Equipment Advising').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('PC Assembly').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Web Development').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Technical Support').length).toBeGreaterThanOrEqual(1)
  })
})
