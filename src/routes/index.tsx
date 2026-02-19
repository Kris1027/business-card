import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ServiceCard } from '@/components/service-card'
import { ImageCarousel } from '@/components/image-carousel'
import Seo from '@/components/seo'
import { LocalBusinessJsonLd, WebSiteJsonLd } from '@/components/json-ld'
import pcImage1 from '@/assets/pc-1.jpg'
import pcImage2 from '@/assets/pc-2.jpg'
import prebuildImage from '@/assets/prebuild-1.webp'
import webImage1 from '@/assets/web-1.jpg'

const Index = () => {
  const { t } = useTranslation()

  const carouselImages = [
    {
      src: pcImage1,
      alt: t('services.equipmentAdvising.title'),
      title: t('services.equipmentAdvising.title'),
    },
    {
      src: pcImage2,
      alt: t('services.computerAssembly.title'),
      title: t('services.computerAssembly.title'),
    },
    {
      src: webImage1,
      alt: t('services.websiteBuilding.title'),
      title: t('services.websiteBuilding.title'),
    },
  ]

  const services = [
    {
      id: 'equipment-advising',
      title: t('services.equipmentAdvising.title'),
      shortDescription: t('services.equipmentAdvising.shortDescription'),
    },
    {
      id: 'computer-assembly',
      title: t('services.computerAssembly.title'),
      shortDescription: t('services.computerAssembly.shortDescription'),
    },
    {
      id: 'website-building',
      title: t('services.websiteBuilding.title'),
      shortDescription: t('services.websiteBuilding.shortDescription'),
    },
  ]

  return (
    <>
      <Seo title={t('seo.home.title')} description={t('seo.home.description')} path="/" />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd
        name="techKris"
        description={t('seo.home.description')}
        email="kris1027.dev@gmail.com"
        telephone="+48 792 542 841"
        address={{
          locality: 'Zabrze',
          region: 'Silesian Voivodeship',
          country: 'Poland',
        }}
      />
      <div className="py-8 md:py-12">
        <div className="animate-fade-in-up mb-8 md:mb-12">
          <ImageCarousel images={carouselImages} />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <ServiceCard
                serviceId={service.id}
                title={service.title}
                shortDescription={service.shortDescription}
              />
            </div>
          ))}
        </div>
        <div className="animate-fade-in-up mt-12 md:mt-16" style={{ animationDelay: '400ms' }}>
          <ServiceCard
            title={t('home.noPrebuilt.title')}
            descriptionKey="home.noPrebuilt.description"
            image={{ src: prebuildImage, alt: t('home.noPrebuilt.title') }}
          />
        </div>
      </div>
    </>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
