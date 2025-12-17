'use client'

import { useState, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface ResearchCard {
  title: string
  copy: string
  bullets: string[]
}

interface ResearchCarouselProps {
  cards: ResearchCard[]
}

export function ResearchCarousel({ cards }: ResearchCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  // Get actual card width + gap from DOM
  const getCardScrollDistance = useCallback(() => {
    if (!containerRef.current) return 300
    const firstCard = containerRef.current.querySelector('.research-card') as HTMLElement
    if (!firstCard) return 300
    const cardWidth = firstCard.offsetWidth
    const gap = 16 // CSS gap value
    return cardWidth + gap
  }, [])

  // Snap to nearest card after scroll ends
  const snapToNearestCard = useCallback(() => {
    if (!containerRef.current || isScrolling.current) return
    const scrollDistance = getCardScrollDistance()
    const currentScroll = containerRef.current.scrollLeft
    const nearestCardIndex = Math.round(currentScroll / scrollDistance)
    const targetPosition = nearestCardIndex * scrollDistance
    
    // Only snap if we're not already at the target
    if (Math.abs(currentScroll - targetPosition) > 2) {
      containerRef.current.scrollTo({ left: targetPosition, behavior: 'smooth' })
    }
  }, [getCardScrollDistance])

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current || isScrolling.current) return
    
    const scrollDistance = getCardScrollDistance()
    const currentScroll = containerRef.current.scrollLeft
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth
    
    // Calculate current card index and target
    const currentCardIndex = Math.round(currentScroll / scrollDistance)
    const targetCardIndex = direction === 'left' 
      ? Math.max(0, currentCardIndex - 1)
      : currentCardIndex + 1
    
    const targetPosition = Math.min(targetCardIndex * scrollDistance, maxScroll)
    
    isScrolling.current = true
    containerRef.current.scrollTo({ left: targetPosition, behavior: 'smooth' })
    
    // Reset scrolling flag and snap after animation
    setTimeout(() => {
      isScrolling.current = false
      setScrollPosition(containerRef.current?.scrollLeft || 0)
    }, 350)
  }

  const handleScroll = () => {
    if (containerRef.current && !isScrolling.current) {
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }

  // Snap on scroll end (for touch/drag scrolling)
  const handleScrollEnd = useCallback(() => {
    if (!isScrolling.current) {
      snapToNearestCard()
    }
  }, [snapToNearestCard])

  const canScrollLeft = scrollPosition > 5
  const canScrollRight = containerRef.current 
    ? scrollPosition < containerRef.current.scrollWidth - containerRef.current.clientWidth - 5
    : true

  return (
    <div className="carousel-wrapper">
      <div 
        ref={containerRef} 
        className="research-carousel"
        onScroll={handleScroll}
        onTouchEnd={handleScrollEnd}
        onMouseUp={handleScrollEnd}
      >
        {cards.map((card, index) => (
          <div key={index} className="research-card">
            <h3 className="research-card-title">{card.title}</h3>
            <p className="research-card-copy">{card.copy}</p>
            <ul className="research-card-bullets">
              {card.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="carousel-controls-bottom">
        <button 
          onClick={() => scroll('left')} 
          disabled={!canScrollLeft}
          className="carousel-arrow"
          aria-label="Previous cards"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')} 
          disabled={!canScrollRight}
          className="carousel-arrow"
          aria-label="Next cards"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
