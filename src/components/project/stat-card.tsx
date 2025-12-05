'use client'

interface StatCardProps {
  stat: string
  label: string
}

export function StatCard({ stat, label }: StatCardProps) {
  return (
    <div className="stat-card">
      <p className="stat-value">{stat}</p>
      <p className="stat-label">{label}</p>
    </div>
  )
}

interface StatGridProps {
  stats: { stat: string; label: string }[]
}

export function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="stat-grid">
      {stats.map((item, index) => (
        <StatCard key={index} stat={item.stat} label={item.label} />
      ))}
    </div>
  )
}











