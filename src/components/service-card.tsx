type ServiceCardProps = {
  imageSrc: string
  imageAlt: string
  title: string
  shortDescription: string
  longDescription: string
}

const ServiceCard = ({
  imageSrc,
  imageAlt,
  title,
  shortDescription,
  longDescription,
}: ServiceCardProps) => {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-lg outline outline-black/5 dark:bg-gray-900 dark:shadow-gray-800/50 dark:-outline-offset-1 dark:outline-white/10">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mt-2 font-medium text-gray-600 dark:text-gray-400">{shortDescription}</p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{longDescription}</p>
      </div>
    </article>
  )
}

export { ServiceCard }
