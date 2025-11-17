import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

type ServiceCardProps = {
  serviceId: string
  title: string
  shortDescription: string
}

const ServiceCard = ({ serviceId, title, shortDescription }: ServiceCardProps) => {
  const { t } = useTranslation()

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-lg outline outline-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900 dark:shadow-gray-800/50 dark:-outline-offset-1 dark:outline-white/10">
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">{shortDescription}</p>
        <Link
          to="/services/$service-id"
          params={{ 'service-id': serviceId }}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 hover:gap-3 dark:text-blue-400"
        >
          {t('services.readMore')}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export { ServiceCard }
