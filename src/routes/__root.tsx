import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import AppLayout from '@/components/app-layout'

const RootLayout = () => (
  <>
    <AppLayout>
      <Outlet />
    </AppLayout>
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
