import { writeFileSync } from 'node:fs'
import path, { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { imagetools } from 'vite-imagetools'

const sitemapRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/equipment-advising', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/computer-assembly', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/website-building', changefreq: 'monthly', priority: '0.9' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
]

const sitemapPlugin = (siteUrl: string): Plugin => {
  let outDir: string

  return {
    name: 'generate-sitemap',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const today = new Date().toISOString().split('T')[0]

      const urls = sitemapRoutes
        .map(
          (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
        )
        .join('\n')

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf-8')
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      TanStackRouterVite({
        target: 'react',
        autoCodeSplitting: true,
        routeFileIgnorePattern: '.test.',
      }),
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      tailwindcss(),
      imagetools(),
      ...(env.VITE_SITE_URL ? [sitemapPlugin(env.VITE_SITE_URL)] : []),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router-vendor': ['@tanstack/react-router'],
            'i18n-vendor': ['i18next', 'react-i18next'],
            'icons-vendor': ['react-icons'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
