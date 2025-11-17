import { useTranslation } from 'react-i18next'
import AppLayout from '@/components/app-layout'
import { ServiceCard } from '@/components/service-card'
import { ImageCarousel } from '@/components/image-carousel'
import pcImage1 from '@/assets/pc-1.jpg'
import pcImage2 from '@/assets/pc-2.jpg'
import webImage1 from '@/assets/web-1.jpg'

const Home = () => {
  const { t } = useTranslation()

  const carouselImages = [
    {
      src: pcImage1,
      alt: t('services.equipmentAdvising.title'),
    },
    {
      src: pcImage2,
      alt: t('services.computerAssembly.title'),
    },
    {
      src: webImage1,
      alt: t('services.websiteBuilding.title'),
    },
  ]

  const services = [
    {
      imageSrc: pcImage1,
      imageAlt: t('services.equipmentAdvising.title'),
      title: t('services.equipmentAdvising.title'),
      shortDescription: t('services.equipmentAdvising.shortDescription'),
      longDescription: t('services.equipmentAdvising.longDescription'),
    },
    {
      imageSrc: pcImage2,
      imageAlt: t('services.computerAssembly.title'),
      title: t('services.computerAssembly.title'),
      shortDescription: t('services.computerAssembly.shortDescription'),
      longDescription: t('services.computerAssembly.longDescription'),
    },
    {
      imageSrc: webImage1,
      imageAlt: t('services.websiteBuilding.title'),
      title: t('services.websiteBuilding.title'),
      shortDescription: t('services.websiteBuilding.shortDescription'),
      longDescription: t('services.websiteBuilding.longDescription'),
    },
  ]

  return (
    <AppLayout>
      <div className="py-12">
        <div className="mb-12">
          <ImageCarousel images={carouselImages} />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <ServiceCard
              key={service.title}
              imageSrc={service.imageSrc}
              imageAlt={service.imageAlt}
              title={service.title}
              shortDescription={service.shortDescription}
              longDescription={service.longDescription}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default Home
