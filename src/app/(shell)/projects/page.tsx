import ProjectsClient from './ProjectsClient'

export const metadata = {
  title: 'Projects | Liam Stoica',
  description: 'Selected work across web, mobile, and enterprise design.',
}

// All projects data with filter metadata
// Ordered by year descending: hrx-app-moments (2025), hrx-experiences-webviews (2025), hp-internal-ai (2024), hard-rock-web (2024), track-tennis (2022)
const allProjects = [
  {
    slug: 'hard-rock-web',
    title: 'Hard Rock: Global Web Platform',
    sentence: 'Building a unified digital ecosystem for 100M+ annual visitors.',
    tags: ['Web', 'Design System', 'Enterprise'],
    year: '2025—Ongoing',
    image: '/images/hard-rock-web/hard-rock-hero.jpg',
    platform: ['Web'],
    focus: ['Systems', 'Conversion', 'Architecture'],
    context: ['Enterprise', 'D2C'],
  },
  {
    slug: 'hrx-app-moments',
    title: 'HRX App: Moments',
    sentence: 'Designing a discovery engine that turns inspiration into bookings.',
    tags: ['Mobile', 'App', 'Enterprise'],
    year: '2025',
    image: '/images/hrx-moments/moments-hero6.png',
    platform: ['Mobile App'],
    focus: ['Social Media', 'Conversion'],
    context: ['Enterprise', 'D2C'],
  },
  {
    slug: 'hrx-mybeat-mobile-key',
    title: 'HRX: MyBeat + Mobile Key',
    sentence: 'Unifying identity, reservations, and mobile key into a personal command center.',
    tags: ['Mobile', 'App', 'Enterprise'],
    year: '2025',
    image: '/images/hrx-mybeat/mybeat-hero2.png',
    platform: ['Mobile App'],
    focus: ['Systems', 'Conversion'],
    context: ['Enterprise', 'D2C'],
  },
  {
    slug: 'hrx-experiences-webviews',
    title: 'HRX App: Experiences + Webviews',
    sentence: 'Creating app-to-web booking journeys that preserve trust, context, and conversion.',
    tags: ['Mobile', 'App', 'Enterprise'],
    year: '2025',
    image: '/images/hard-rock-app/hrx-hero.png',
    platform: ['IOS'],
    focus: ['Systems', 'Conversion'],
    context: ['Enterprise', 'D2C'],
  },
  {
    slug: 'hrx-app-onboarding',
    title: 'HRX App: Onboarding + Sign Up',
    sentence: 'Designing trust where it\'s earned in the first 60 seconds.',
    tags: ['Mobile', 'App', 'Enterprise'],
    year: '2025',
    image: '/images/hrx-onboarding/mockup-hero.png',
    platform: ['Mobile App'],
    focus: ['Systems', 'Conversion'],
    context: ['Enterprise', 'D2C'],
  },
  {
    slug: 'hrx-offers',
    title: 'HRX: Offers',
    sentence: 'Designing a scalable offers system that turns incentives into action.',
    tags: ['Mobile', 'App', 'Enterprise'],
    year: '2025',
    image: '/images/hrx-offers/offer-hero4.png',
    platform: ['Mobile App'],
    focus: ['Systems', 'Conversion'],
    context: ['Enterprise', 'D2C'],
  },
  {
    slug: 'hp-internal-ai',
    title: 'HP Internal AI Assistant',
    sentence: 'Designing a secure, locally hosted AI assistant for an HP executive.',
    tags: ['AI', 'Enterprise'],
    year: '2024',
    image: '/images/hp-ai/hero-mockup2.png',
    platform: ['SaaS'],
    focus: ['AI'],
    context: ['Enterprise', '0 → 1'],
  },
  {
    slug: 'track-tennis',
    title: 'Track.Tennis',
    sentence: 'Leading a strategic pivot from consumer app to scalable B2B sports platform.',
    tags: ['Startup', 'SaaS', 'Data', '0 → 1'],
    year: '2021—2022',
    image: '/images/track-tennis/track-tennis-hero.png',
    platform: ['SaaS'],
    focus: ['Systems'],
    context: ['Startup', '0 → 1', 'B2B'],
  },
]

export default function ProjectsPage() {
  return <ProjectsClient projects={allProjects} />
}

