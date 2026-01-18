export default function ShellLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Atmospheric Background */}
      <div className="page-bg" aria-hidden="true" />

      {/* Page Content with vertical padding */}
      <div className="relative min-h-screen py-8 md:py-12 pb-32">
        {children}
      </div>
    </>
  )
}













