import { useState, useEffect } from 'react'

type ImageCarouselProps = {
  images: Array<{
    src: string
    alt: string
    title: string
  }>
  interval?: number
}

const ImageCarousel = ({ images, interval = 5000 }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval, resetKey])

  const resetTimer = () => {
    setResetKey(prev => prev + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    resetTimer()
  }

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length)
    resetTimer()
  }

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
    resetTimer()
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-2xl shadow-2xl"
      aria-roledescription="carousel"
      aria-label="Image Carousel"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${currentIndex + 1} of ${images.length}: ${images[currentIndex].title}`}
      </div>
      <div className="relative aspect-video w-full">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          >
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div
              className={`absolute bottom-16 left-0 right-0 text-center transition-all delay-300 duration-700 ${
                index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <h2 className="px-4 text-3xl font-extrabold tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
                {image.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentIndex
                ? 'h-3 w-10 rounded-full bg-white shadow-lg'
                : 'h-3 w-3 rounded-full bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export { ImageCarousel }
