import { render, screen, userEvent } from '@/test/test-utils'
import { ThemeToggle } from '@/components/theme-toggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders a button with accessible label', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toHaveAccessibleName()
  })

  it('toggles theme on click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const button = screen.getByRole('button')

    await user.click(button)
    expect(localStorage.getItem('theme')).toBe('dark')

    await user.click(button)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('changes aria-label based on current theme', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    const initialLabel = button.getAttribute('aria-label')

    await user.click(button)
    expect(button.getAttribute('aria-label')).not.toBe(initialLabel)
  })
})
