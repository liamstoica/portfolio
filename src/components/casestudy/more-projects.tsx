'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/lib/data'

interface MoreProjectsProps {
  currentSlug: string
}

// Project images mapping
const projectImages: Record<string, string> = {
  'hrx-experiences-webviews': '/images/hard-rock-app/hrx-hero.png',
  'hard-rock-web': '/images/hard-rock-web/hard-rock-hero.jpg',
  'track-tennis': '/images/track-tennis/track-tennis-hero.png',
}

/**
 * MoreProjectsSection (Case Study variant)
 * - Width matches tabbed section above (max-w-[1600px])
 * - Title on top, cards in middle, CTA at bottom
 * - Clean hover: lift + shadow + image scale only
 * - NO underline, NO text color change on hover
 */
export function CaseStudyMoreProjects({ currentSlug }: MoreProjectsProps) {
  const otherProjects = projects.filter((p) => p.slug !== currentSlug).slice(0, 3)

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 md:px-4 lg:px-6 py-16 md:py-24">
      {/* Title - centered */}
      <h3 className="font-serif text-2xl md:text-3xl italic text-white text-center mb-10">
        More Projects
      </h3>

      {/* Project cards - 3 columns, matches tabbed section grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {otherProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block no-underline hover:no-underline"
          >
            <article className="bg-white/[0.02] rounded-xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-white/15 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
              {/* Image - matches tabbed section aspect ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                <Image
                  src={projectImages[project.slug] || '/images/placeholder.jpg'}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* Content - no hover color changes */}
              <div className="p-5">
                <h4 className="text-base font-medium text-white mb-2">
                  {project.title}
                </h4>
                <p className="text-sm text-neutral-500 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* CTA - bottom center */}
      <div className="text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
        >
          <span>View all projects</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
