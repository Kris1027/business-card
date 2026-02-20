const RootErrorFallback = () => (
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
    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Coś poszło nie tak</h1>
    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
      Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
    </p>
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
      Odśwież stronę
    </button>
  </div>
)

export default RootErrorFallback
