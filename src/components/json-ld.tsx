import { Helmet } from '@dr.pogodin/react-helmet'

const SITE_URL = 'https://techkris.eu'

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
    image: `${SITE_URL}/og-image.png`,
    priceRange: '$$',
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
    image: `${SITE_URL}/og-image.png`,
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
    },
    serviceType,
    areaServed: {
      '@type': 'Country',
      name: 'Poland',
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
