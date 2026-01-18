import { IosTile } from '@/components/ui/ios-tile'
import { WorkGridCard } from '@/components/ui/work-card'
import { Testimonials } from '@/components/ui/testimonials'
import { liveSites, sandbox } from '@/lib/data'
import Image from "next/image"
import Link from "next/link"

// Work projects data - showing first 2 on homepage
// Ordered by year descending (2025, 2025, 2024, 2023, 2022)
const workProjects = [
  {
    slug: 'hard-rock-web',
    title: 'Hard Rock — Global Web Platform',
    sentence: 'Designing a unified digital ecosystem for 100M+ annual visitors.',
    tags: ['Web', 'Design System'],
    year: '2025—Ongoing',
    image: '/images/hard-rock-web/hard-rock-hero.jpg',
  },
  {
    slug: 'hard-rock-app',
    title: 'Hard Rock Experience App',
    sentence: 'Rebuilt the loyalty experience for members across all lines of business.',
    tags: ['iOS', 'Mobile'],
    year: '2025—Ongoing',
    image: '/images/hard-rock-app/hrx-hero.png',
  },
]

export default function HomePage() {

  return (
    <div className="card-container">
      {/* Hero Header */}
      <header className="hero-header">
        {/* Profile Photo */}
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
        </div>
        
        {/* Name + Subtitle in One Row (Felix-style) */}
        <div className="hero-text">
          <h1 className="hero-name-row">
            <span className="hero-name">Liam Stoica</span>
            <span className="hero-dot">·</span>
            <span className="hero-title">Designing for Growth</span>
          </h1>
          <p className="hero-tagline">I design scalable digital products rooted in strategy and human experience.</p>
          <div className="hero-cta-icons">
            <a 
              href="https://www.linkedin.com/in/liam-stoica/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-cta-icon-btn"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="mailto:liamstoica@gmail.com"
              className="hero-cta-icon-btn"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Work Section - 2 Project Cards */}
      <section className="content-section">
        <div className="section-heading">
          <h2 className="section-header">Selected Work</h2>
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

      {/* References Section */}
      <section className="content-section">
        <div className="section-heading">
          <h2 className="section-header">References</h2>
        </div>
        <Testimonials />
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* About My Career */}
      <section className="content-section">
        <h2 className="section-header">About My Career</h2>
        <div className="body-text prose-block">
          <p>
          Currently designing <a href="https://hardrock.com" target="_blank" rel="noopener noreferrer"><strong>Hard Rock International&apos;s</strong></a> global digital transformation across web and app, unifying multiple business lines into one connected platform. My work focuses on clarity, system design, and creating intuitive experiences for millions of guests worldwide.
          </p>
          <p>
          Before Hard Rock, I designed across B2B, SaaS, and D2C. I built an AI assistant for <strong>HP</strong>, developed metaverse strategy for <strong>BMW</strong>, created GovTech products at <strong>Deep Water Point & Associates</strong> that were later adopted by <strong>Deloitte</strong>, and shaped early startup product direction at <strong>mrgn</strong> and <strong>Track.Tennis</strong>. I have earned more than 30 international design awards and studied Human Computer Interaction and Design Management at <strong>SCAD</strong>.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* About Me */}
      <section className="content-section">
        <h2 className="section-header">About Me</h2>
        <p className="body-text prose-block">
        I grew up competing in tennis and represented New Zealand throughout my junior years. Coaching at the <strong>Rafa Nadal Academy</strong> taught me patience, leadership, and how to help people perform at their best. Outside of design I love cooking, painting, traveling, and learning about history. The world used to feel beautifully complex, and I enjoy exploring the stories that shaped it.
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