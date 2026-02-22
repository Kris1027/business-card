import { render, screen, act } from '@/test/test-utils'
import { fireEvent } from '@testing-library/react'
import { ImageCarousel } from '@/components/image-carousel'

const mockPictureData = {
  sources: { webp: '/img.webp 640w' },
  img: { src: '/img.jpg', w: 640, h: 480 },
}

const mockImages = [
  { data: { ...mockPictureData }, alt: 'Image 1', title: 'Slide 1' },
  { data: { ...mockPictureData }, alt: 'Image 2', title: 'Slide 2' },
  { data: { ...mockPictureData }, alt: 'Image 3', title: 'Slide 3' },
]

describe('ImageCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders all images', () => {
    render(<ImageCarousel images={mockImages} />)

    for (const image of mockImages) {
      expect(screen.getByAltText(image.alt)).toBeInTheDocument()
    }
  })

  it('renders dot indicators for each slide', () => {
    render(<ImageCarousel images={mockImages} />)

    const dots = screen.getAllByRole('button', { name: /go to slide/i })
    expect(dots).toHaveLength(3)
  })

  it('renders navigation buttons', () => {
    render(<ImageCarousel images={mockImages} />)

    expect(screen.getByLabelText('Previous image')).toBeInTheDocument()
    expect(screen.getByLabelText('Next image')).toBeInTheDocument()
  })

  it('advances to next slide on next button click', () => {
    render(<ImageCarousel images={mockImages} />)

    expect(screen.getByText(/slide 1 of 3/i)).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByLabelText('Next image'))
    })

    expect(screen.getByText(/slide 2 of 3/i)).toBeInTheDocument()
  })

  it('goes to previous slide on previous button click', () => {
    render(<ImageCarousel images={mockImages} />)

    expect(screen.getByText(/slide 1 of 3/i)).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByLabelText('Previous image'))
    })

    expect(screen.getByText(/slide 3 of 3/i)).toBeInTheDocument()
  })

  it('navigates to specific slide on dot click', () => {
    render(<ImageCarousel images={mockImages} />)

    const dots = screen.getAllByRole('button', { name: /go to slide/i })

    act(() => {
      fireEvent.click(dots[2])
    })

    expect(screen.getByText(/slide 3 of 3/i)).toBeInTheDocument()
  })

  it('auto-advances after interval', () => {
    render(<ImageCarousel images={mockImages} interval={3000} />)

    expect(screen.getByText(/slide 1 of 3/i)).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByText(/slide 2 of 3/i)).toBeInTheDocument()
  })

  it('wraps around from last to first on next', () => {
    render(<ImageCarousel images={mockImages} />)

    act(() => {
      fireEvent.click(screen.getByLabelText('Next image'))
      fireEvent.click(screen.getByLabelText('Next image'))
      fireEvent.click(screen.getByLabelText('Next image'))
    })

    expect(screen.getByText(/slide 1 of 3/i)).toBeInTheDocument()
  })

  it('handles touch swipe left to go to next slide', () => {
    render(<ImageCarousel images={mockImages} />)
    const carousel = screen.getByLabelText('Image Carousel')

    act(() => {
      fireEvent.touchStart(carousel, { touches: [{ clientX: 200 }] })
      fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 100 }] })
    })

    expect(screen.getByText(/slide 2 of 3/i)).toBeInTheDocument()
  })

  it('handles touch swipe right to go to previous slide', () => {
    render(<ImageCarousel images={mockImages} />)
    const carousel = screen.getByLabelText('Image Carousel')

    act(() => {
      fireEvent.touchStart(carousel, { touches: [{ clientX: 100 }] })
      fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 200 }] })
    })

    expect(screen.getByText(/slide 3 of 3/i)).toBeInTheDocument()
  })

  it('ignores touch swipe below threshold', () => {
    render(<ImageCarousel images={mockImages} />)
    const carousel = screen.getByLabelText('Image Carousel')

    act(() => {
      fireEvent.touchStart(carousel, { touches: [{ clientX: 100 }] })
      fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 120 }] })
    })

    expect(screen.getByText(/slide 1 of 3/i)).toBeInTheDocument()
  })
})
