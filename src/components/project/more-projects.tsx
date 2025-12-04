'use client'

import Image from 'next/image'
import Link from 'next/link'

// Work projects data matching homepage
const workProjectsData = [
  {
    slug: 'hard-rock-web',
    title: 'Hard Rock — Global Web Platform',
    tags: ['Web', 'Design System'],
    year: '2024–2025',
    image: '/images/hard rock web/hard-rock-hero.jpg',
  },
  {
    slug: 'hard-rock-app',
    title: 'Hard Rock Experience App',
    tags: ['iOS', 'Mobile'],
    year: '2024–2025',
    image: '/images/hard rock app/hrx-hero.png',
  },
  {
    slug: 'hp-ai',
    title: 'HP — AI Assistant',
    tags: ['AI', 'Internal Tool'],
    year: '2023',
    image: '/images/hp ai/hp-hero.png',
  },
  {
    slug: 'track-tennis',
    title: 'Track.Tennis',
    tags: ['Web', 'Sports'],
    year: '2022',
    image: '/images/work-tracktennis.jpg',
  },
]

// Tag color mapping
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
          <Link key={project.slug} href={`/work/${project.slug}`} className="more-project-card">
            <div className="more-project-card-image">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
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
