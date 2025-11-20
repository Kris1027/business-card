import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { HiChevronRight } from 'react-icons/hi2'

type ServiceCardProps = {
  serviceId: string
  title: string
  shortDescription: string
}

const ServiceCard = ({ serviceId, title, shortDescription }: ServiceCardProps) => {
  const { t } = useTranslation()

  return (
    <article className="group overflow-hidden rounded-2xl bg-[var(--color-surface-card)] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-body)] sm:mt-4 sm:text-base">
          {shortDescription}
        </p>
        <Link
          to="/services/$service-id"
          params={{ 'service-id': serviceId }}
          className="focus-glow-pulse mt-4 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold text-[var(--color-text-link)] transition-all duration-300 hover:gap-3 focus-visible:shadow-[0_0_0_3px_var(--color-focus-glow-inner),0_0_20px_var(--color-focus-glow-outer)] focus-visible:outline-none sm:mt-6 sm:text-base"
        >
          {t('services.readMore')}
          <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Link>
      </div>
    </article>
  )
}

export { ServiceCard }
