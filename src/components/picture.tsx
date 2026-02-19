type PictureData = {
  sources: Record<string, string>
  img: {
    src: string
    w: number
    h: number
  }
}

type PictureProps = {
  data: PictureData
  alt: string
  sizes?: string
  className?: string
  loading?: 'lazy' | 'eager'
}

const MIME_TYPES: Record<string, string> = {
  webp: 'image/webp',
  avif: 'image/avif',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
}

const Picture = ({ data, alt, sizes = '100vw', className, loading = 'lazy' }: PictureProps) => {
  const formatEntries = Object.entries(data.sources)

  return (
    <picture>
      {formatEntries.map(([format, srcSet]) => (
        <source
          key={format}
          srcSet={srcSet}
          sizes={sizes}
          type={MIME_TYPES[format] ?? `image/${format}`}
        />
      ))}
      <img
        src={data.img.src}
        width={data.img.w}
        height={data.img.h}
        alt={alt}
        className={className}
        loading={loading}
      />
    </picture>
  )
}

export { Picture }
export type { PictureData }
