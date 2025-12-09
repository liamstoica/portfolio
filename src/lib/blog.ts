import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  subtitle?: string
  date: string
  tags: string[]
  headerImage?: string
  content: string
}

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
        tags: data.tags || [],
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

export function getAllBlogTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

// Case-insensitive tag filtering, sorted newest first
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts()
  const tagLower = tag.toLowerCase()
  return posts.filter((p) => 
    p.tags.some((t) => t.toLowerCase() === tagLower)
  )
}

// Get posts matching "Startup" or "Startups" tag (case-insensitive)
export function getStartupPosts(count?: number): BlogPost[] {
  const posts = getAllPosts()
  const startupPosts = posts.filter((p) =>
    p.tags.some((t) => {
      const tagLower = t.toLowerCase()
      return tagLower === 'startup' || tagLower === 'startups'
    })
  )
  return count ? startupPosts.slice(0, count) : startupPosts
}
