'use client'

interface StatHighlightProps {
  stat: string
  label: string
  source?: string
  className?: string
}

export function StatHighlight({ stat, label, source, className = '' }: StatHighlightProps) {
  return (
    <div className={`${className}`}>
      <p className="font-serif text-3xl md:text-4xl italic text-[#8B1538]">
        {label} <span className="text-white">{stat}</span>
      </p>
      {source && (
        <a
          href="#"
          className="text-sm text-neutral-500 underline underline-offset-2 hover:text-neutral-400 mt-2 inline-block"
        >
          {source}
        </a>
      )}
    </div>
  )
}











