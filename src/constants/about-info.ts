import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiAstro,
  SiMongodb,
  SiPostgresql,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

export type Technology = {
  name: string
  icon: IconType
  url: string
  color: string
}

export const aboutInfo = {
  name: 'Krzysztof Obarzanek',
  image: '/src/assets/profil-1.jpg',
}

export const technologies: Technology[] = [
  {
    name: 'HTML',
    icon: SiHtml5,
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    color: 'text-orange-600 dark:text-orange-500',
  },
  {
    name: 'CSS',
    icon: SiCss3,
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    color: 'text-blue-600 dark:text-blue-500',
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    color: 'text-yellow-500 dark:text-yellow-400',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    url: 'https://www.typescriptlang.org/docs/',
    color: 'text-blue-700 dark:text-blue-600',
  },
  {
    name: 'React',
    icon: SiReact,
    url: 'https://react.dev/',
    color: 'text-cyan-500 dark:text-cyan-400',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    url: 'https://nextjs.org/docs',
    color: 'text-gray-900 dark:text-gray-100',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    url: 'https://nodejs.org/docs/latest/api/',
    color: 'text-green-600 dark:text-green-500',
  },
  {
    name: 'Express',
    icon: SiExpress,
    url: 'https://expressjs.com/',
    color: 'text-gray-700 dark:text-gray-300',
  },
  {
    name: 'Astro',
    icon: SiAstro,
    url: 'https://docs.astro.build/',
    color: 'text-purple-600 dark:text-purple-500',
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    url: 'https://www.mongodb.com/docs/',
    color: 'text-green-700 dark:text-green-600',
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    url: 'https://www.postgresql.org/docs/',
    color: 'text-blue-800 dark:text-blue-700',
  },
]
