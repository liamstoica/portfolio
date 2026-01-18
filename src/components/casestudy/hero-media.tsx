'use client'

import Image from 'next/image'

interface HeroMediaProps {
  src: string
  alt?: string
  type?: 'image' | 'video'
  poster?: string
}

/**
 * HeroMediaSection
 * - Rectangular media only (image or video)
 * - Rounded corners, near full-bleed with small padding
 * - Taller height: min 80vh, max 92vh (closer to viewport height)
 * - Object-fit cover for visual impact
 * - NO gradient overlay, NO extra background effects
 */
export function HeroMedia({ src, alt = '', type = 'image', poster }: HeroMediaProps) {
  const isVideo = type === 'video' || src.endsWith('.mp4') || src.endsWith('.webm')

  return (
    <section className="w-full px-3 md:px-4 pt-16 md:pt-20">
      <div 
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 h-[45vh] max-h-[400px] md:h-[clamp(75vh,85vh,92vh)] md:max-h-[1000px]"
      >
        {isVideo ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>
    </section>
  )
}
