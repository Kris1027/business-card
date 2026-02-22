import pcImage1 from '@/assets/pc-1.jpg?w=640;960;1280;1920&format=webp;jpg&as=picture'
import pcImage2 from '@/assets/pc-2.jpg?w=640;960;1280;1920&format=webp;jpg&as=picture'
import webImage1 from '@/assets/web-1.jpg?w=640;960;1280;1920&format=webp;jpg&as=picture'
import helpImage1 from '@/assets/help-1.webp?w=640;960;1280;1920&format=webp;jpg&as=picture'
import type { ServiceId } from '@/constants/navigation-links'

export type ServiceKey =
  | 'equipmentAdvising'
  | 'computerAssembly'
  | 'websiteBuilding'
  | 'technicalSupport'

export type ServiceData = {
  translationKey: ServiceKey
  image: PictureData
}

export const servicesInfo: Record<ServiceId, ServiceData> = {
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
  'technical-support': {
    translationKey: 'technicalSupport',
    image: helpImage1,
  },
}
