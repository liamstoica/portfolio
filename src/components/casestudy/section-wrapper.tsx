'use client'

import { ReactNode } from 'react'

type PaddingPreset = 'none' | 'tight' | 'normal' | 'wide'
type Alignment = 'left' | 'center'

interface SectionWrapperProps {
  children: ReactNode
  fullBleedBg?: string // Background color that extends full width
  maxWidth?: 'content' | 'wide' | 'full' // content=1080px, wide=1480px, full=100%
  padding?: PaddingPreset
  align?: Alignment
  className?: string
  id?: string
}

const paddingMap: Record<PaddingPreset, string> = {
  none: '',
  tight: 'py-8 md:py-12',
  normal: 'py-12 md:py-20',
  wide: 'py-20 md:py-32',
}

const maxWidthMap = {
  content: 'max-w-[1080px]',
  wide: 'max-w-[1480px]',
  full: 'max-w-full',
}

export function SectionWrapper({
  children,
  fullBleedBg,
  maxWidth = 'wide',
  padding = 'normal',
  align = 'left',
  className = '',
  id,
}: SectionWrapperProps) {
  const alignClass = align === 'center' ? 'text-center' : ''

  return (
    <section
      id={id}
      className={`w-full ${paddingMap[padding]} ${className}`}
      style={{ background: fullBleedBg || 'transparent' }}
    >
      <div className={`${maxWidthMap[maxWidth]} mx-auto px-6 md:px-8 ${alignClass}`}>
        {children}
      </div>
    </section>
  )
}

// Alias for backwards compatibility
export { SectionWrapper as Section }
