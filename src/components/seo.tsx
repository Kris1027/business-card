import { Helmet } from '@dr.pogodin/react-helmet'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/constants/site-config'

type SeoProps = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
}

const Seo = ({
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
}: SeoProps) => {
  const canonicalUrl = `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={canonicalUrl} />

      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="techKris" />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:locale:alternate" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}

export default Seo
