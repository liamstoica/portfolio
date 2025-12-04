'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { getSandboxItemBySlug, type SandboxItem } from '@/lib/data'
import { ArrowLeft } from 'lucide-react'
import Image from "next/image";

export default function SandboxPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [item, setItem] = useState<SandboxItem | null>(null)

  useEffect(() => {
    const found = getSandboxItemBySlug(slug)
    if (!found) {
      router.push('/')
      return
    }
    setItem(found)
  }, [slug, router])

  if (!item) {
    return (
      <div className="card-container" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '32px', height: '32px', border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  return (
    <div className="card-container" style={{ maxWidth: '720px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Title */}
      <div className="mb-8">
        <p style={{ fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px' }}>
          🧪 Sandbox #1: Sep 2025
        </p>
        <h1 className="display-name" style={{ fontSize: '24px', marginBottom: '12px' }}>
          {item.title}
        </h1>
        <p className="body-text">
          Multiple user profiles for the iPhone. Phones are cluttered. Work, personal, and side projects collide. What if iPhones had separate profiles to keep everything organized?
        </p>
      </div>

      {/* Hero Image */}
        <div 
          style={{ 
          width: "100%", 
          borderRadius: "16px", 
          overflow: "hidden", 
          marginBottom: "48px" 
          }}
         >
       <Image
          src="/images/sandbox/apple/apple-profiles-hero.png"
          alt={item.title}
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          priority
         />
       </div>


      {/* Content */}
      <article>
        <section className="mb-10">
          <h2 className="section-label">The Idea</h2>
          <p className="body-text">
            Phones today blend work, personal life, and side projects into one chaotic space. Apps overlap. Notifications interrupt focus. Accounts mix. Context switching becomes exhausting.
          </p>
          <p className="body-text" style={{ marginTop: '16px' }}>
            This exploration imagines a version of the iPhone that works more like a MacBook: separate user profiles for separate parts of life — Work Mode, Personal Mode, Side Project Mode — each isolated with its own apps, accounts, and notification rules.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="section-label">The Process</h2>
          <p className="body-text">
            This concept grew out of a real problem.
          </p>
          <p className="body-text" style={{ marginTop: '16px' }}>
            At Hard Rock International, the security team restricted access on personal devices — no Slack, Teams, or email allowed. I suddenly had two lives on two devices: work and personal. It revealed how much friction comes from forcing everything into a single phone.
          </p>
          <p className="body-text" style={{ marginTop: '16px', marginBottom: '24px' }}>
            The process included:
          </p>
          <ul className="body-text" style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            <li style={{ marginBottom: '8px' }}>• Observing daily friction caused by mixed contexts</li>
            <li style={{ marginBottom: '8px' }}>• Exploring how a multi-profile system could technically work</li>
            <li style={{ marginBottom: '8px' }}>• Designing how users might switch profiles seamlessly</li>
          </ul>
          <div
            style={{
             display: "grid",
             gridTemplateColumns: "repeat(2, 1fr)",
             gap: "16px",
           }}
          >
         {/* Image 1 */}
         <div
           style={{
             width: "100%",
             borderRadius: "16px",
             overflow: "hidden",
             aspectRatio: "1",
           }}
         >
         <Image
          src="/images/sandbox/apple/apple-profiles-1.png"
          alt="Apple profile exploration image 1"
          width={800}
          height={800}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
         />
       </div>

  {/* Image 2 */}
  <div
    style={{
      width: "100%",
      borderRadius: "16px",
      overflow: "hidden",
      aspectRatio: "1",
    }}
  >
    <Image
      src="/images/sandbox/apple/apple-profiles-2.jpg"
      alt="Apple profile exploration image 2"
      width={800}
      height={800}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
 </div>

        </section>

        <section className="mb-10">
          <h2 className="section-label">What I Learned</h2>
          <p className="body-text">
            This exploration revealed that:
          </p>
          <ul className="body-text" style={{ paddingLeft: '20px', marginTop: '16px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>• Profile switching could greatly reduce cognitive load</li>
            <li style={{ marginBottom: '8px' }}>• Many users already hack this with two phones</li>
            <li style={{ marginBottom: '8px' }}>• Apple could realistically integrate this without breaking the ecosystem</li>
            <li>• Yet it introduces questions about complexity, onboarding, security, and Apple&apos;s business incentives</li>
          </ul>
          <p className="body-text">
            It&apos;s a simple idea with deep implications — balancing simplicity and power is where the design challenge lives.
          </p>
        </section>
      </article>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px', marginTop: '40px' }}>
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
