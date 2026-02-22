import { render, screen } from '@/test/test-utils'
import Logo from '@/components/logo'

vi.mock('@/assets/logo-1.png?w=192&format=webp;png&as=picture', () => ({
  default: {
    sources: { webp: '/logo.webp 192w', png: '/logo.png 192w' },
    img: { src: '/logo.png', w: 192, h: 192 },
  },
}))

describe('Logo', () => {
  it('renders with default large size', () => {
    render(<Logo />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveClass('h-16', 'w-16')
  })

  it('renders with small size', () => {
    render(<Logo size="sm" />)
    const img = screen.getByRole('img')
    expect(img).toHaveClass('h-6', 'w-6')
  })

  it('renders with medium size', () => {
    render(<Logo size="md" />)
    const img = screen.getByRole('img')
    expect(img).toHaveClass('h-10', 'w-10')
  })

  it('applies custom className', () => {
    render(<Logo className="my-custom-class" />)
    const img = screen.getByRole('img')
    expect(img).toHaveClass('my-custom-class')
  })

  it('has accessible alt text', () => {
    render(<Logo />)
    expect(screen.getByAltText('techKris')).toBeInTheDocument()
  })
})
