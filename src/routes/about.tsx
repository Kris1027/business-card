import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { aboutInfo, categorizedTechnologies } from '@/constants/about-info'
import { SITE_URL } from '@/constants/site-config'
import Seo from '@/components/seo'
import { BreadcrumbJsonLd, PersonJsonLd } from '@/components/json-ld'
import { Picture } from '@/components/picture'
import profileImage from '@/assets/profil-1.jpg?w=512&format=webp;jpg&as=picture'

const About = () => {
  const { t } = useTranslation()

  const breadcrumbItems = [
    { name: t('navigation.home'), url: SITE_URL },
    { name: t('navigation.about'), url: `${SITE_URL}/about` },
  ]

  return (
    <>
      <Seo
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        path="/about"
        type="profile"
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <PersonJsonLd
        name={aboutInfo.name}
        description={t('seo.about.description')}
        jobTitle="Technology Consultant & Web Developer"
        url="https://techkris.eu/about"
      />
      <div className="py-12">
        {/* Profile Section */}
        <section className="animate-fade-in-up mb-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
            {/* Profile Image */}
            <div className="shrink-0">
              <Picture
                data={profileImage}
                alt={aboutInfo.name}
                sizes="(min-width: 768px) 256px, 192px"
                className="h-48 w-48 rounded-full border-4 border-border-default object-cover shadow-lg md:h-64 md:w-64"
                loading="eager"
              />
            </div>

            {/* Profile Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">
                {aboutInfo.name}
              </h1>
              <h2 className="mb-6 text-2xl font-semibold text-text-secondary">
                {t('about.title')}
              </h2>
              <p className="text-lg leading-relaxed text-text-body">{t('about.description')}</p>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section>
          <div className="animate-fade-in-up mb-8 text-center" style={{ animationDelay: '100ms' }}>
            <h2 className="mb-3 text-3xl font-bold text-text-primary">{t('about.technologies')}</h2>
            <p className="text-lg text-text-body">{t('about.technologiesDescription')}</p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {categorizedTechnologies.map((category, categoryIndex) => {
              const CategoryIcon = category.icon

              return (
                <div
                  key={category.categoryId}
                  className="animate-fade-in-up rounded-xl border border-border-default bg-surface-card p-6 shadow-lg"
                  style={{ animationDelay: `${categoryIndex * 100}ms` }}
                >
                  {/* Category Header */}
                  <div className="mb-4 flex items-center gap-2">
                    <CategoryIcon className="text-xl text-text-link" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-text-primary">
                      {t(`about.categories.${category.categoryId}`)}
                    </h3>
                  </div>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech, techIndex) => {
                      const TechIcon = tech.icon

                      return (
                        <a
                          key={tech.name}
                          href={tech.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('about.visitDocs', { name: tech.name })}
                          className="animate-fade-in focus-glow group inline-flex items-center gap-1.5 rounded-full border border-border-default bg-surface-page px-3 py-1.5 text-sm font-medium text-text-secondary transition-all hover:border-interactive-primary hover:shadow-md"
                          style={{
                            animationDelay: `${categoryIndex * 100 + techIndex * 50}ms`,
                          }}
                        >
                          <TechIcon
                            className={`text-base ${tech.color} transition-transform duration-200 group-hover:scale-110`}
                            aria-hidden="true"
                          />
                          {tech.name}
                        </a>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})
