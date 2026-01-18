'use client'

import Image from 'next/image'

interface ImageSectionProps {
  src: string
  alt: string
  caption?: string
}

/**
 * ImageBlockSection
 * - Always 16:9 (1920x1080) ratio
 * - Wider layout with minimal side padding on desktop
 * - Rounded corners preserved
 */
export function ImageSection({ src, alt, caption }: ImageSectionProps) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm')

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 md:px-4 lg:px-6 py-8 md:py-12">
      <figure>
        <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900">
          {isVideo ? (
            <video
              src={src}
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
              className="object-cover"
              sizes="(max-width: 1600px) 100vw, 1600px"
            />
          )}
        </div>
        {caption && (
          <figcaption className="mt-4 text-sm text-neutral-500 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  )
}
