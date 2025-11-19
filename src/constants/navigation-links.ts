export type ServiceId = 'equipment-advising' | 'computer-assembly' | 'website-building'

export const SERVICE_IDS = {
  EQUIPMENT_ADVISING: 'equipment-advising' as const,
  COMPUTER_ASSEMBLY: 'computer-assembly' as const,
  WEBSITE_BUILDING: 'website-building' as const,
} as const

export const SERVICE_PATHS = {
  EQUIPMENT_ADVISING: '/services/equipment-advising' as const,
  COMPUTER_ASSEMBLY: '/services/computer-assembly' as const,
  WEBSITE_BUILDING: '/services/website-building' as const,
} as const
