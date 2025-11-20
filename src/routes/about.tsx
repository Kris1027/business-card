import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { aboutInfo, technologies } from '@/constants/about-info'
import profileImage from '@/assets/profil-1.jpg'

const INITIAL_DISPLAY_COUNT = 12

const About = () => {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)

  const displayedTechnologies = showAll
    ? technologies
    : technologies.slice(0, INITIAL_DISPLAY_COUNT)

  const toggleShowAll = () => {
    setShowAll(prev => !prev)
  }

  return (
    <div className="py-12">
      {/* Profile Section */}
      <section className="mb-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
          {/* Profile Image */}
          <div className="shrink-0">
            <img
              src={profileImage}
              alt={aboutInfo.name}
              className="h-48 w-48 rounded-full border-4 border-[var(--color-border-default)] object-cover shadow-lg md:h-64 md:w-64"
            />
          </div>

          {/* Profile Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-4 text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              {aboutInfo.name}
            </h1>
            <h2 className="mb-6 text-2xl font-semibold text-[var(--color-text-secondary)]">
              {t('about.title')}
            </h2>
            <p className="text-lg leading-relaxed text-[var(--color-text-body)]">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[var(--color-text-primary)]">
            {t('about.technologies')}
          </h2>
          <p className="text-lg text-[var(--color-text-body)]">
            {t('about.technologiesDescription')}
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {displayedTechnologies.map(tech => {
            const Icon = tech.icon

            return (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('about.visitDocs', { name: tech.name })}
                className="focus-glow group flex flex-col items-center gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-card)] p-6 shadow-md transition-all hover:scale-105 hover:shadow-xl"
              >
                <Icon
                  className={`text-5xl ${tech.color} transition-transform duration-300 group-hover:scale-110`}
                  aria-hidden="true"
                />
                <span className="text-center text-sm font-medium text-[var(--color-text-secondary)]">
                  {tech.name}
                </span>
              </a>
            )
          })}
        </div>

        {/* More Technologies Text */}
        {!showAll && technologies.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-12 text-center">
            <p className="text-xl font-semibold text-[var(--color-text-secondary)]">
              {t('about.andMore')}
            </p>
            <p className="mt-2 text-lg text-[var(--color-text-body)]">{t('about.askAbout')}</p>
            <button
              onClick={toggleShowAll}
              className="focus-glow mt-6 inline-flex items-center gap-2 rounded-md px-2 py-1 text-lg font-semibold text-[var(--color-text-link)] transition-colors hover:text-[var(--color-text-link-hover)]"
              aria-expanded={showAll}
            >
              {t('about.viewAll')} ({technologies.length})
              <HiChevronDown className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && technologies.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={toggleShowAll}
              className="focus-glow inline-flex items-center gap-2 rounded-lg bg-[var(--color-interactive-primary)] px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-[var(--color-interactive-primary-hover)] hover:shadow-lg active:scale-95"
              aria-expanded={showAll}
            >
              {t('about.showLess')}
              <HiChevronUp className="h-5 w-5" />
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})
