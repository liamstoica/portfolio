export default function CaseStudyLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Full-width layout - no page-bg, content-first immersive experience */}
      <div className="relative min-h-screen bg-[#0a0a0a]">
        {children}
      </div>
    </>
  )
}



