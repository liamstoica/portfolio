import ProjectsClient from './ProjectsClient'

export const metadata = {
  title: 'Projects | Liam Stoica',
  description: 'Selected work across web, mobile, and enterprise design.',
}

// All projects data with filter metadata
// Ordered by year descending: hrx-app-moments (2025), hrx-experiences-webviews (2025), hard-rock-web (2024), track-tennis (2022)
const allProjects = [
  {
    slug: 'hrx-app-moments',
    title: 'HRX App: Moments',
    sentence: 'Designing a discovery engine that turns inspiration into bookings.',
    tags: ['Mobile', 'App', 'Enterprise'],
    year: '2025—Ongoing',
    image: '/images/hrx-moments/moments-hero6.png',
    platform: ['IOS'],
    focus: ['Social Media', 'Mobile'],
    context: ['Enterprise'],
  },
  {
    slug: 'hrx-experiences-webviews',
    title: 'HRX App: Experiences + Webviews',
    sentence: 'Designing app-to-web booking journeys that preserve trust, context, and conversion.',
    tags: ['Mobile', 'App', 'Enterprise'],
    year: '2025—Ongoing',
    image: '/images/hard-rock-app/hrx-hero.png',
    platform: ['Web', 'SaaS'],
    focus: ['Systems', 'E-Comm.'],
    context: ['Enterprise'],
  },
  {
    slug: 'hard-rock-web',
    title: 'Hard Rock: Global Web Platform',
    sentence: 'Designing a unified digital ecosystem for 100M+ annual visitors.',
    tags: ['Web', 'Design System', 'Enterprise'],
    year: '2024—Ongoing',
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

