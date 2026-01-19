'use client'

import { Calendar, Users } from 'lucide-react'

interface HeroTextProps {
  title: string
  subtitle?: string
  date?: string
  collaborators?: string
}

export function HeroText({ title, subtitle, date, collaborators }: HeroTextProps) {
  return (
    <section className="w-full max-w-[1080px] mx-auto px-6 md:px-8 py-16 md:py-24 text-center">
      {/* Title */}
      <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal italic text-white leading-tight mb-6">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-8">
          {subtitle}
        </p>
      )}

      {/* Meta row */}
      {(date || collaborators) && (
        <div className="flex items-center justify-center gap-6 text-sm text-neutral-500">
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
    </section>
  )
}












