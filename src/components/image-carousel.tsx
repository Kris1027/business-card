import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { Picture } from '@/components/picture'

type ImageCarouselProps = {
  images: Array<{
    data: PictureData
    alt: string
    title: string
  }>
  interval?: number
}

const SWIPE_THRESHOLD = 50

const ImageCarousel = ({ images, interval = 5000 }: ImageCarouselProps) => {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const touchStartX = useRef<number | null>(null)

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }

    touchStartX.current = null
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-2xl shadow-2xl"
      aria-roledescription="carousel"
      aria-label={t('carousel.label')}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {t('carousel.slideAnnouncement', {
          current: currentIndex + 1,
          total: images.length,
          title: images[currentIndex].title,
        })}
      </div>
      <div className="relative aspect-4/5 w-full sm:aspect-video">
        {images.map((image, index) => (
          <div
            key={image.alt}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          >
            <Picture
              data={image.data}
              alt={image.alt}
              className="h-full w-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div
              className={`absolute bottom-12 left-0 right-0 text-center transition-all delay-300 duration-700 sm:bottom-16 ${
                index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <h2 className="px-4 text-xl font-extrabold tracking-tight text-white drop-shadow-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {image.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="focus-glow-white absolute left-4 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-4 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 active:scale-95 sm:block"
        aria-label={t('carousel.previousImage')}
      >
        <HiChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="focus-glow-white absolute right-4 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-4 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 active:scale-95 sm:block"
        aria-label={t('carousel.nextImage')}
      >
        <HiChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6 sm:gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`focus-glow-white transition-all ${
              index === currentIndex
                ? 'h-2 w-8 rounded-full bg-white shadow-lg sm:h-3 sm:w-10'
                : 'h-2 w-2 rounded-full bg-white/40 hover:bg-white/60 sm:h-3 sm:w-3'
            }`}
            aria-label={t('carousel.goToSlide', { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  )
}

export { ImageCarousel }
