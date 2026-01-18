'use client'

import { Calendar, Users, Briefcase } from 'lucide-react'

interface HeaderContentProps {
  title: string
  subtitle?: string
  date?: string
  collaborators?: string
  role?: string
  align?: 'left' | 'center'
}

/**
 * HeaderContentSection
 * - Sits directly below the hero media
 * - Title, subtitle, metadata row (date, collaborators, role with icons)
 * - Left aligned by default, supports center
 */
export function HeaderContent({
  title,
  subtitle,
  date,
  collaborators,
  role,
  align = 'left',
}: HeaderContentProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'items-start'
  const metaJustify = align === 'center' ? 'justify-center' : 'justify-start'

  return (
    <section className={`w-full max-w-[1480px] mx-auto px-6 md:px-8 py-12 md:py-16 flex flex-col ${alignClass}`}>
      {/* Title */}
      <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal italic text-white leading-tight mb-4">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-base md:text-lg text-neutral-400 leading-relaxed mb-6 ${align === 'center' ? 'max-w-2xl' : 'max-w-3xl'}`}>
          {subtitle}
        </p>
      )}

      {/* Meta row */}
      {(date || collaborators || role) && (
        <div className={`flex flex-wrap gap-4 md:gap-6 text-sm text-neutral-500 ${metaJustify}`}>
          {date && (
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-neutral-600" />
              <span>{date}</span>
            </div>
          )}
          {collaborators && (
            <div className="flex items-center gap-2">
              <Users size={14} className="text-neutral-600" />
              <span>{collaborators}</span>
            </div>
          )}
          {role && (
            <div className="flex items-center gap-2">
              <Briefcase size={14} className="text-neutral-600" />
              <span>{role}</span>
            </div>
          )}
        </div>
      )}
    </section>
  )
}










