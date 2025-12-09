import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { BlogCard } from '@/components/ui/blog-card'
import { getStartupPosts } from '@/lib/blog'
import { ArrowLeft, Mail, Linkedin } from 'lucide-react'

export const metadata = {
  title: 'Services | Liam Stoica',
  description: 'Product strategy and design advisory for early-stage founders and corporate teams.',
}

export default function ServicesPage() {
  // Get up to 3 startup-related posts
  const startupPosts = getStartupPosts(3)

  return (
    <div className="card-container">
      {/* Header */}
      <header style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link 
            href="/" 
            className="back-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Availability Badge */}
      <div className="services-availability-badge">
        Currently accepting 1–2 advisory partners Q1 2025.
      </div>

      {/* Hero Section */}
      <section style={{ marginBottom: '48px' }}>
        <h1 className="services-hero-title">
          Product Strategy & Design Advisory
        </h1>
        <p className="services-hero-subtitle">
          I help early-stage teams create clarity, direction, and momentum so they can build products that matter.
        </p>
        <a href="#contact" className="services-hero-cta">
          Work With Me
        </a>
      </section>

      <div className="section-divider" />

      {/* What I Bring Section */}
      <section className="content-section">
        <h2 className="section-header">What I Bring</h2>
        <div className="services-what-grid">
          <div className="services-what-card">
            <h3>Clarity</h3>
            <p>A sharp understanding of who your product is for and the real problem it solves.</p>
          </div>
          <div className="services-what-card">
            <h3>Direction</h3>
            <p>A product narrative and structure that unifies your team and accelerates decisions.</p>
          </div>
          <div className="services-what-card">
            <h3>Momentum</h3>
            <p>Prototypes, flows, and systems that turn ideas into something testable, pitchable, and buildable.</p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 90-Day Program Section */}
      <section className="content-section">
        <h2 className="section-header">Together, We&apos;ll Define Your Direction</h2>
        <div className="services-program-box">
          <h3>90-Day Product Program</h3>
          <p>
            A focused engagement designed to define your ICP, sharpen your value proposition, and produce a testable product direction that moves your company forward.
          </p>
          <ul className="services-program-list">
            <li>ICP + problem definition</li>
            <li>Product narrative that makes sense</li>
            <li>UX flows for your core value</li>
            <li>A high-fidelity prototype</li>
            <li>User insight sessions</li>
            <li>A 90-day execution plan</li>
          </ul>
          <p className="services-outcome">
            You leave with a product direction you can pitch, validate, and build with confidence.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Impact Stats Section */}
      <section className="content-section">
        <h2 className="section-header">Impact I&apos;ve Been Part Of</h2>
        <div className="services-stats-grid">
          <div className="services-stat-card">
            <div className="services-stat-number">30+</div>
            <div className="services-stat-label">International Awards</div>
          </div>
          <div className="services-stat-card">
            <div className="services-stat-number">10M+</div>
            <div className="services-stat-label">Users Reached</div>
          </div>
          <div className="services-stat-card">
            <div className="services-stat-number">$2M+</div>
            <div className="services-stat-label">Raised Pre-Seed</div>
          </div>
          <div className="services-stat-card">
            <div className="services-stat-number">8+</div>
            <div className="services-stat-label">Enterprise Clients Signed</div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Insights for Founders Section - Startup-tagged posts only */}
      <section className="content-section">
        <div className="section-heading">
          <h2 className="section-header">Insights for Founders</h2>
          <p className="section-subtitle">
            Thoughts on clarity, product direction, and the decisions that shape early teams.
          </p>
        </div>
        {startupPosts.length > 0 ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {startupPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  subtitle={post.subtitle}
                  date={post.date}
                  tags={post.tags}
                  image={post.headerImage || ''}
                  variant="home"
                />
              ))}
            </div>
            <Link href="/blog?tag=Startups" className="blog-cta">
              Explore All Startup Posts →
            </Link>
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            No startup-focused posts available yet.
          </p>
        )}
      </section>

      <div className="section-divider" />

      {/* Contact Section */}
      <section id="contact" className="content-section">
        <h2 className="section-header">Let&apos;s Work Together</h2>
        <p className="section-subtitle" style={{ marginBottom: '24px' }}>
          If you&apos;re navigating early ambiguity and want a clearer path forward, I&apos;d love to talk.
        </p>
        <div className="services-contact-grid">
          <a href="mailto:liamstoica@gmail.com" className="services-contact-card">
            <div className="services-contact-icon">
              <Mail size={24} color="#FFA500" />
            </div>
            <div className="services-contact-content">
              <h4>Email</h4>
              <p>liamstoica@gmail.com</p>
            </div>
          </a>
          <a 
            href="https://www.linkedin.com/in/liam-stoica/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="services-contact-card"
          >
            <div className="services-contact-icon">
              <Linkedin size={24} color="#FFA500" />
            </div>
            <div className="services-contact-content">
              <h4>LinkedIn</h4>
              <p>Connect with me</p>
            </div>
          </a>
        </div>

        {/* Bottom Availability Badge */}
        <div style={{ marginTop: '32px' }}>
          <div className="services-availability-badge">
            Currently accepting 1–2 advisory partners Q1 2025.
          </div>
        </div>
      </section>
    </div>
  )
}
