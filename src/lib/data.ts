// Project Data - Approved projects only

export interface Project {
  slug: string
  title: string
  description: string
  role: string
  icon?: string
  color?: string
  sections?: {
    id: string
    title: string
    content: string
  }[]
}

export interface LiveSite {
  title: string
  href: string
  icon?: string
  color?: string
  image?: string    // <--- FIXED HERE
}

export interface SandboxItem {
  slug: string
  title: string
  description: string
  icon?: string
  color?: string
  image?: string    // <--- OPTIONAL IMAGE (prevents similar future errors)
}

// Featured Work - Case Studies (Approved Projects Only)
export const projects: Project[] = [
  {
    slug: 'hard-rock-web',
    title: 'Hard Rock: Global Web Platform',
    description: 'Designing a unified digital ecosystem for 100M+ annual visitors across resorts, casinos, cafes, entertainment, and retail.',
    role: 'Lead UX/UI Designer',
    color: '#FEF3C7',
  },
  {
    slug: 'hp-ai',
    title: 'HP Business Intelligence',
    description:
      'Design engineering a custom AI assistant for an HP executive\'s team to streamline workflows, communication, and innovation.',
    role: 'Design Engineer',
    color: '#DBEAFE',
  },
  {
    slug: 'track-tennis',
    title: 'Track.Tennis',
    description: 'Design driven strategy to expand brand, product, and market reach across racket sports.',
    role: 'Product Designer',
    color: '#D1FAE5',
  },
  {
    slug: 'hard-rock-app',
    title: 'Hard Rock: Experience App',
    description: 'Designing a unified lifestyle platform for millions of guests across hotels, casinos, cafes, entertainment, and retail.',
    role: 'UX/UI Designer',
    color: '#FCE7F3',
  },
]

// Live Sites - External Links (Approved Projects Only)
export const liveSites: LiveSite[] = [
  {
    title: 'Adcetera',
    href: 'https://www.adcetera.com/',
    color: '#FEF3C7',
    image: '/images/live-sites/adcetera.png',
  },
  {
    title: 'Everon',
    href: 'https://www.everonsolutions.com/',
    color: '#FED7AA',
    image: '/images/live-sites/everon1.png',
  },
  {
    title: 'Amalgamat. Bank',
    href: 'https://www.amalgamatedbank.com/',
    color: '#FECACA',
    image: '/images/live-sites/amgb.png',
  },
  {
    title: 'JMW Consulting',
    href: 'https://www.jmw.com/',
    color: '#DBEAFE',
    image: '/images/live-sites/jmw.png',
  },
  {
    title: 'Mellow Home',
    href: 'https://mellow-home.com.au/',
    color: '#E0E7FF',
    image: '/images/live-sites/mellow.png',
  },
  {
    title: 'Frazer-Nash Consultancy',
    href: 'https://www.fnc.co.uk/',
    color: '#FCE7F3',
    image: '/images/live-sites/fnc.png',
  },
  {
    title: 'KBR',
    href: 'https://www.kbr.com/en',
    color: '#D1FAE5',
    image: '/images/live-sites/kbr.png',
  },
  {
    title: 'Kodak Alaris',
    href: 'https://www.kodakalaris.com/en',
    color: '#CFFAFE',
    image: '/images/live-sites/kodak-alaris.png',
  },
  {
    title: 'Pliteq',
    href: 'https://pliteq.com/',
    color: '#CFFAFE',
    image: '/images/live-sites/pliteq.png',
  },
  {
    title: 'iconectiv Store',
    href: 'https://store.iconectiv.com/',
    color: '#CFFAFE',
    image: '/images/live-sites/iconectiv.png',
  },
]

// Sandbox - Explorations
export const sandbox: SandboxItem[] = [
  {
    slug: 'apple-profiles',
    title: 'Apple Profiles',
    description: 'An interactive exploration of component architecture and design tokens.',
    color: '#F3E8FF',
    image: '/images/sandbox/apple/apple-tile.png',
  },
]

// Get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

// Get sandbox item by slug
export function getSandboxItemBySlug(slug: string): SandboxItem | undefined {
  return sandbox.find((s) => s.slug === slug)
}
