import { renderWithRouter, screen, waitFor } from '@/test/router-utils'
import { ServiceCard } from '@/components/service-card'

const mockPictureData = {
  sources: { webp: '/test.webp 640w' },
  img: { src: '/test.jpg', w: 640, h: 480 },
}

describe('ServiceCard', () => {
  it('renders title and short description', async () => {
    renderWithRouter(<ServiceCard title="Test Service" shortDescription="A test description" />)

    await waitFor(() => {
      expect(screen.getByText('Test Service')).toBeInTheDocument()
      expect(screen.getByText('A test description')).toBeInTheDocument()
    })
  })

  it('renders read more link when serviceId is provided', async () => {
    renderWithRouter(
      <ServiceCard
        title="Test Service"
        shortDescription="A test description"
        serviceId="equipment-advising"
      />
    )

    await waitFor(() => {
      expect(screen.getByRole('link')).toBeInTheDocument()
    })
  })

  it('does not render read more link without serviceId', async () => {
    renderWithRouter(<ServiceCard title="Test Service" shortDescription="A test description" />)

    await waitFor(() => {
      expect(screen.getByText('Test Service')).toBeInTheDocument()
    })
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders image when provided', async () => {
    renderWithRouter(
      <ServiceCard title="Test Service" shortDescription="Description" image={mockPictureData} />
    )

    await waitFor(() => {
      expect(screen.getByAltText('Test Service')).toBeInTheDocument()
    })
  })

  it('renders with descriptionKey variant', async () => {
    renderWithRouter(
      <ServiceCard title="No Prebuilt" descriptionKey="home.noPrebuilt.description" />
    )

    await waitFor(() => {
      expect(screen.getByText('No Prebuilt')).toBeInTheDocument()
    })
  })
})
