import { createFileRoute } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import Seo from '@/components/seo'
import { BreadcrumbJsonLd } from '@/components/json-ld'
import { SITE_URL } from '@/constants/site-config'

const PrivacyPolicy = () => {
  const { t } = useTranslation()

  const breadcrumbItems = [
    { name: t('navigation.home'), url: SITE_URL },
    { name: t('navigation.privacyPolicy'), url: `${SITE_URL}/privacy-policy` },
  ]

  return (
    <>
      <Seo
        title={t('seo.privacyPolicy.title')}
        description={t('seo.privacyPolicy.description')}
        path="/privacy-policy"
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="py-12">
        <div className="animate-fade-in-up mx-auto max-w-3xl rounded-2xl bg-surface-card p-6 shadow-lg sm:p-10">
          <h1 className="mb-8 text-3xl font-bold text-text-primary sm:text-4xl">
            {t('navigation.privacyPolicy')}
          </h1>
          <div className="legal-content space-y-6 text-text-body">
            <Trans
              t={t}
              i18nKey="privacyPolicy.content"
              components={{
                h2: (
                  <h2 className="mt-8 mb-4 text-xl font-semibold text-text-primary sm:text-2xl" />
                ),
                p: <p className="leading-relaxed" />,
                ul: <ul className="ml-6 list-disc space-y-1" />,
                li: <li />,
                strong: <strong className="font-semibold text-text-primary" />,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
})
