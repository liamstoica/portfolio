'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'

interface BlogCardProps {
  title: string
  subtitle?: string
  date: string
  tags: string[]
  image: string
  slug: string
  variant?: 'home'
}

export function BlogCard({
  title,
  subtitle,
  date,
  tags,
  image,
  slug,
  variant,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Tag style - subtle grey (not white)
  const tagStyle: React.CSSProperties = {
    fontSize: '11px',
    padding: '3px 10px',
    borderRadius: '12px',
    backgroundColor: 'rgba(86, 89, 123, 0.18)',
    color: 'var(--blog-tag-color, #555)',
  }

  // Homepage variant: image LEFT, content RIGHT
  if (variant === 'home') {
    return (
      <Link
        href={`/blog/${slug}`}
        className="blog-card blog-card-home"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          borderRadius: '12px',
          border: '1px solid var(--border-light)',
          backgroundColor: 'var(--card-bg, #fff)',
          textDecoration: 'none',
          color: 'inherit',
          overflow: 'hidden',
          transition: 'box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
          // Check if dark mode based on document
          const isDark = document.documentElement.classList.contains('dark')
          e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = 'var(--border-light)'
        }}
      >
        {/* Image - edge to edge, no padding */}
        <div
          className="blog-card-image-container"
          style={{
            position: 'relative',
            width: '160px',
            minWidth: '160px',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-muted, #f5f5f5)',
          }}
        >
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="160px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--bg-muted, #e5e5e5)' }} />
          )}
        </div>
        <div
          className="blog-card-content-right"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            minWidth: 0,
            padding: '16px 16px 16px 16px',
          }}
        >
          <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 600, lineHeight: 1.3 }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {subtitle}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <Calendar size={14} />
              {formattedDate}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {tags.slice(0, 2).map((tag) => (
                <span key={tag} style={tagStyle}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Default variant (listing): image TOP, content BELOW
  // Date and tags on SEPARATE lines
  return (
    <Link
      href={`/blog/${slug}`}
      className="blog-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        border: '1px solid var(--border-light)',
        backgroundColor: 'var(--card-bg, #fff)',
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
        transition: 'box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
        const isDark = document.documentElement.classList.contains('dark')
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'var(--border-light)'
      }}
    >
      {/* Image - full width, edge to edge */}
      <div
        className="blog-card-image-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '180px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-muted, #f5f5f5)',
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--bg-muted, #e5e5e5)' }} />
        )}
      </div>
      <div
        className="blog-card-content"
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, lineHeight: 1.3 }}>
          {title}
        </h3>
        {/* Date on its own line with calendar icon */}
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <Calendar size={14} />
          {formattedDate}
        </span>
        {/* Tags on separate line */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
