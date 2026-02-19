import { Link } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { HiChevronRight } from 'react-icons/hi2'
import { Picture } from '@/components/picture'

type TranslationKeyWithHtml = 'home.noPrebuilt.description'

type ServiceCardBaseProps = {
  title: string
  image?: PictureData
}

type ServiceCardWithShortDescription = ServiceCardBaseProps & {
  serviceId?: string
  shortDescription: string
  descriptionKey?: never
}

type ServiceCardWithDescriptionKey = ServiceCardBaseProps & {
  serviceId?: never
  shortDescription?: never
  descriptionKey: TranslationKeyWithHtml
}

type ServiceCardProps = ServiceCardWithShortDescription | ServiceCardWithDescriptionKey

const ServiceCard = ({
  serviceId,
  title,
  shortDescription,
  image,
  descriptionKey,
}: ServiceCardProps) => {
  const { t } = useTranslation()

  return (
    <article className="group overflow-hidden rounded-2xl bg-surface-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {image && (
        <Picture
          data={image}
          alt={title}
          className="aspect-4/5 w-full object-cover sm:aspect-video"
        />
      )}
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-bold text-text-primary sm:text-2xl">{title}</h3>
        {descriptionKey ? (
          <div className="mt-3 text-sm leading-relaxed text-text-body sm:mt-4 sm:text-base">
            <Trans
              t={t}
              i18nKey={descriptionKey}
              components={{
                p: <p className="mb-3 last:mb-0" />,
                strong: <strong className="font-semibold text-text-primary" />,
                contactLink: (
                  <Link
                    to="/contact"
                    className="font-semibold text-text-link underline transition-colors hover:text-text-link-hover"
                  />
                ),
              }}
            />
          </div>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-text-body sm:mt-4 sm:text-base">
            {shortDescription}
          </p>
        )}
        {serviceId && (
          <Link
            to="/services/$service-id"
            params={{ 'service-id': serviceId }}
            className="focus-glow mt-4 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold text-text-link transition-all hover:gap-3 sm:mt-6 sm:text-base"
          >
            {t('services.readMore')}
            <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        )}
      </div>
    </article>
  )
}

export { ServiceCard }
