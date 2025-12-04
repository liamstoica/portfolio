'use client'

import { ExpandableImage } from '@/components/ui/expandable-image'

interface HighlightCardProps {
  image?: string
  title: string
  copy?: string
  isFullWidth?: boolean
}

export function HighlightCard({ image, title, isFullWidth }: HighlightCardProps) {
  return (
    <div className={`highlight-card-vertical ${isFullWidth ? 'highlight-card-full' : ''}`}>
      <div className="highlight-card-image-vertical">
        {image ? (
          <ExpandableImage 
            src={image} 
            alt={title} 
            fill 
            sizes={isFullWidth ? "(max-width: 768px) 100vw, 800px" : "(max-width: 768px) 100vw, 400px"} 
          />
        ) : (
          <div className="highlight-image-placeholder" />
        )}
      </div>
      <h3 className="highlight-card-title-centered">{title}</h3>
    </div>
  )
}

interface HighlightGridProps {
  highlights: Omit<HighlightCardProps, 'isFullWidth'>[]
}

export function HighlightGrid({ highlights }: HighlightGridProps) {
  const count = highlights.length

  // Layout pattern for 5 cards: 2, 1 (full-width), 2
  if (count === 5) {
    return (
      <div className="highlight-grid-pattern">
        {/* Row 1: 2 cards */}
        <div className="highlight-row highlight-row-two">
          <HighlightCard {...highlights[0]} />
          <HighlightCard {...highlights[1]} />
        </div>
        {/* Row 2: 1 full-width card */}
        <div className="highlight-row highlight-row-one">
          <HighlightCard {...highlights[2]} isFullWidth />
        </div>
        {/* Row 3: 2 cards */}
        <div className="highlight-row highlight-row-two">
          <HighlightCard {...highlights[3]} />
          <HighlightCard {...highlights[4]} />
        </div>
      </div>
    )
  }

  // Layout pattern for 3 cards: 2, 1 (centered full-width)
  if (count === 3) {
    return (
      <div className="highlight-grid-pattern">
        {/* Row 1: 2 cards */}
        <div className="highlight-row highlight-row-two">
          <HighlightCard {...highlights[0]} />
          <HighlightCard {...highlights[1]} />
        </div>
        {/* Row 2: 1 full-width card */}
        <div className="highlight-row highlight-row-one">
          <HighlightCard {...highlights[2]} isFullWidth />
        </div>
      </div>
    )
  }

  // Default: standard 2-column grid
  return (
    <div className="highlight-grid-two-col">
      {highlights.map((item, index) => (
        <HighlightCard key={index} {...item} />
      ))}
    </div>
  )
}
