'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { BlogCard } from '@/components/ui/blog-card'
import { ArrowLeft } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'

const FILTER_TAGS = ['AI', 'Startups', 'Design Leadership', 'Ideas']

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? posts.filter((p) =>
        p.tags.some(
          (tag) =>
            tag.toLowerCase().includes(selectedTag.toLowerCase()) ||
            selectedTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    : posts

  // Filter button styles - Orange (#FFA500)
  const getFilterStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    border: '1px solid #FFA500',
    backgroundColor: isActive ? '#FFA500' : 'transparent',
    color: isActive ? '#000' : '#FFA500',
  })

  return (
    <div className="card-container">
      {/* Header - Theme toggle aligned right, matching project detail pages */}
      <header style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
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
              transition: 'color 0.15s ease',
            }}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <ThemeToggle />
        </div>
        {/* Large title matching project detail typography */}
        <h1 style={{ 
          fontSize: 'clamp(1.875rem, 5vw, 2.5rem)', 
          fontWeight: 600, 
          margin: '0 0 10px 0',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}>
          All Blog Posts
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: 'var(--text-muted)', 
          margin: 0,
        }}>
          Ideas on product, design, and early-stage strategy.
        </p>
      </header>

      {/* Filter Bar - Orange Pills (#FFA500) */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        flexWrap: 'wrap',
        padding: '16px 0',
        marginBottom: '8px',
      }}>
        <button
          onClick={() => setSelectedTag(null)}
          style={getFilterStyle(!selectedTag)}
          onMouseEnter={(e) => {
            if (selectedTag) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 165, 0, 0.15)'
            }
          }}
          onMouseLeave={(e) => {
            if (selectedTag) {
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        >
          All
        </button>
        {FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            style={getFilterStyle(selectedTag === tag)}
            onMouseEnter={(e) => {
              if (selectedTag !== tag) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 165, 0, 0.15)'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTag !== tag) {
                e.currentTarget.style.backgroundColor = 'transparent'
              }
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Listing Grid - 3 cols desktop, 2 tablet, 1 mobile, 20px gap */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '20px',
      }}
      className="blog-grid"
      >
        <style>{`
          @media (min-width: 640px) {
            .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (min-width: 1024px) {
            .blog-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
        `}</style>
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            date={post.date}
            tags={post.tags}
            image={post.headerImage || ''}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>No posts found for this filter.</p>
          <button 
            onClick={() => setSelectedTag(null)} 
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid #FFA500',
              backgroundColor: 'transparent',
              color: '#FFA500',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 165, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
