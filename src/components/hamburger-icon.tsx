type HamburgerIconProps = {
  isOpen: boolean
}

const HamburgerIcon = ({ isOpen }: HamburgerIconProps) => {
  const commonClasses =
    'absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-text-primary transition-all duration-300 ease-in-out'

  return (
    <div className="relative h-5 w-5" aria-hidden="true">
      <span
        className={`${commonClasses} ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'}`}
      />
      <span
        className={`${commonClasses} top-1/2 -translate-y-1/2 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
      />
      <span
        className={`${commonClasses} ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'}`}
      />
    </div>
  )
}

export default HamburgerIcon
