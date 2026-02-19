import { render, screen, act } from '@/test/test-utils'
import { fireEvent } from '@testing-library/react'
import { ImageCarousel } from '@/components/image-carousel'

const mockPictureData = {
  sources: { webp: [{ src: '/img.webp', w: 640 }] },
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

  it('auto-advances after interval', () => {
    render(<ImageCarousel images={mockImages} interval={3000} />)

    expect(screen.getByText(/slide 1 of 3/i)).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByText(/slide 2 of 3/i)).toBeInTheDocument()
  })
})
