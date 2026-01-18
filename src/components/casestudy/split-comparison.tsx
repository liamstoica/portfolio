'use client'

import { ReactNode } from 'react'

interface SplitComparisonProps {
  leftTitle: string
  rightTitle: string
  leftContent: ReactNode
  rightContent: ReactNode
  leftBackground?: string
  rightBackground?: string
}

export function SplitComparison({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
  leftBackground = '#1a0a0a',
  rightBackground = 'linear-gradient(135deg, rgba(139, 90, 90, 0.3), rgba(50, 30, 30, 0.3))',
}: SplitComparisonProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl md:rounded-3xl overflow-hidden">
      {/* Left side */}
      <div
        className="p-8 md:p-12 flex flex-col"
        style={{ background: leftBackground }}
      >
        <h3 className="font-serif text-2xl md:text-3xl italic text-white mb-8">
          {leftTitle}
        </h3>
        <div className="flex-1">
          {leftContent}
        </div>
      </div>

      {/* Right side */}
      <div
        className="p-8 md:p-12 flex flex-col"
        style={{ background: rightBackground }}
      >
        <h3 className="font-serif text-2xl md:text-3xl italic text-white mb-8">
          {rightTitle}
        </h3>
        <div className="flex-1">
          {rightContent}
        </div>
      </div>
    </div>
  )
}

interface TagListProps {
  tags: string[]
  activeTag?: string
}

export function TagList({ tags, activeTag }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`px-4 py-2 rounded-full text-sm border transition-all ${
            tag === activeTag
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-neutral-300 border-white/30 hover:border-white/50'
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}











