import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer
      role="contentinfo"
      aria-label={t('footer.footerLabel')}
      className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {t('footer.craftedBy')}{' '}
          <a
            href="https://github.com/Kris1027"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-blue-400 dark:hover:text-blue-300 dark:focus:ring-offset-gray-900"
            aria-label={t('footer.githubLabel', { name: 'Kris1027' })}
          >
            kris1027
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
