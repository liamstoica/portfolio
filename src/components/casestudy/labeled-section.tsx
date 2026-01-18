'use client'

import { ReactNode } from 'react'

interface LabeledSectionProps {
  label: string
  children: ReactNode
  className?: string
}

/**
 * Two-column labeled section for Problem/Strategy/Outcome/Impact blocks
 */
export function LabeledSection({ label, children, className = '' }: LabeledSectionProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-10 py-8 border-t border-white/10 ${className}`}>
      <div className="flex-shrink-0">
        <span className="font-serif text-lg italic text-neutral-500">{label}</span>
      </div>
      <div className="text-neutral-300 leading-relaxed">
        {children}
      </div>
    </div>
  )
}
