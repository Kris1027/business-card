import { render } from '@testing-library/react'
import { HelmetProvider } from '@dr.pogodin/react-helmet'
import {
  WebSiteJsonLd,
  BreadcrumbJsonLd,
  LocalBusinessJsonLd,
  ServiceJsonLd,
} from '@/components/json-ld'

vi.mock('@/constants/site-config', () => ({
  SITE_URL: 'https://techkris.eu',
  DEFAULT_OG_IMAGE: '/og-image.png',
}))

const renderJsonLd = (ui: React.ReactElement) => {
  const context = {} as { helmet?: Record<string, unknown> }
  render(<HelmetProvider context={context}>{ui}</HelmetProvider>)
  const scripts = document.querySelectorAll('script[type="application/ld+json"]')
  const last = scripts[scripts.length - 1]
  return last ? JSON.parse(last.textContent ?? '') : null
}

describe('WebSiteJsonLd', () => {
  it('renders WebSite schema', () => {
    const schema = renderJsonLd(<WebSiteJsonLd />)
    expect(schema['@type']).toBe('WebSite')
    expect(schema.name).toBe('techKris')
    expect(schema.url).toBe('https://techkris.eu')
  })
})

describe('BreadcrumbJsonLd', () => {
  it('renders BreadcrumbList schema with items', () => {
    const items = [
      { name: 'Home', url: 'https://techkris.eu' },
      { name: 'About', url: 'https://techkris.eu/about' },
    ]
    const schema = renderJsonLd(<BreadcrumbJsonLd items={items} />)
    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement).toHaveLength(2)
    expect(schema.itemListElement[0].name).toBe('Home')
    expect(schema.itemListElement[1].position).toBe(2)
  })
})

describe('LocalBusinessJsonLd', () => {
  it('renders LocalBusiness schema with contact point', () => {
    const schema = renderJsonLd(
      <LocalBusinessJsonLd
        name="techKris"
        description="Test description"
        email="test@test.com"
        telephone="+48 123 456 789"
      />
    )
    expect(schema['@type']).toBe('LocalBusiness')
    expect(schema.name).toBe('techKris')
    expect(schema.contactPoint.email).toBe('test@test.com')
    expect(schema.contactPoint.telephone).toBe('+48 123 456 789')
  })
})

describe('ServiceJsonLd', () => {
  it('renders Service schema with provider', () => {
    const schema = renderJsonLd(
      <ServiceJsonLd
        name="PC Assembly"
        description="Build PCs"
        provider="techKris"
        serviceType="PC Assembly"
      />
    )
    expect(schema['@type']).toBe('Service')
    expect(schema.name).toBe('PC Assembly')
    expect(schema.provider.name).toBe('techKris')
    expect(schema.serviceType).toBe('PC Assembly')
  })
})
