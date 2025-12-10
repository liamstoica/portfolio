import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/types/blog'

// Prevent Next.js from treating this as a Server Action
export const runtime = 'nodejs';
export const dynamic = 'force-static';

// Re-export the type for server components
export type { BlogPost }

const blogDirectory = path.join(process.cwd(), 'src/content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug: data.slug || slug,
        title: data.title || '',
        subtitle: data.subtitle,
        date: data.date || '',
        category: data.category || [],
        industry: data.industry || [],
        headerImage: data.headerImage || undefined,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) || null
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  const posts = getAllPosts()
  return posts.slice(0, count)
}

export function getAllBlogCategories(): string[] {
  const posts = getAllPosts()
  const categorySet = new Set<string>()
  posts.forEach((p) => p.category.forEach((cat) => categorySet.add(cat)))
  return Array.from(categorySet).sort()
}

export function getAllBlogIndustries(): string[] {
  const posts = getAllPosts()
  const industrySet = new Set<string>()
  posts.forEach((p) => p.industry.forEach((ind) => industrySet.add(ind)))
  return Array.from(industrySet).sort()
}

// Filter posts by category (case-insensitive)
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts()
  const categoryLower = category.toLowerCase()
  return posts.filter((p) => 
    p.category.some((c) => c.toLowerCase() === categoryLower)
  )
}

// Filter posts by industry (case-insensitive)
export function getPostsByIndustry(industry: string): BlogPost[] {
  const posts = getAllPosts()
  const industryLower = industry.toLowerCase()
  return posts.filter((p) => 
    p.industry.some((i) => i.toLowerCase() === industryLower)
  )
}

// Get posts matching "Startup" or "Startups" industry (case-insensitive)
export function getStartupPosts(count?: number): BlogPost[] {
  const posts = getAllPosts()
  const startupPosts = posts.filter((p) =>
    p.industry.some((i) => {
      const indLower = i.toLowerCase()
      return indLower === 'startup' || indLower === 'startups'
    })
  )
  return count ? startupPosts.slice(0, count) : startupPosts
}
