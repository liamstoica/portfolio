'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface CaseHeaderProps {
  projectName?: string
}

/**
 * Fixed case study header
 * - Back link (left)
 * - Project name centered
 * - "All Projects" link (right)
 */
export function CaseHeader({ projectName }: CaseHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1480px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        {/* Left: Back link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </Link>

        {/* Center: Project name */}
        {projectName && (
          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-white truncate max-w-[200px] sm:max-w-none">
            {projectName}
          </span>
        )}

        {/* Right: All projects link */}
        <Link
          href="/projects"
          className="text-sm text-neutral-400 hover:text-white transition-colors"
        >
          All Projects
        </Link>
      </div>
    </header>
  )
}
