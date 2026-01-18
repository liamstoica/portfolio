'use client'

import { ReactNode } from 'react'

type Alignment = 'left' | 'center'

interface RichTextProps {
  children: ReactNode
  align?: Alignment
  className?: string
}

export function RichText({ children, align = 'left', className = '' }: RichTextProps) {
  return (
    <div
      className={`max-w-none ${
        align === 'center' ? 'text-center' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* Sub-components for structured content */

interface HeadlineProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  italic?: boolean
  className?: string
}

export function Headline({ children, as: Tag = 'h2', italic = true, className = '' }: HeadlineProps) {
  return (
    <Tag
      className={`font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight ${
        italic ? 'italic' : ''
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

interface BodyProps {
  children: ReactNode
  className?: string
}

export function Body({ children, className = '' }: BodyProps) {
  return (
    <p className={`text-base md:text-lg text-neutral-300 leading-relaxed ${className}`}>
      {children}
    </p>
  )
}

interface LabelProps {
  children: ReactNode
  className?: string
}

export function Label({ children, className = '' }: LabelProps) {
  return (
    <span className={`font-serif text-xl md:text-2xl italic text-neutral-400 ${className}`}>
      {children}
    </span>
  )
}

interface BulletListProps {
  items: string[]
  className?: string
}

export function BulletList({ items, className = '' }: BulletListProps) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-neutral-300">
          <span className="text-[#8B1538] mt-2">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

