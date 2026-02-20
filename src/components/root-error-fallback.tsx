import type { FallbackProps } from 'react-error-boundary'

const getLanguage = (): string => {
  try {
    const stored = localStorage.getItem('language')
    if (stored) return stored
  } catch {
    /* empty */
  }
  try {
    const browserLang = navigator.language.split('-')[0]
    if (browserLang) return browserLang
  } catch {
    /* empty */
  }
  return 'pl'
}

const RootErrorFallback = (_props: FallbackProps) => {
  const isEnglish = getLanguage().startsWith('en')

  const title = isEnglish ? 'Something went wrong' : 'Coś poszło nie tak'
  const description = isEnglish
    ? 'An unexpected error occurred. Please try refreshing the page.'
    : 'Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.'
  const buttonLabel = isEnglish ? 'Refresh page' : 'Odśwież stronę'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h1>
      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>{description}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        style={{
          padding: '0.5rem 1.5rem',
          borderRadius: '0.375rem',
          border: '1px solid #d1d5db',
          background: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default RootErrorFallback
