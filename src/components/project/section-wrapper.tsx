'use client'

interface SectionWrapperProps {
  id?: string
  pill?: string
  title: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, pill, title, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`project-section ${className}`}>
      {pill && (
        <span className="section-pill">{pill}</span>
      )}
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}











