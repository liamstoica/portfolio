'use client'

import Image from 'next/image'
import Link from 'next/link'

interface WorkGridCardProps {
  slug: string
  title: string
  sentence: string
  tags: string[]
  year: string
  image: string
}

// Tag color mapping for soft pastel backgrounds
const tagColors: Record<string, string> = {
  'Web': '#dbeafe',
  'Design System': '#fef3c7',
  'iOS': '#fce7f3',
  'Mobile': '#cffafe',
  'AI': '#c7d2fe',
  'Internal Tool': '#e5e7eb',
  'Sports': '#fed7aa',
}

function getTagColor(tag: string): string {
  return tagColors[tag] || '#f3f4f6'
}

export function WorkGridCard({ slug, title, sentence, tags, year, image }: WorkGridCardProps) {
  return (
    <Link href={`/work/${slug}`} className="work-grid-card">
      {/* Image on top */}
      <div className="work-grid-card-image">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="work-grid-card-img"
        />
      </div>
      
      {/* Content below */}
      <div className="work-grid-card-content">
        <h3 className="work-grid-card-title">{title}</h3>
        <p className="work-grid-card-sentence">{sentence}</p>
        
        <div className="work-grid-card-footer">
          <div className="work-grid-card-tags">
            {tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="work-grid-card-tag"
                style={{ backgroundColor: getTagColor(tag) }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="work-grid-card-year">{year}</span>
        </div>
      </div>
    </Link>
  )
}
