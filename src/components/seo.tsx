import { Helmet } from '@dr.pogodin/react-helmet'
import { useTranslation } from 'react-i18next'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/constants/site-config'

type SeoProps = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
  keywords?: string
}

const DEFAULT_KEYWORDS =
  'składanie komputerów, doradztwo sprzętowe, tworzenie stron internetowych, składanie PC, komputery na zamówienie, komputer do gier, komputer gamingowy, PC do gier, zestaw komputerowy, montaż komputera, modernizacja komputera, upgrade PC, projektowanie stron, responsywne strony www'

const Seo = ({
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  keywords = DEFAULT_KEYWORDS,
}: SeoProps) => {
  const { i18n } = useTranslation()
  const canonicalUrl = `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const currentLocale = i18n.language === 'en' ? 'en_US' : 'pl_PL'

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="techKris" />
      <meta property="og:locale" content={currentLocale} />
      <meta
        property="og:locale:alternate"
        content={currentLocale === 'pl_PL' ? 'en_US' : 'pl_PL'}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}

export default Seo
