import { getAllPosts } from '@/lib/blog'
import BlogClient from './BlogClient'

export const metadata = {
  title: 'Blog | Liam Stoica',
  description: 'Ideas on product, design, and early-stage strategy.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogClient posts={posts} />
}


