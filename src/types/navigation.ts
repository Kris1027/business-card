export type NavLink = {
  name: string
  to: '/' | '/about' | '/contact'
}

export type ServiceLink = {
  name: string
  to: '/services/$serviceId'
  params: { serviceId: string }
}
