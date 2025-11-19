import pcImage1 from '@/assets/pc-1.jpg'
import pcImage2 from '@/assets/pc-2.jpg'
import webImage1 from '@/assets/web-1.jpg'

export type ServiceKey = 'equipmentAdvising' | 'computerAssembly' | 'websiteBuilding'

export type ServiceData = {
  translationKey: ServiceKey
  image: string
}

export const servicesInfo: Record<string, ServiceData> = {
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
