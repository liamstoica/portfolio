'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import { ImageLightbox } from './image-lightbox'

interface ExpandableImageProps {
  src: string
  alt: string
  fill?: boolean
  sizes?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  style?: React.CSSProperties
}

export function ExpandableImage({
  src,
  alt,
  fill = false,
  sizes,
  width,
  height,
  priority = false,
  className = '',
  style = {},
}: ExpandableImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={`expandable-image-container ${className}`}>
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            style={{ objectFit: 'cover', ...style }}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            style={{ ...style }}
            priority={priority}
          />
        )}
        <button
          className="expand-icon-button"
          onClick={() => setIsOpen(true)}
          aria-label="Expand image"
        >
          <Expand size={16} />
        </button>
      </div>
      <ImageLightbox
        src={src}
        alt={alt}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}


