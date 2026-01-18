'use client'

import Image from 'next/image'
import { Calendar, Users } from 'lucide-react'

interface CaseHeroProps {
  title: string
  subtitle?: string
  date?: string
  collaborators?: string
  media?: {
    type: 'image' | 'video' | 'gif'
    src: string
    alt?: string
  }
  background?: string
}

export function CaseHero({
  title,
  subtitle,
  date,
  collaborators,
  media,
  background = '#0a0a0a',
}: CaseHeroProps) {
  return (
    <section
      className="relative min-h-[80vh] flex flex-col items-center justify-center"
      style={{ background }}
    >
      {/* Background media layer */}
      {media && (
        <div className="absolute inset-0 overflow-hidden">
          {media.type === 'video' ? (
            <video
              src={media.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <Image
              src={media.src}
              alt={media.alt || title}
              fill
              className="object-cover opacity-60"
              priority
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-[1080px] mx-auto px-6 md:px-8 text-center pt-24 pb-16">
        {/* Title */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal italic text-white leading-tight mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>
        )}

        {/* Meta row */}
        {(date || collaborators) && (
          <div className="flex items-center justify-center gap-6 text-sm text-neutral-400">
            {date && (
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{date}</span>
              </div>
            )}
            {collaborators && (
              <div className="flex items-center gap-2">
                <Users size={14} />
                <span>{collaborators}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}











