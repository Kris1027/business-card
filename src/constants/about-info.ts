import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAstro,
  SiReactquery,
  SiTailwindcss,
  SiShadcnui,
  SiSass,
  SiExpo,
  SiTelegram,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiReactivex,
  SiSwagger,
  SiJsonwebtokens,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiEthereum,
  SiWeb3Dotjs,
  SiJest,
  SiCypress,
  SiGit,
  SiDocker,
  SiGrafana,
  SiPrometheus,
  SiOpenai,
  SiAnthropic,
  SiGithubcopilot,
  SiWebstorm,
  SiNeovim,
} from 'react-icons/si'
import {
  HiCodeBracket,
  HiComputerDesktop,
  HiDevicePhoneMobile,
  HiServerStack,
  HiCircleStack,
  HiGlobeAlt,
  HiBeaker,
  HiWrenchScrewdriver,
  HiSparkles,
  HiCommandLine,
  HiCodeBracketSquare,
  HiCursorArrowRays,
} from 'react-icons/hi2'
import { TbBrandReactNative } from 'react-icons/tb'
import type { IconType } from 'react-icons'

export type Technology = {
  name: string
  icon: IconType
  url: string
  color: string
}

export type CategoryId =
  | 'languages'
  | 'frontend'
  | 'mobile'
  | 'backend'
  | 'databases'
  | 'web3'
  | 'testing'
  | 'devtools'
  | 'aiEditors'

export type TechnologyCategory = {
  categoryId: CategoryId
  icon: IconType
  technologies: Technology[]
}

export const aboutInfo = {
  name: 'Krzysztof Obarzanek',
}

export const categorizedTechnologies: TechnologyCategory[] = [
  {
    categoryId: 'languages',
    icon: HiCodeBracket,
    technologies: [
      {
        name: 'HTML5',
        icon: SiHtml5,
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        color: 'text-orange-600 dark:text-orange-500',
      },
      {
        name: 'CSS3',
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
    ],
  },
  {
    categoryId: 'frontend',
    icon: HiComputerDesktop,
    technologies: [
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
        name: 'Astro',
        icon: SiAstro,
        url: 'https://docs.astro.build/',
        color: 'text-purple-600 dark:text-purple-500',
      },
      {
        name: 'TanStack',
        icon: SiReactquery,
        url: 'https://tanstack.com/',
        color: 'text-red-500 dark:text-red-400',
      },
      {
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        url: 'https://tailwindcss.com/docs',
        color: 'text-cyan-500 dark:text-cyan-400',
      },
      {
        name: 'shadcn/ui',
        icon: SiShadcnui,
        url: 'https://ui.shadcn.com/',
        color: 'text-gray-900 dark:text-gray-100',
      },
      {
        name: 'SCSS',
        icon: SiSass,
        url: 'https://sass-lang.com/documentation/',
        color: 'text-pink-500 dark:text-pink-400',
      },
    ],
  },
  {
    categoryId: 'mobile',
    icon: HiDevicePhoneMobile,
    technologies: [
      {
        name: 'React Native',
        icon: TbBrandReactNative,
        url: 'https://reactnative.dev/',
        color: 'text-cyan-500 dark:text-cyan-400',
      },
      {
        name: 'Expo',
        icon: SiExpo,
        url: 'https://docs.expo.dev/',
        color: 'text-gray-900 dark:text-gray-100',
      },
      {
        name: 'Telegram Mini Apps',
        icon: SiTelegram,
        url: 'https://core.telegram.org/bots/webapps',
        color: 'text-blue-500 dark:text-blue-400',
      },
    ],
  },
  {
    categoryId: 'backend',
    icon: HiServerStack,
    technologies: [
      {
        name: 'Node.js',
        icon: SiNodedotjs,
        url: 'https://nodejs.org/docs/latest/api/',
        color: 'text-green-600 dark:text-green-500',
      },
      {
        name: 'NestJS',
        icon: SiNestjs,
        url: 'https://docs.nestjs.com/',
        color: 'text-red-600 dark:text-red-500',
      },
      {
        name: 'Express',
        icon: SiExpress,
        url: 'https://expressjs.com/',
        color: 'text-gray-700 dark:text-gray-300',
      },
      {
        name: 'RxJS',
        icon: SiReactivex,
        url: 'https://rxjs.dev/',
        color: 'text-pink-600 dark:text-pink-500',
      },
      {
        name: 'Swagger',
        icon: SiSwagger,
        url: 'https://swagger.io/docs/',
        color: 'text-green-500 dark:text-green-400',
      },
      {
        name: 'JWT',
        icon: SiJsonwebtokens,
        url: 'https://jwt.io/',
        color: 'text-gray-900 dark:text-gray-100',
      },
    ],
  },
  {
    categoryId: 'databases',
    icon: HiCircleStack,
    technologies: [
      {
        name: 'PostgreSQL',
        icon: SiPostgresql,
        url: 'https://www.postgresql.org/docs/',
        color: 'text-blue-800 dark:text-blue-700',
      },
      {
        name: 'MongoDB',
        icon: SiMongodb,
        url: 'https://www.mongodb.com/docs/',
        color: 'text-green-700 dark:text-green-600',
      },
      {
        name: 'Prisma',
        icon: SiPrisma,
        url: 'https://www.prisma.io/docs',
        color: 'text-gray-900 dark:text-gray-100',
      },
      {
        name: 'Supabase',
        icon: SiSupabase,
        url: 'https://supabase.com/docs',
        color: 'text-green-600 dark:text-green-500',
      },
      {
        name: 'Firebase',
        icon: SiFirebase,
        url: 'https://firebase.google.com/docs',
        color: 'text-yellow-500 dark:text-yellow-400',
      },
    ],
  },
  {
    categoryId: 'web3',
    icon: HiGlobeAlt,
    technologies: [
      {
        name: 'Ethers.js',
        icon: SiEthereum,
        url: 'https://docs.ethers.org/',
        color: 'text-blue-600 dark:text-blue-500',
      },
      {
        name: 'Web3',
        icon: SiWeb3Dotjs,
        url: 'https://web3js.readthedocs.io/',
        color: 'text-orange-500 dark:text-orange-400',
      },
    ],
  },
  {
    categoryId: 'testing',
    icon: HiBeaker,
    technologies: [
      {
        name: 'Jest',
        icon: SiJest,
        url: 'https://jestjs.io/docs/getting-started',
        color: 'text-red-600 dark:text-red-500',
      },
      {
        name: 'Cypress',
        icon: SiCypress,
        url: 'https://docs.cypress.io/',
        color: 'text-green-500 dark:text-green-400',
      },
      {
        name: 'Supertest',
        icon: HiCommandLine,
        url: 'https://github.com/ladjs/supertest',
        color: 'text-gray-700 dark:text-gray-300',
      },
    ],
  },
  {
    categoryId: 'devtools',
    icon: HiWrenchScrewdriver,
    technologies: [
      {
        name: 'Git',
        icon: SiGit,
        url: 'https://git-scm.com/doc',
        color: 'text-orange-600 dark:text-orange-500',
      },
      {
        name: 'Docker',
        icon: SiDocker,
        url: 'https://docs.docker.com/',
        color: 'text-blue-500 dark:text-blue-400',
      },
      {
        name: 'Grafana',
        icon: SiGrafana,
        url: 'https://grafana.com/docs/',
        color: 'text-orange-500 dark:text-orange-400',
      },
      {
        name: 'Prometheus',
        icon: SiPrometheus,
        url: 'https://prometheus.io/docs/',
        color: 'text-orange-600 dark:text-orange-500',
      },
    ],
  },
  {
    categoryId: 'aiEditors',
    icon: HiSparkles,
    technologies: [
      {
        name: 'ChatGPT',
        icon: SiOpenai,
        url: 'https://openai.com/chatgpt',
        color: 'text-gray-900 dark:text-gray-100',
      },
      {
        name: 'Claude Code',
        icon: SiAnthropic,
        url: 'https://docs.anthropic.com/en/docs/claude-code',
        color: 'text-orange-600 dark:text-orange-500',
      },
      {
        name: 'Cursor',
        icon: HiCursorArrowRays,
        url: 'https://cursor.com/',
        color: 'text-gray-900 dark:text-gray-100',
      },
      {
        name: 'GitHub Copilot',
        icon: SiGithubcopilot,
        url: 'https://github.com/features/copilot',
        color: 'text-gray-900 dark:text-gray-100',
      },
      {
        name: 'VS Code',
        icon: HiCodeBracketSquare,
        url: 'https://code.visualstudio.com/docs',
        color: 'text-blue-600 dark:text-blue-500',
      },
      {
        name: 'WebStorm',
        icon: SiWebstorm,
        url: 'https://www.jetbrains.com/webstorm/',
        color: 'text-cyan-600 dark:text-cyan-500',
      },
      {
        name: 'Neovim',
        icon: SiNeovim,
        url: 'https://neovim.io/',
        color: 'text-green-600 dark:text-green-500',
      },
    ],
  },
]
