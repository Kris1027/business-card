import { createFileRoute, Link } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { HiChevronLeft, HiEnvelope } from 'react-icons/hi2'
import { servicesInfo, type ServiceKey } from '@/constants/services-info'

const getServiceTranslations = (t: ReturnType<typeof useTranslation>['t'], key: ServiceKey) => {
  const translations = {
    equipmentAdvising: {
      title: t('services.equipmentAdvising.title'),
      shortDescription: t('services.equipmentAdvising.shortDescription'),
      longDescriptionKey: 'services.equipmentAdvising.longDescription' as const,
    },
    computerAssembly: {
      title: t('services.computerAssembly.title'),
      shortDescription: t('services.computerAssembly.shortDescription'),
      longDescriptionKey: 'services.computerAssembly.longDescription' as const,
    },
    websiteBuilding: {
      title: t('services.websiteBuilding.title'),
      shortDescription: t('services.websiteBuilding.shortDescription'),
      longDescriptionKey: 'services.websiteBuilding.longDescription' as const,
    },
  }
  return translations[key]
}

const ServiceDetail = () => {
  const params = Route.useParams()
  const serviceId = params['service-id']
  const { t } = useTranslation()

  const service = servicesInfo[serviceId]

  if (!service) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-text-primary">{t('services.notFound')}</h1>
        <Link to="/" className="mt-4 text-text-link transition-colors hover:text-text-link-hover">
          {t('services.backToHome')}
        </Link>
      </div>
    )
  }

  const translations = getServiceTranslations(t, service.translationKey)
  const title = translations.title
  const shortDescription = translations.shortDescription
  const longDescriptionKey = translations.longDescriptionKey

  return (
    <div className="py-8">
      <div className="overflow-hidden rounded-2xl bg-surface-card shadow-2xl">
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
          <p className="text-xl font-semibold text-text-secondary">{shortDescription}</p>
          <div className="service-description mt-6 border-t border-border-divider pt-6 text-lg leading-relaxed text-text-body">
            <Trans
              t={t}
              i18nKey={longDescriptionKey}
              components={{
                p: <p className="mb-4" />,
                strong: <strong className="font-semibold text-text-primary" />,
                ul: <ul className="mb-4 ml-6 list-disc space-y-1" />,
                li: <li />,
              }}
            />
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="focus-glow inline-flex items-center justify-center gap-2 rounded-lg bg-surface-hover px-6 py-3 font-semibold text-text-primary shadow-md transition-all hover:gap-3 hover:bg-border-default hover:shadow-lg active:scale-95"
            >
              <HiChevronLeft className="h-5 w-5" />
              {t('services.backToHome')}
            </Link>
            <Link
              to="/contact"
              className="focus-glow inline-flex items-center justify-center gap-2 rounded-lg bg-interactive-primary px-6 py-3 font-semibold text-white shadow-md transition-all hover:gap-3 hover:bg-interactive-primary-hover hover:shadow-lg active:scale-95"
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
