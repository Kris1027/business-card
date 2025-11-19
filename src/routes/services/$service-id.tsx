import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { HiChevronLeft, HiEnvelope } from 'react-icons/hi2'
import pcImage1 from '@/assets/pc-1.jpg'
import pcImage2 from '@/assets/pc-2.jpg'
import webImage1 from '@/assets/web-1.jpg'

type ServiceKey = 'equipmentAdvising' | 'computerAssembly' | 'websiteBuilding'

const serviceData: Record<
  string,
  {
    translationKey: ServiceKey
    image: string
  }
> = {
  'equipment-advising': {
    translationKey: 'equipmentAdvising',
    image: pcImage1,
  },
  'computer-assembly': {
    translationKey: 'computerAssembly',
    image: pcImage2,
  },
  'website-building': {
    translationKey: 'websiteBuilding',
    image: webImage1,
  },
}

const getServiceTranslations = (t: ReturnType<typeof useTranslation>['t'], key: ServiceKey) => {
  const translations = {
    equipmentAdvising: {
      title: t('services.equipmentAdvising.title'),
      shortDescription: t('services.equipmentAdvising.shortDescription'),
      longDescription: t('services.equipmentAdvising.longDescription'),
    },
    computerAssembly: {
      title: t('services.computerAssembly.title'),
      shortDescription: t('services.computerAssembly.shortDescription'),
      longDescription: t('services.computerAssembly.longDescription'),
    },
    websiteBuilding: {
      title: t('services.websiteBuilding.title'),
      shortDescription: t('services.websiteBuilding.shortDescription'),
      longDescription: t('services.websiteBuilding.longDescription'),
    },
  }
  return translations[key]
}

const ServiceDetail = () => {
  const params = Route.useParams()
  const serviceId = params['service-id']
  const { t } = useTranslation()

  const service = serviceData[serviceId]

  if (!service) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t('services.notFound')}
        </h1>
        <Link
          to="/"
          className="mt-4 text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t('services.backToHome')}
        </Link>
      </div>
    )
  }

  const translations = getServiceTranslations(t, service.translationKey)
  const title = translations.title
  const shortDescription = translations.shortDescription
  const longDescription = translations.longDescription

  return (
    <div className="py-8">
      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        <div className="relative aspect-video w-full overflow-hidden">
          <img src={service.image} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            {shortDescription}
          </p>
          <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {longDescription}
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-900 shadow-md transition-all duration-300 hover:gap-3 hover:bg-gray-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
            >
              <HiChevronLeft className="h-5 w-5" />
              {t('services.backToHome')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:gap-3 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900"
            >
              <HiEnvelope className="h-5 w-5" />
              {t('navigation.contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/services/$service-id')({
  component: ServiceDetail,
})
