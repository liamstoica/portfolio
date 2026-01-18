'use client'

import Image from 'next/image'

interface Card {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
}

interface CardSectionProps {
  title?: string
  cards: Card[]
}

/**
 * CardSection
 * - Near full-width layout (matches wider image sections)
 * - Desktop (4 cards): 2x2 grid
 * - Desktop (3 cards): 3 columns, centered
 * - Tablet: 2 columns
 * - Mobile: 1 column
 * - Large cards with impactful images
 */
export function CardSection({ title, cards }: CardSectionProps) {
  // Determine grid based on card count
  const is4Cards = cards.length === 4
  const gridClass = is4Cards
    ? 'grid-cols-1 sm:grid-cols-2' // 2x2 for 4 cards
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' // 3 columns for 3 cards

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 md:px-4 lg:px-6 py-16 md:py-24">
      {/* Title */}
      {title && (
        <h2 className="font-serif text-2xl md:text-3xl italic text-white text-center mb-12">
          {title}
        </h2>
      )}

      {/* Card grid */}
      <div className={`grid ${gridClass} gap-5 md:gap-6 lg:gap-8`}>
        {cards.map((card, index) => (
          <article key={index} className="group">
            {/* Image - 16:9 with larger height */}
            <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900 mb-5">
              <Image
                src={card.imageSrc}
                alt={card.imageAlt || card.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={is4Cards 
                  ? "(max-width: 640px) 100vw, 50vw"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />
            </div>

            {/* Content */}
            <h3 className="text-lg md:text-xl font-medium text-white mb-2">
              {card.title}
            </h3>
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
