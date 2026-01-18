import ProjectsClient from './ProjectsClient'

export const metadata = {
  title: 'Projects | Liam Stoica',
  description: 'Selected work across web, mobile, and enterprise design.',
}

// All projects data with filter metadata
// Ordered by year descending: hard-rock-web (2025), hard-rock-app (2025), hp-ai (2024), bmw-metaverse (2023), track-tennis (2022)
const allProjects = [
  {
    slug: 'hard-rock-web',
    title: 'Hard Rock — Global Web Platform',
    sentence: 'Designing a unified digital ecosystem for 100M+ annual visitors.',
    tags: ['Web', 'Design System', 'Enterprise', 'E-Commerce'],
    year: '2025—Ongoing',
    image: '/images/hard-rock-web/hard-rock-hero.jpg',
    platform: ['Web'],
    focus: ['Systems', 'E-Comm.'],
    context: ['Enterprise'],
  },
  {
    slug: 'hard-rock-app',
    title: 'Hard Rock Experience App',
    sentence: 'Rebuilt the loyalty experience for members across all lines of business.',
    tags: ['iOS', 'Mobile', 'Enterprise', 'E-Comm.'],
    year: '2025—Ongoing',
    image: '/images/hard-rock-app/hrx-hero.png',
    platform: ['iOS'],
    focus: ['E-Commerce'],
    context: ['Enterprise'],
  },
  {
    slug: 'hp-ai',
    title: 'HP — AI Assistant',
    sentence: 'Designed HP\'s internal AI assistant to make daily workflows faster and more reliable.',
    tags: ['AI', 'Internal Tool', 'SaaS', 'B2B'],
    year: '2024',
    image: '/images/hp-ai/hp-hero.png',
    platform: ['SaaS'],
    focus: ['AI'],
    context: ['Enterprise', 'B2B'],
  },
  {
    slug: 'bmw-metaverse',
    title: 'BMW Metaverse Strategy',
    sentence: 'Defining a multi-phase digital ecosystem to engage Gen Z beyond a single platform.',
    tags: ['Strategy', 'Metaverse', 'Research'],
    year: '2023',
    image: '/images/bmw/hero-3.jpg',
    platform: ['Metaverse'],
    focus: ['Strategy'],
    context: ['Enterprise'],
  },
  {
    slug: 'track-tennis',
    title: 'Track.Tennis',
    sentence: 'Leading a strategic pivot from consumer app to scalable B2B sports platform.',
    tags: ['Web', 'Sports', 'Data', '0 → 1'],
    year: '2021—2022',
    image: '/images/track-tennis/track-tennis-hero.png',
    platform: ['Web', 'SaaS'],
    focus: ['Data'],
    context: ['B2B', '0 → 1'],
  },
]

export default function ProjectsPage() {
  return <ProjectsClient projects={allProjects} />
}

