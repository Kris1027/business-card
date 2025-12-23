import { Helmet } from '@dr.pogodin/react-helmet'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/constants/site-config'

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
    areaServed: [
      { '@type': 'City', name: 'Zabrze' },
      { '@type': 'City', name: 'Gliwice' },
      { '@type': 'City', name: 'Bytom' },
      { '@type': 'City', name: 'Katowice' },
      { '@type': 'AdministrativeArea', name: 'Śląsk' },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.3249',
      longitude: '18.7857',
    },
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
    name,
    description,
    jobTitle,
    url,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
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
      name: provider,
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zabrze',
        addressRegion: 'Śląskie',
        addressCountry: 'PL',
      },
    },
    serviceType,
    areaServed: [
      { '@type': 'City', name: 'Zabrze' },
      { '@type': 'City', name: 'Gliwice' },
      { '@type': 'City', name: 'Bytom' },
      { '@type': 'City', name: 'Katowice' },
      { '@type': 'AdministrativeArea', name: 'Śląsk' },
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
