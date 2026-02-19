import { render, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import {
  createRootRoute,
  createRoute,
  createRouter,
  createMemoryHistory,
  RouterProvider,
} from '@tanstack/react-router'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'

type RenderWithRouterOptions = Omit<RenderOptions, 'wrapper'> & {
  initialPath?: string
}

const renderWithRouter = (ui: ReactElement, options: RenderWithRouterOptions = {}) => {
  const { initialPath = '/', ...renderOptions } = options

  const rootRoute = createRootRoute({
    component: () => ui,
  })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
  })

  const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
  })

  const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contact',
  })

  const serviceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/services/$serviceId',
  })

  const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, contactRoute, serviceRoute])

  const memoryHistory = createMemoryHistory({ initialEntries: [initialPath] })

  const router = createRouter({ routeTree, history: memoryHistory })

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )

  const result = render(
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>,
    renderOptions
  )

  return { ...result, router }
}

export { renderWithRouter, userEvent }
export { screen, within, waitFor, act } from '@testing-library/react'
