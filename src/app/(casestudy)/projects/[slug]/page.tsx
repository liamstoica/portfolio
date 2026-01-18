'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, ReactNode } from 'react'
import { getProjectBySlug, type Project } from '@/lib/data'

// Case study components
import {
  CaseHeader,
  HeroMedia,
  HeaderContent,
  ImageSection,
  PISOSection,
  ContentImageSection,
  BulletContentSection,
  CardSection,
  ResultsStats,
  TabbedSection,
  CaseStudyMoreProjects,
  // Legacy for fallback
  CaseHero,
  Body,
  SectionWrapper,
  LabeledSection,
} from '@/components/casestudy'

/* ============================================
   SECTION TYPES - Define all possible section types
   ============================================ */

type SectionType =
  | 'hero-media'
  | 'header-content'
  | 'image-block'
  | 'piso'
  | 'content-image'
  | 'bullet-content'
  | 'card-section'
  | 'results-stats'
  | 'tabbed'
  | 'more-projects'

interface BaseSection {
  id: string
  type: SectionType
}

interface HeroMediaSection extends BaseSection {
  type: 'hero-media'
  src: string
  alt: string
  mediaType?: 'image' | 'video'
}

interface HeaderContentSection extends BaseSection {
  type: 'header-content'
  title: string
  subtitle?: string
  date?: string
  collaborators?: string
  role?: string
  align?: 'left' | 'center'
}

interface ImageBlockSection extends BaseSection {
  type: 'image-block'
  src: string
  alt: string
  caption?: string
}

interface PISOItem {
  label: string
  content: ReactNode
}

interface PISOSectionData extends BaseSection {
  type: 'piso'
  items: PISOItem[]
}

interface ContentImageData extends BaseSection {
  type: 'content-image'
  title: string
  body: string
  imageSrc?: string
  imageAlt?: string
}

interface BulletContentData extends BaseSection {
  type: 'bullet-content'
  title: string
  bullets: string[]
  imageSrc?: string
  imageAlt?: string
}

interface CardData {
  imageSrc: string
  title: string
  description: string
}

interface CardSectionData extends BaseSection {
  type: 'card-section'
  title?: string
  cards: CardData[]
}

interface StatData {
  value: string
  label: string
}

interface ResultsStatsData extends BaseSection {
  type: 'results-stats'
  title?: string
  stats: StatData[]
}

interface TabImage {
  src: string
  caption?: string
}

interface TabData {
  id: string
  label: string
  images: TabImage[]
}

interface TabbedSectionData extends BaseSection {
  type: 'tabbed'
  title?: string
  tabs: TabData[]
}

interface MoreProjectsSection extends BaseSection {
  type: 'more-projects'
}

type CaseStudySection =
  | HeroMediaSection
  | HeaderContentSection
  | ImageBlockSection
  | PISOSectionData
  | ContentImageData
  | BulletContentData
  | CardSectionData
  | ResultsStatsData
  | TabbedSectionData
  | MoreProjectsSection

/* ============================================
   SECTION RENDERER - Renders each section by type
   ============================================ */

function renderSection(section: CaseStudySection, currentSlug: string): ReactNode {
  switch (section.type) {
    case 'hero-media':
      return (
        <HeroMedia
          key={section.id}
          src={section.src}
          alt={section.alt}
          type={section.mediaType}
        />
      )

    case 'header-content':
      return (
        <HeaderContent
          key={section.id}
          title={section.title}
          subtitle={section.subtitle}
          date={section.date}
          collaborators={section.collaborators}
          role={section.role}
          align={section.align}
        />
      )

    case 'image-block':
      return (
        <ImageSection
          key={section.id}
          src={section.src}
          alt={section.alt}
          caption={section.caption}
        />
      )

    case 'piso':
      return <PISOSection key={section.id} items={section.items} />

    case 'content-image':
      return (
        <ContentImageSection
          key={section.id}
          title={section.title}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
        >
          <p>{section.body}</p>
        </ContentImageSection>
      )

    case 'bullet-content':
      return (
        <BulletContentSection
          key={section.id}
          title={section.title}
          bullets={section.bullets}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
        />
      )

    case 'card-section':
      return (
        <CardSection
          key={section.id}
          title={section.title}
          cards={section.cards}
        />
      )

    case 'results-stats':
      return (
        <ResultsStats
          key={section.id}
          title={section.title}
          stats={section.stats}
        />
      )

    case 'tabbed':
      return (
        <section key={section.id} className="w-full max-w-[1600px] mx-auto px-3 md:px-4 lg:px-6 py-16 md:py-24">
          <TabbedSection title={section.title} tabs={section.tabs} />
        </section>
      )

    case 'more-projects':
      return <CaseStudyMoreProjects key={section.id} currentSlug={currentSlug} />

    default:
      return null
  }
}

/* ============================================
   HARD ROCK WEB PROJECT - SECTION CONFIGURATION
   ============================================
   
   To reorder sections: simply move objects within this array.
   Each section is independent and can be placed in any order.
   
   ============================================ */

const hardRockSections: CaseStudySection[] = [
  // 1. HERO MEDIA - Full viewport image, no overlay, rounded corners
  {
    id: 'hero-media',
    type: 'hero-media',
    src: '/images/hard-rock-web/hero-new.png',
    alt: 'Hard Rock Global Web Platform',
    mediaType: 'image',
  },

  // 2. HEADER CONTENT - Title, subtitle, metadata with icons
  {
    id: 'header-content',
    type: 'header-content',
    title: "One brand shouldn't feel like thirty websites",
    subtitle: "Hard Rock’s digital presence had become a patchwork of legacy microsites, siloed lines of business, and outdated patterns. What should have felt like a single global brand instead felt fragmented, text heavy, and difficult to navigate, especially on mobile.",
    date: 'Apr 2024 - Present',
    collaborators: 'Lead UX/UI Designer',
    align: 'center',
  },

  // 3. STANDARD IMAGE SECTION (16:9)
  {
    id: 'image-ecosystem',
    type: 'image-block',
    src: '/images/hard-rock-web/mockup-ui4.png',
    alt: 'Hard Rock mockup',
  },

  // 4. PISO - Problem / Impact / Strategy / Outcome
  {
    id: 'piso',
    type: 'piso',
    items: [
      {
        label: 'Problem',
        content: "Hard Rock’s web ecosystem evolved in isolation across resorts, casinos, cafes, entertainment, and retail. Local optimization came at the cost of the global journey. Navigation buried high intent actions, property discovery broke across domains, and inconsistency eroded trust at scale. This was not a visual problem. It was a systems problem.",
      },
      {
        label: 'Strategy',
        content: 'Unify the ecosystem without flattening local identity. Build a shared architecture that simplifies discovery, supports cross property movement, and surfaces key actions where attention naturally lands. Reduce brand noise where it interferes with clarity and conversion.',
      },
      {
        label: 'Outcomes',
        content: 'A single, scalable platform now supports 30 plus brands and more than 100M annual visits through one cohesive experience. Navigation, performance, and clarity improved across mobile first journeys.',
      },
      {
        label: 'Impact',
        content: 'The platform establishes a reference architecture for all future launches, including the Las Vegas flagship. It aligns corporate and property teams, reduces long term design debt, and enables Hard Rock to scale digitally without redesigning itself each time it grows.',
      },
    ],
  },

  // 5. CONTENT + IMAGE SECTION #1
  {
    id: 'content-unified',
    type: 'content-image',
    title: 'From silos to a shared ecosystem',
    body: 'Hard Rock did not lack content. It lacked cohesion. Independent systems forced users to re learn navigation patterns and hierarchy at every step. The redesign stitched experiences together through shared patterns, consistent structure, and a common navigation language that works globally while still supporting local expression.',
    imageSrc: '/images/hard-rock-web/silo-unify.png',
    imageAlt: 'Hard Rock ecosystem overview',
  },
  // 5. CONTENT + IMAGE SECTION #1
  {
    id: 'content-unified',
    type: 'content-image',
    title: 'Orientation builds trust',
    body: 'Users needed to understand where they were, what they could do, and what mattered most within seconds. Layouts and navigation were restructured to surface essential cues earlier, reduce cognitive load, and make movement across properties feel deliberate rather than accidental.',
    imageSrc: '/images/hard-rock-web/strat-arch2.webp',
    imageAlt: 'Hard Rock ecosystem overview',
  },

  // 6. CARD SECTION (4 cards)
  {
    id: 'cards-features',
    type: 'card-section',
    title: 'Strategic bets that shaped the platform',
    cards: [
      {
        imageSrc: '/images/hard-rock-web/strat-arch1.webp',
        title: 'One global architecture',
        description: "Users should move fluidly across resorts, casinos, cafes, entertainment, retail and properties without re-learning the interface.",
      },
      {
        imageSrc: '/images/hard-rock-web/strat-arch6.png',
        title: 'Visibility beats volume',
        description: 'Key actions needed to surface where attention naturally lands, not buried in content density but appearing at certain anchors as sticky actions.',
      },
      {
        imageSrc: '/images/hard-rock-web/hero1.png',
        title: 'Performance is part of the experience',
        description: 'Mobile first speed and responsiveness made the platform feel modern, reliable, and easier to trust.',
      },
      {
        imageSrc: '/images/hard-rock-web/strat5.png',
        title: 'Designed for global discovery',
        description: 'Maps, navigation, and hierarchy make it easy to explore across destinations and experiences from the start.',
      },
    ],
  },

  // 7. CONTENT + IMAGE SECTION #2
  {
    id: 'content-discovery',
    type: 'content-image',
    title: 'Designing through constant complexity',
    body: 'This work required balancing corporate vision with property level priorities while operating within an active CMS migration and inherited technical constraints. Progress depended less on perfect solutions and more on alignment. Trust was built by making decisions visible, framing tradeoffs clearly, and aligning stakeholders around shared principles rather than preferences.',
    imageSrc: '/images/hard-rock-web/retrospective3.png',
    imageAlt: 'Hard Rock navigation system',
  },

  // 9. RESULTS STATS
  {
    id: 'results',
    type: 'results-stats',
    title: 'Some early results',
    stats: [
      { value: '100M+', label: 'Annual visits through one cohesive experience' },
      { value: '30+', label: 'Properties unified under one design system' },
      { value: '3x', label: 'Projected increase in experiences per guest' },
      { value: '+22%', label: 'Projected lift in direct bookings' },
    ],
  },

  // 11. TABBED SECTION - Process
  {
    id: 'tabs-process',
    type: 'tabbed',
    title: 'Dig into the details',
    tabs: [
      {
        id: 'brand',
        label: 'Brand',
        images: [
          { src: '/images/hard-rock-web/brand1.png', caption: 'The brand homepage became a true front door, guiding users into all Hard Rock experiences instead of routing them into isolated silos.' },
          { src: '/images/hard-rock-web/strat-arch3.png', caption: 'Navigation shifted from a text heavy list to a visual discovery surface that highlights high interest touchpoints and drives engagement.' },
          { src: '/images/hard-rock-web/strat-exp3.png', caption: 'Real signals like reviews and social content replaced staged moments to build trust earlier and support confident decisions.' },
        ],
      },
      {
        id: 'resorts',
        label: 'Resorts',
        images: [
          { src: '/images/hard-rock-web/highlight-map.webp', caption: 'A global map enabled fast comparison across destinations, with location cards surfacing key differentiators at a glance.' },
          { src: '/images/hard-rock-web/resorts2.png', caption: 'Offers were redesigned to be clear, scannable, and actionable, helping users quickly understand value and move forward.' },
          { src: '/images/hard-rock-web/resorts3.png', caption: 'A consistent resort structure across brands reduced friction while allowing each property to express its local character.' },
        ],
      },
      {
        id: 'shows',
        label: 'Shows',
        images: [
          { src: '/images/hard-rock-web/event1.png', caption: 'Key information and actions were surfaced upfront to support faster, more confident ticket decisions.' },
          { src: '/images/hard-rock-web/event31.png', caption: 'Clear visual states set expectations across presales, announcements, and changes, reducing confusion before booking.' },
          { src: '/images/hard-rock-web/event2.png', caption: 'Filtering and search were optimized to help users find relevant events quickly with ease.' },
        ],
      },
      {
        id: 'cafes',
        label: 'Cafes',
        images: [
          { src: '/images/hard-rock-web/cafe1.webp', caption: 'A map and list hybrid made it easy to find nearby cafes and take action in just a few taps.' },
          { src: '/images/hard-rock-web/strat-exp4.png', caption: 'Menus became structured, location aware experiences instead of static PDFs, improving clarity and accuracy.' },
          { src: '/images/hard-rock-web/cafe3.png', caption: 'Simplifying online ordering and booking table conversion flows was a key focus to ensure a simple and consistent experience.' },
        ],
      },
      {
        id: 'casinos',
        label: 'Casinos',
        images: [
          { src: '/images/hard-rock-web/casino1.png', caption: 'Promotion listings & detail pages were simplified and structured to make complex incentives easy to find, understand and act on.' },
          { src: '/images/hard-rock-web/casino2.png', caption: 'Casino experiences across Hard Rock and Seminole were unified under a shared framework to create familiarity and ease of use.' },
          { src: '/images/hard-rock-web/casino3.png', caption: 'Dynamic elements like jackpots and countdowns brought real time energy into the experience and encouraged continued play.' },
        ],
      },
      {
        id: 'systems',
        label: 'Systems',
        images: [
          { src: '/images/hard-rock-web/strat-des1.webp', caption: 'All brands were built on a single design system to ensure consistency and speed without sacrificing flexibility.' },
          { src: '/images/hard-rock-web/strat-des4.png', caption: 'The web experience was aligned with the HRX app to create familiarity across platforms.' },
          { src: '/images/hard-rock-web/deliver-hero.png', caption: 'Responsive behavior and design tokens enabled the system to scale across devices and future brand needs.' },
        ],
      },
    ],
  },

  // 7. CONTENT + IMAGE SECTION #2
  {
    id: 'content-discovery',
    type: 'content-image',
    title: 'My retrospective',
    body: 'This project reinforced that architecture decisions outlive visual ones and that stakeholder alignment is a core design skill. Scaling design required clarity, patience, and shared ownership. If revisiting this work, analytics would be integrated earlier to validate directional bets faster. The next focus is redesigning booking flows and member experiences on top of the foundation established here.',
    imageSrc: '/images/hard-rock-web/booking2.png',
    imageAlt: 'Hard Rock navigation system',
  },

  // 12. MORE PROJECTS
  {
    id: 'more-projects',
    type: 'more-projects',
  },
]

/* ============================================
   PAGE COMPONENT
   ============================================ */

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const found = getProjectBySlug(slug)
    if (!found) {
      router.push('/')
      return
    }
    setProject(found)
  }, [slug, router])

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  // ==========================================
  // HARD ROCK WEB PROJECT - Array-driven rendering
  // ==========================================
  if (slug === 'hard-rock-web') {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Fixed header */}
        <CaseHeader projectName="Hard Rock: Global Web Platform" />

        {/* Render sections from array */}
        {hardRockSections.map((section) => renderSection(section, slug))}
      </div>
    )
  }

  // ==========================================
  // FALLBACK FOR OTHER PROJECTS
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <CaseHeader />

      <CaseHero
        title={project.title}
        subtitle={project.description}
      />

      <SectionWrapper maxWidth="content" padding="normal">
        <LabeledSection label="Overview">
          <Body>
            This case study is being updated. Check back soon for the full story.
          </Body>
        </LabeledSection>
      </SectionWrapper>

      <CaseStudyMoreProjects currentSlug={slug} />
    </div>
  )
}
