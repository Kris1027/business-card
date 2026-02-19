import { render, screen, userEvent, waitFor } from '@/test/test-utils'
import i18n from '@/i18n/config'
import { LanguageToggle } from '@/components/language-toggle'

describe('LanguageToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    i18n.changeLanguage('pl')
  })

  it('renders language toggle button', () => {
    render(<LanguageToggle />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    render(<LanguageToggle />)

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('closes dropdown on second click', async () => {
    const user = userEvent.setup()
    render(<LanguageToggle />)

    const button = screen.getByRole('button')
    await user.click(button)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(button)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('changes language when option is selected', async () => {
    const user = userEvent.setup()
    render(<LanguageToggle />)

    await user.click(screen.getByRole('button'))

    const englishOption = screen.getByRole('menuitem', { name: /angielski/i })
    await user.click(englishOption)

    await waitFor(() => {
      expect(i18n.language).toBe('en')
    })
  })

  it('closes dropdown on Escape key', async () => {
    const user = userEvent.setup()
    render(<LanguageToggle />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
