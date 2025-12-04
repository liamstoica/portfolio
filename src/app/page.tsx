'use client'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import { IosTile } from '@/components/ui/ios-tile'
import { WorkGridCard } from '@/components/ui/work-card'
import { liveSites, sandbox } from '@/lib/data'
import Image from "next/image"

// Work projects data for 2×2 grid
const workProjects = [
  {
    slug: 'hard-rock-web',
    title: 'Hard Rock: Global Web Platform',
    sentence: 'Designing a unified digital ecosystem for 100M+ annual visitors.',
    tags: ['Web', 'Design System'],
    year: '2025—Ongoing',
    image: '/images/hard-rock-web/hard-rock-hero.jpg',
  },
  {
    slug: 'hard-rock-app',
    title: 'Hard Rock: Experience App',
    sentence: 'Rebuilt the loyalty experience for members across all lines of business.',
    tags: ['iOS', 'Mobile'],
    year: '2025—Ongoing',
    image: '/images/hard-rock-app/hrx-hero.png',
  },
  {
    slug: 'hp-ai',
    title: 'HP — AI Assistant',
    sentence: 'Designed HP\'s internal AI assistant to make daily workflows faster and more reliable.',
    tags: ['AI', 'Internal Tool'],
    year: '2024',
    image: '/images/hp-ai/hp-hero.png',
  },
  {
    slug: 'track-tennis',
    title: 'Track.Tennis',
    sentence: 'Complete redesign across product, brand, and value.',
    tags: ['Web', 'Sports'],
    year: '2021—2022',
    image: '/images/track-tennis/track-tennis-hero.png',
  },
]

export default function HomePage() {
  return (
    <div className="card-container">
      {/* Hero Header */}
      <header className="hero-header">
        {/* Top Row: Profile Photo + Theme Toggle */}
        <div className="hero-top-row">
          <div className="profile-photo">
            <Image
              src="/images/liam-profile4.png"
              alt="Liam Stoica"
              width={96}
              height={96}
              priority
              className="profile-photo-img"
            />
          </div>
          <ThemeToggle />
        </div>
        
        {/* Name + Subtitle in One Row (Felix-style) */}
        <div className="hero-text">
          <h1 className="hero-name-row">
            <span className="hero-name">Liam Stoica</span>
            <span className="hero-dot">·</span>
            <span className="hero-title">Designing for Growth</span>
          </h1>
          <p className="hero-tagline">At the intersection of art, science and business.</p>
        </div>
      </header>

      {/* Intro Paragraph */}
      <p className="intro-text">
        I believe design is the link between creativity and business. It&apos;s how ideas become useful, how systems become simple, and how brands earn trust. 
      </p>

      {/* Work Section - 2×2 Grid */}
      <section className="content-section">
        <div className="section-heading">
          <h2 className="section-header">Work</h2>
          <p className="section-subtitle">A selection of projects I&apos;ve chosen to share.</p>
        </div>
        <div className="work-grid">
          {workProjects.map((project) => (
            <WorkGridCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              sentence={project.sentence}
              tags={project.tags}
              year={project.year}
              image={project.image}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Live Web Work - Keep iOS tiles */}
      <section className="content-section">
        <div className="section-heading">
          <h2 className="section-header">Live Web Work</h2>
          <p className="section-subtitle">Web projects I contributed to as designer and strategist.</p>
        </div>
        <div className="tile-grid">
          {liveSites.map((site, index) => (
            <IosTile
              key={index}
              href={site.href}
              label={site.title.replace(' Hotels', '').replace(' Cafes', '').replace(' Casinos', '')}
              image={site.image}
              isExternal
              color={site.color}
          />
          
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Sandbox - Keep iOS tiles */}
      <section className="content-section">
        <div className="section-heading">
          <h2 className="section-header">Sandbox</h2>
          <p className="section-subtitle">A space for experiments that might just work.</p>
        </div>
        <div className="tile-grid">
          {sandbox.map((item) => (
            <IosTile
              key={item.slug}
              href={`/sandbox/${item.slug}`}
              label={item.title}
              image={item.image}   // <-- NEW
              color="#f3e8ff"
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* About My Career */}
      <section className="content-section">
        <h2 className="section-header">About My Career</h2>
        <div className="body-text prose-block">
          <p>
            Right now, I&apos;m leading 🏨 <a href="https://hardrock.com" target="_blank" rel="noopener noreferrer">Hard Rock International</a>&apos;s 
            global digital transformation—unifying several lines of businesses and shaping the next evolution of the 
            Hard Rock Experience across web and app. My focus is creating connected, intuitive experiences that reach millions of guests.
          </p>
          <p>
            Before this, I designed across B2B, SaaS, and D2C: a locally hosted AI assistant at <a href="https://hp.com" target="_blank" rel="noopener noreferrer">HP</a>, 
            {' '}metaverse strategy for <a href="https://bmw.com" target="_blank" rel="noopener noreferrer">BMW</a>, 
            {' '}Govtech SaaS at Deep Water Point (adopted by <strong>Deloitte</strong>), 
            {' '}and product design at <a href="https://mrgn.com" target="_blank" rel="noopener noreferrer">mrgn</a> and Track.Tennis.
            {' '}I&apos;ve received <strong>30+ international design awards</strong> and studied Human Computer Interaction and Design Management at <strong>SCAD</strong>.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* About Me */}
      <section className="content-section">
        <h2 className="section-header">About Me</h2>
        <p className="body-text prose-block">
          I grew up competing in tennis and represented New Zealand throughout my junior years. 
          I coached at the <strong>Rafa Nadal Academy</strong>, which taught me patience, leadership, 
          and how to bring out the best in people. Outside of design I love cooking, painting, 
          traveling, and history. The world used to feel beautifully complex, and I love exploring 
          the stories that shaped it.
        </p>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Contact */}
      <section className="content-section">
        <h2 className="section-header">Contact</h2>
        <p className="body-text" style={{ marginBottom: '16px' }}>
          Let&apos;s connect if you care about design, impact, or building things that matter.
        </p>
        <div className="contact-links">
          <a href="mailto:liamstoica@gmail.com">
            ✉️ liamstoica@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/liam-stoica/" target="_blank" rel="noopener noreferrer">
            💼 LinkedIn
          </a>
          <a href="https://www.instagram.com/liamstoica/" target="_blank" rel="noopener noreferrer">
            📷 Instagram
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          New York City Area <span style={{ opacity: 0.6 }}>(New Zealand Home)</span>
        </p>
      </footer>
    </div>
  )
}

// Helper function for Live section emoji
function getLiveEmoji(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('hotel')) return '🏨'
  if (t.includes('cafe')) return '☕'
  if (t.includes('casino')) return '🎰'
  if (t.includes('hp')) return '🖨️'
  if (t.includes('bmw')) return '🚗'
  if (t.includes('mrgn')) return '💰'
  if (t.includes('track') || t.includes('tennis')) return '🎾'
  if (t.includes('deep water')) return '🏛️'
  return '🌐'
}
