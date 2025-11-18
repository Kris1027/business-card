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
  SiVercel,
  SiAmd,
  SiIntel,
  SiNvidia,
  SiMsi,
  SiAsus,
  SiCorsair,
  SiRazer,
  SiLogitech,
  SiLinux,
  SiDocker,
  SiGit,
  SiGithub,
  SiNpm,
  SiPnpm,
  SiFigma,
  SiTailwindcss,
  SiVite,
  SiPrisma,
} from 'react-icons/si'
import { HiCommandLine, HiWindow } from 'react-icons/hi2'
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
  {
    name: 'Vercel',
    icon: SiVercel,
    url: 'https://vercel.com/docs',
    color: 'text-gray-900 dark:text-gray-100',
  },
  {
    name: 'AMD',
    icon: SiAmd,
    url: 'https://www.amd.com/',
    color: 'text-red-600 dark:text-red-500',
  },
  {
    name: 'Intel',
    icon: SiIntel,
    url: 'https://www.intel.com/',
    color: 'text-blue-600 dark:text-blue-500',
  },
  {
    name: 'NVIDIA',
    icon: SiNvidia,
    url: 'https://www.nvidia.com/',
    color: 'text-green-600 dark:text-green-500',
  },
  {
    name: 'MSI',
    icon: SiMsi,
    url: 'https://www.msi.com/',
    color: 'text-red-600 dark:text-red-500',
  },
  {
    name: 'ASUS',
    icon: SiAsus,
    url: 'https://www.asus.com/',
    color: 'text-gray-900 dark:text-gray-100',
  },
  {
    name: 'Corsair',
    icon: SiCorsair,
    url: 'https://www.corsair.com/',
    color: 'text-yellow-500 dark:text-yellow-400',
  },
  {
    name: 'Razer',
    icon: SiRazer,
    url: 'https://www.razer.com/',
    color: 'text-green-500 dark:text-green-400',
  },
  {
    name: 'Logitech',
    icon: SiLogitech,
    url: 'https://www.logitech.com/',
    color: 'text-blue-600 dark:text-blue-500',
  },
  {
    name: 'Windows',
    icon: HiWindow,
    url: 'https://www.microsoft.com/windows',
    color: 'text-blue-500 dark:text-blue-400',
  },
  {
    name: 'Linux',
    icon: SiLinux,
    url: 'https://www.linux.org/',
    color: 'text-yellow-600 dark:text-yellow-500',
  },
  {
    name: 'Docker',
    icon: SiDocker,
    url: 'https://docs.docker.com/',
    color: 'text-blue-500 dark:text-blue-400',
  },
  {
    name: 'Git',
    icon: SiGit,
    url: 'https://git-scm.com/doc',
    color: 'text-orange-600 dark:text-orange-500',
  },
  {
    name: 'GitHub',
    icon: SiGithub,
    url: 'https://docs.github.com/',
    color: 'text-gray-900 dark:text-gray-100',
  },
  {
    name: 'npm',
    icon: SiNpm,
    url: 'https://docs.npmjs.com/',
    color: 'text-red-600 dark:text-red-500',
  },
  {
    name: 'pnpm',
    icon: SiPnpm,
    url: 'https://pnpm.io/motivation',
    color: 'text-yellow-600 dark:text-yellow-500',
  },
  {
    name: 'Figma',
    icon: SiFigma,
    url: 'https://help.figma.com/',
    color: 'text-purple-600 dark:text-purple-500',
  },
  {
    name: 'VS Code',
    icon: HiCommandLine,
    url: 'https://code.visualstudio.com/docs',
    color: 'text-blue-600 dark:text-blue-500',
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    url: 'https://tailwindcss.com/docs',
    color: 'text-cyan-500 dark:text-cyan-400',
  },
  {
    name: 'Vite',
    icon: SiVite,
    url: 'https://vite.dev/guide/',
    color: 'text-purple-600 dark:text-purple-500',
  },
  {
    name: 'Prisma',
    icon: SiPrisma,
    url: 'https://www.prisma.io/docs',
    color: 'text-gray-900 dark:text-gray-100',
  },
]
