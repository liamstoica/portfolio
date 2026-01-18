'use client'

import Image from 'next/image'

interface BulletContentSectionProps {
  title: string
  bullets: string[]
  imageSrc?: string
  imageAlt?: string
}

/**
 * BulletContentSection
 * - Now renders as a regular content section style (no bullet styling)
 * - Centered title
 * - Items rendered as flowing text/paragraphs
 * - Optional 16:9 image underneath (wider layout)
 */
export function BulletContentSection({
  title,
  bullets,
  imageSrc,
  imageAlt = '',
}: BulletContentSectionProps) {
  const isVideo = imageSrc?.endsWith('.mp4') || imageSrc?.endsWith('.webm')

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-16 md:py-24">
      {/* Title - centered */}
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-white text-center mb-8">
        {title}
      </h2>

      {/* Content - rendered as regular paragraphs, not bullets */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <div className="space-y-4">
          {bullets.map((item, i) => (
            <p key={i} className="text-neutral-400 leading-relaxed">
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Optional 16:9 image - wider */}
      {imageSrc && (
        <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900">
          {isVideo ? (
            <video
              src={imageSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
          )}
        </div>
      )}
    </section>
  )
}
