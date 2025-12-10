import { getAllPosts } from '@/lib/blog'
import BlogClient from './BlogClient'

export const metadata = {
  title: 'Blog | Liam Stoica',
  description: 'My perpsectives on product, design, and strategy shaped through my experiences.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogClient posts={posts} />
}




