'use client'

import { useState, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ExpandableImage } from '@/components/ui/expandable-image'

interface StrategyCard {
  image?: string
  title: string
  copy?: string
}

interface StrategyTab {
  id: string
  label: string
  subtitle: string
  goal: string
  cards: StrategyCard[]
}

interface StrategyTabsProps {
  tabs: StrategyTab[]
}

function StrategyCarousel({ cards }: { cards: StrategyCard[] }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  // Get actual card width + gap from DOM
  const getCardScrollDistance = useCallback(() => {
    if (!containerRef.current) return 300
    const firstCard = containerRef.current.querySelector('.process-card') as HTMLElement
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
        className="process-carousel"
        onScroll={handleScroll}
        onTouchEnd={handleScrollEnd}
        onMouseUp={handleScrollEnd}
      >
        {cards.map((card, index) => (
          <div key={index} className="process-card">
            <div className="process-card-image">
              {card.image ? (
                <ExpandableImage src={card.image} alt={card.title} fill sizes="(max-width: 640px) 85vw, 45vw" />
              ) : (
                <div className="process-image-placeholder" />
              )}
            </div>
            <div className="process-card-content">
              <h3 className="process-card-title">{card.title}</h3>
              {card.copy && <p className="process-card-copy">{card.copy}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls-bottom">
        <button 
          onClick={() => scroll('left')} 
          disabled={!canScrollLeft}
          className="carousel-arrow"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')} 
          disabled={!canScrollRight}
          className="carousel-arrow"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

export function StrategyTabs({ tabs }: StrategyTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  const currentTab = tabs.find(t => t.id === activeTab)

  return (
    <div className="strategy-tabs">
      <div className="strategy-tabs-nav" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`strategy-tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {currentTab && (
        <div 
          id={`tabpanel-${currentTab.id}`}
          role="tabpanel"
          aria-labelledby={currentTab.id}
          className="strategy-tab-content"
        >
          <h4 className="strategy-tab-subtitle">{currentTab.subtitle}</h4>
          <p className="strategy-goal">{currentTab.goal}</p>
          <StrategyCarousel cards={currentTab.cards} />
        </div>
      )}
    </div>
  )
}
