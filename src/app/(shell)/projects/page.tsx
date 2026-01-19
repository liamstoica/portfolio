import ProjectsClient from './ProjectsClient'

export const metadata = {
  title: 'Projects | Liam Stoica',
  description: 'Selected work across web, mobile, and enterprise design.',
}

// All projects data with filter metadata
// Ordered by year descending: hard-rock-web (2025), track-tennis (2022)
const allProjects = [
  {
    slug: 'hard-rock-web',
    title: 'Hard Rock — Global Web Platform',
    sentence: 'Designing a unified digital ecosystem for 100M+ annual visitors.',
    tags: ['Web', 'Design System', 'Enterprise'],
    year: '2025—Ongoing',
    image: '/images/hard-rock-web/hard-rock-hero.jpg',
    platform: ['Web'],
    focus: ['Systems', 'E-Comm.'],
    context: ['Enterprise'],
  },
  {
    slug: 'track-tennis',
    title: 'Track.Tennis',
    sentence: 'Leading a strategic pivot from consumer app to scalable B2B sports platform.',
    tags: ['Web', 'Sports', 'Data', '0 → 1'],
    year: '2021—2022',
    image: '/images/track-tennis/track-tennis-hero.png',
    platform: ['SaaS'],
    focus: ['Sports'],
    context: ['B2B', '0 → 1'],
  },
]

export default function ProjectsPage() {
  return <ProjectsClient projects={allProjects} />
}

