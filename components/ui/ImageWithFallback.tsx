import Image from "next/image"
import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc = "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&q=80",
  width, 
  height, 
  fill = false, 
  className = "",
  priority = false
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        onError={handleError}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      onError={handleError}
      priority={priority}
    />
  )
}
