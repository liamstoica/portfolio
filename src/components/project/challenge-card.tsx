'use client'

interface ChallengeCardProps {
  title: string
  copy: string
}

export function ChallengeCard({ title, copy }: ChallengeCardProps) {
  return (
    <div className="challenge-card">
      <h3 className="challenge-card-title">{title}</h3>
      <p className="challenge-card-copy">{copy}</p>
    </div>
  )
}

interface ChallengeGridProps {
  challenges: ChallengeCardProps[]
}

export function ChallengeGrid({ challenges }: ChallengeGridProps) {
  return (
    <div className="challenge-grid">
      {challenges.map((item, index) => (
        <ChallengeCard key={index} {...item} />
      ))}
    </div>
  )
}











