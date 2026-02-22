import { render, screen } from '@testing-library/react'
import RootErrorFallback from '@/components/root-error-fallback'

const mockProps = {
  error: new Error('Test error'),
  resetErrorBoundary: vi.fn(),
}

describe('RootErrorFallback', () => {
  const originalLanguage = navigator.language

  afterEach(() => {
    localStorage.clear()
    Object.defineProperty(navigator, 'language', {
      value: originalLanguage,
      writable: true,
      configurable: true,
    })
  })

  it('renders Polish content when language is Polish', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'pl-PL',
      writable: true,
      configurable: true,
    })
    render(<RootErrorFallback {...mockProps} />)

    expect(screen.getByText('Coś poszło nie tak')).toBeInTheDocument()
    expect(
      screen.getByText('Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Odśwież stronę' })).toBeInTheDocument()
  })

  it('renders English content when language is set to English', () => {
    localStorage.setItem('language', 'en')
    render(<RootErrorFallback {...mockProps} />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByText('An unexpected error occurred. Please try refreshing the page.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Refresh page' })).toBeInTheDocument()
  })

  it('uses localStorage language over browser language', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true,
      configurable: true,
    })
    localStorage.setItem('language', 'pl')
    render(<RootErrorFallback {...mockProps} />)

    expect(screen.getByText('Coś poszło nie tak')).toBeInTheDocument()
  })

  it('renders a refresh button with correct type', () => {
    render(<RootErrorFallback {...mockProps} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })
})
