import { Helmet } from '@dr.pogodin/react-helmet'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/constants/site-config'

export const WebSiteJsonLd = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'techKris',
    description:
      'Składanie komputerów Zabrze - doradztwo sprzętowe i tworzenie stron internetowych na Śląsku',
    inLanguage: ['pl-PL', 'en-US'],
    publisher: {
      '@id': `${SITE_URL}/#localbusiness`,
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

type BreadcrumbItem = {
  name: string
  url: string
}

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[]
}

export const BreadcrumbJsonLd = ({ items }: BreadcrumbJsonLdProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

type LocalBusinessJsonLdProps = {
  name: string
  description: string
  email: string
  telephone: string
  address: {
    locality: string
    region: string
    country: string
  }
}

export const LocalBusinessJsonLd = ({
  name,
  description,
  email,
  telephone,
  address,
}: LocalBusinessJsonLdProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name,
    description,
    url: SITE_URL,
    email,
    telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    priceRange: '$$',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone,
      email,
      contactType: 'customer service',
      availableLanguage: ['Polish', 'English'],
    },
    founder: {
      '@id': `${SITE_URL}/#person`,
    },
    areaServed: [
      { '@type': 'City', name: 'Zabrze' },
      { '@type': 'City', name: 'Gliwice' },
      { '@type': 'City', name: 'Bytom' },
      { '@type': 'City', name: 'Katowice' },
      { '@type': 'City', name: 'Chorzów' },
      { '@type': 'City', name: 'Ruda Śląska' },
      { '@type': 'City', name: 'Sosnowiec' },
      { '@type': 'AdministrativeArea', name: 'Śląsk' },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.3249',
      longitude: '18.7857',
    },
    sameAs: [
      'https://github.com/Kris1027',
      'https://www.linkedin.com/in/krzysztof-obarzanek-6b8803254/',
    ],
    knowsAbout: [
      'Składanie komputerów',
      'Doradztwo sprzętowe',
      'Tworzenie stron internetowych',
      'Dobór komponentów PC',
      'Komputery na zamówienie',
      'Komputer do gier',
      'Komputer gamingowy',
      'Montaż komputera',
      'Modernizacja komputera',
      'Upgrade PC',
      'Konfiguracja PC',
      'Zestaw komputerowy',
      'Projektowanie stron www',
      'Responsywne strony internetowe',
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

type PersonJsonLdProps = {
  name: string
  description: string
  jobTitle: string
  url: string
}

export const PersonJsonLd = ({ name, description, jobTitle, url }: PersonJsonLdProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name,
    description,
    jobTitle,
    url,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    worksFor: {
      '@id': `${SITE_URL}/#localbusiness`,
    },
    sameAs: [
      'https://github.com/Kris1027',
      'https://www.linkedin.com/in/krzysztof-obarzanek-6b8803254/',
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

type ServiceJsonLdProps = {
  name: string
  description: string
  provider: string
  serviceType: string
}

export const ServiceJsonLd = ({ name, description, provider, serviceType }: ServiceJsonLdProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: provider,
      url: SITE_URL,
    },
    serviceType,
    areaServed: [
      { '@type': 'City', name: 'Zabrze' },
      { '@type': 'City', name: 'Gliwice' },
      { '@type': 'City', name: 'Bytom' },
      { '@type': 'City', name: 'Katowice' },
      { '@type': 'City', name: 'Chorzów' },
      { '@type': 'City', name: 'Ruda Śląska' },
      { '@type': 'City', name: 'Sosnowiec' },
      { '@type': 'AdministrativeArea', name: 'Śląsk' },
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
