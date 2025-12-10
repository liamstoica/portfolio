export interface BlogPost {
  slug: string
  title: string
  subtitle?: string
  date: string
  category: string[]
  industry: string[]
  headerImage?: string
  content?: string
}
