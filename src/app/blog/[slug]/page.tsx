import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { BlogContent } from '@/components/ui/blog-content'
import { BlogCard } from '@/components/ui/blog-card'
import { ArrowLeft, Calendar } from 'lucide-react'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: `${post.title} | Liam Stoica`,
    description: post.subtitle || post.title,
  }
}

// Strip title AND subtitle from markdown content to prevent duplication
function stripDuplicateTitleFromContent(content: string, title: string, subtitle?: string): string {
  const lines = content.split('\n')
  const filteredLines: string[] = []
  let titleRemoved = false
  let subtitleRemoved = false

  for (const line of lines) {
    const trimmedLine = line.trim()

    // Remove h1 matching title
    if (!titleRemoved && trimmedLine.startsWith('# ')) {
      const h1Content = trimmedLine.substring(2).trim()
      if (h1Content.toLowerCase() === title.toLowerCase()) {
        titleRemoved = true
        continue
      }
    }

    // Remove h3 matching subtitle (### Subtitle format)
    if (subtitle && !subtitleRemoved && trimmedLine.startsWith('### ')) {
      const h3Content = trimmedLine.substring(4).trim()
      if (h3Content.toLowerCase() === subtitle.toLowerCase()) {
        subtitleRemoved = true
        continue
      }
    }

    // Also check for plain text subtitle on its own line (non-header format)
    if (subtitle && !subtitleRemoved) {
      if (trimmedLine.toLowerCase() === subtitle.toLowerCase()) {
        subtitleRemoved = true
        continue
      }
    }

    filteredLines.push(line)
  }

  let result = filteredLines.join('\n')
  // Clean up leading empty lines
  result = result.replace(/^\s*\n+/, '')

  return result
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get 2 most recent posts excluding current
  const allPosts = getAllPosts()
  const morePosts = allPosts
    .filter((p) => p.slug !== params.slug)
    .slice(0, 2)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const cleanedContent = stripDuplicateTitleFromContent(
    post.content ?? '',
    post.title ?? '',
    post.subtitle ?? ''
  )

  return (
    <div className="card-container">
      {/* Header with back button and theme toggle */}
      <header style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link 
            href="/blog" 
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

      {/* Article content container */}
      <article style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          margin: '0 0 12px 0',
          letterSpacing: '-0.02em',
        }}>
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="subtitle" style={{
            fontSize: '1.125rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            margin: '0 0 16px 0',
          }}>
            {post.subtitle}
          </p>
        )}

        {/* Date + Tags row */}
        <div className="meta" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: 'var(--text-muted)',
          }}>
            <Calendar size={16} />
            {formattedDate}
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {post.category.map((cat) => (
              <span
                key={`cat-${cat}`}
                style={{
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 200, 0, 0.15)',
                  color: '#D4A800',
                  fontWeight: 500,
                }}
              >
                {cat}
              </span>
            ))}
            {post.industry.map((ind) => (
              <span
                key={`ind-${ind}`}
                style={{
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(0, 170, 255, 0.15)',
                  color: '#0095E0',
                  fontWeight: 500,
                }}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Header Image - INSIDE content container, BELOW metadata */}
        {post.headerImage && (
          <div 
            className="blog-header-image-container"
            style={{
              position: 'relative',
              width: '100%',
              marginBottom: '32px',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-muted, #f5f5f5)',
            }}
          >
            <Image
              src={post.headerImage}
              alt={post.title}
              width={720}
              height={400}
              style={{ 
                width: '100%', 
                height: 'auto', 
                objectFit: 'cover',
                display: 'block',
              }}
              priority
            />
          </div>
        )}

        {/* Markdown content with prose styling */}
        <BlogContent content={cleanedContent} />
      </article>

      {/* More Blog Posts Section */}
      {morePosts.length > 0 && (
        <>
          <div className="section-divider" style={{ marginTop: '56px', marginBottom: '32px' }} />
          
          <section style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}>
              More Blog Posts
            </h2>
            
            {/* 2-column grid on desktop, 1 column on mobile */}
            <div 
              className="more-posts-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: '24px',
              }}
            >
              <style>{`
                @media (min-width: 640px) {
                  .more-posts-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                  }
                }
              `}</style>
              {morePosts.map((p) => (
                <BlogCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  date={p.date}
                  category={p.category}
                  industry={p.industry}
                  image={p.headerImage || ''}
                />
              ))}
            </div>

            {/* CTA - left aligned, orange */}
            <div style={{ marginTop: '24px' }}>
              <style>{`
                .more-posts-cta {
                  display: inline-flex;
                  align-items: center;
                  color: #FFA500;
                  text-decoration: none;
                  font-size: 15px;
                  font-weight: 500;
                  transition: opacity 0.15s ease;
                }
                .more-posts-cta:hover {
                  opacity: 0.8;
                  text-decoration: none;
                }
              `}</style>
              <Link href="/blog" className="more-posts-cta">
                View All Blog Posts →
              </Link>
            </div>
          </section>
        </>
      )}
      
    </div>
  )
}
