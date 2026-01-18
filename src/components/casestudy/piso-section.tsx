'use client'

import { ReactNode } from 'react'

interface PISOItem {
  label: string
  content: ReactNode
}

interface PISOSectionProps {
  items: PISOItem[]
}

/**
 * PISOSection - Problem / Impact / Strategy / Outcome
 * - Two-column layout: label on left, content on right
 * - Fits within the section system
 */
export function PISOSection({ items }: PISOSectionProps) {
  return (
    <section className="w-full max-w-[1080px] mx-auto px-6 md:px-8 py-12 md:py-20">
      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-10 py-8 border-t border-white/10"
        >
          <div className="flex-shrink-0">
            <span className="font-serif text-lg italic text-neutral-500">{item.label}</span>
          </div>
          <div className="text-neutral-300 leading-relaxed">
            {item.content}
          </div>
        </div>
      ))}
    </section>
  )
}










