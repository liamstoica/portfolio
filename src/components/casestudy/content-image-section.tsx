'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

interface ContentImageSectionProps {
  title: string
  children: ReactNode
  imageSrc?: string
  imageAlt?: string
}

/**
 * ContentImageSection
 * - Centered title
 * - Centered subcopy
 * - Optional 16:9 image underneath (wider layout)
 */
export function ContentImageSection({
  title,
  children,
  imageSrc,
  imageAlt = '',
}: ContentImageSectionProps) {
  const isVideo = imageSrc?.endsWith('.mp4') || imageSrc?.endsWith('.webm')

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-16 md:py-24">
      {/* Title - centered */}
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-white text-center mb-6">
        {title}
      </h2>

      {/* Body content - centered with constrained width */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="text-neutral-400 leading-relaxed">
          {children}
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

/**
 * Bullet list helper for ContentImageSection
 */
interface BulletListProps {
  items: string[]
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-3 text-left max-w-xl mx-auto">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-amber-500 mt-1.5 text-sm">•</span>
          <span className="text-neutral-300">{item}</span>
        </li>
      ))}
    </ul>
  )
}
