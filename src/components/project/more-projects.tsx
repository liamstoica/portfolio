'use client'

import Image from 'next/image'
import Link from 'next/link'

// Work projects data matching homepage
// Ordered by year descending: hard-rock-web (2025), track-tennis (2022)
const workProjectsData = [
  {
    slug: 'hard-rock-web',
    title: 'Hard Rock — Global Web Platform',
    tags: ['Web', 'Design System'],
    year: '2025',
    image: '/images/hard-rock-web/hard-rock-hero.jpg',
  },
  {
    slug: 'track-tennis',
    title: 'Track.Tennis',
    tags: ['Web', 'Sports'],
    year: '2022',
    image: '/images/track-tennis/track-tennis-hero.png',
  },
]

// Tag color mapping
const tagColors: Record<string, string> = {
  'Web': '#dbeafe',
  'Design System': '#fef3c7',
  'Sports': '#fed7aa',
}

function getTagColor(tag: string): string {
  return tagColors[tag] || '#f3f4f6'
}

interface MoreProjectsProps {
  currentSlug: string
}

export function MoreProjects({ currentSlug }: MoreProjectsProps) {
  // Filter out current project and get first 2
  const otherProjects = workProjectsData
    .filter(p => p.slug !== currentSlug)
    .slice(0, 2)

  return (
    <div className="more-projects">
      <div className="more-projects-grid">
        {otherProjects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="more-project-card">
            <div className="more-project-card-image">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'var(--tile-bg, #f3f4f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                  }}
                >
                  Strategy Case Study
                </div>
              )}
            </div>
            <div className="more-project-card-content">
              <h3 className="more-project-card-title">{project.title}</h3>
              <div className="more-project-card-footer">
                <div className="more-project-card-tags">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="more-project-card-tag"
                      style={{ backgroundColor: getTagColor(tag) }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="more-project-card-year">{project.year}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
