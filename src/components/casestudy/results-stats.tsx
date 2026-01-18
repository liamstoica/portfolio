'use client'

interface Stat {
  value: string
  label: string
}

interface ResultsStatsProps {
  title?: string
  stats: Stat[]
}

/**
 * ResultsStatsSection
 * - 3-4 stats in a row on desktop
 * - Stacked on mobile
 * - Big number with label underneath
 */
export function ResultsStats({ title, stats }: ResultsStatsProps) {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
      {/* Title */}
      {title && (
        <h2 className="font-serif text-2xl md:text-3xl italic text-white text-center mb-12">
          {title}
        </h2>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-white mb-3">
              {stat.value}
            </div>
            <div className="text-sm text-neutral-400 leading-relaxed">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
