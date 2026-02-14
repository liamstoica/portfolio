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
    subtitle: "Hard Rock’s digital presence had become a patchwork of legacy microsites and siloed business lines. What should have felt like a single global brand instead felt fragmented, text heavy, and difficult to navigate, especially on mobile. The cost was not just inconsistency. Fragmentation reduced discovery, buried high intent actions, and limited cross property exploration. This quietly constrained conversion, repeat engagement, and long term value.",
    date: 'Apr 2024 - Present',
    collaborators: 'Lead UX/UI Designer',
    align: 'center',
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

  // 3. STANDARD IMAGE SECTION (16:9)
  {
    id: 'image-ecosystem',
    type: 'image-block',
    src: '/images/hard-rock-web/mockup-ui6.png',
    alt: 'Hard Rock mockup',
  },

  // 4. PISO - Problem / Impact / Strategy / Outcome
  {
    id: 'piso',
    type: 'piso',
    items: [
      {
        label: 'Problem',
        content: "Hard Rock’s web ecosystem evolved independently across resorts, casinos, cafes, entertainment, and retail. Each property optimized locally, but the global journey broke down. As a result, users struggled to discover multiple experiences within a single trip. High intent actions were buried beneath dense navigation. Cross property movement dropped, limiting upsell opportunities and repeat engagement. This was not a visual issue. It was a systems issue that capped revenue opportunity at scale.",
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
        content: 'The platform now serves as the reference architecture for all future launches, including the Las Vegas flagship. It aligns corporate and property teams, reduces long term design debt, and enables Hard Rock to scale digitally without resetting its ecosystem each time it grows.',
      },
    ],
  },

  // 5. CONTENT + IMAGE SECTION #1
  {
    id: 'content-unified',
    type: 'content-image',
    title: 'From silos to a shared ecosystem',
    body: 'Hard Rock did not lack content. It lacked cohesion. Independent systems forced users to restart their journey at every touchpoint, reducing confidence and shortening sessions. The redesign connected experiences through shared patterns, consistent hierarchy, and a common navigation language. Discovery now compounds instead of resetting.',
    imageSrc: '/images/hard-rock-web/silo-unify.png',
    imageAlt: 'Hard Rock ecosystem overview',
  },
  // 5. CONTENT + IMAGE SECTION #1
  {
    id: 'content-unified',
    type: 'content-image',
    title: 'Orientation builds trust',
    body: 'Users needed to understand where they were, what mattered, and what they could do next within seconds. Navigation and layout were restructured to surface primary actions earlier, reduce cognitive load on mobile, and make movement across properties feel intentional. Clarity became the growth lever.',
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
        description: "Fluid movement across resorts, casinos, cafes, entertainment, and retail increases exposure to adjacent experiences and expands trip value.",
      },
      {
        imageSrc: '/images/hard-rock-web/strat-arch7.png',
        title: 'Visibility beats volume',
        description: 'Key actions surface at decision moments rather than being buried in dense content, supporting faster and more confident choices. Primary CTA\'s match across all sites to reinforce brand consistency, and alignment to the right proved increase click through rates.',
      },
      {
        imageSrc: '/images/hard-rock-web/hero1.png',
        title: 'Performance is part of the experience',
        description: 'A fast and reliable interface signals trust. Trust improves conversion.',
      },
      {
        imageSrc: '/images/hard-rock-web/global-map.png',
        title: 'Designed for global discovery',
        description: 'Maps, navigation, and hierarchy work together to make exploration easy from the first interaction.',
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
    body: 'This project reinforced that architecture decisions outlive visual ones and that stakeholder alignment is a core design skill. If revisiting this work, analytics would be integrated earlier to validate directional bets faster. The next focus is redesigning booking flows and member experiences on top of the foundation established here.',
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
   TRACK.TENNIS PROJECT - SECTION CONFIGURATION
   ============================================
   
   To reorder sections: simply move objects within this array.
   Each section is independent and can be placed in any order.
   
   ============================================ */

const trackTennisSections: CaseStudySection[] = [
  // 1. HERO MEDIA - Full viewport image
  {
    id: 'hero-media',
    type: 'hero-media',
    src: '/images/track-tennis/track-hero.png',
    alt: 'Track.Tennis Web Platform',
    mediaType: 'image',
  },

  // 2. HEADER CONTENT - Title, subtitle, metadata
  {
    id: 'header-content',
    type: 'header-content',
    title: "A performance product shouldn't slow players down",
    subtitle: "Track.Tennis began as a broad consumer app built for every type of tennis player. What it needed was focus. When I joined, the experience was fragmented, setup heavy, and constrained by a mobile first model. Starting a recording required QR codes, manual configuration, and staff intervention. What should have supported performance instead introduced friction for players, coaches, and facilities. The cost was adoption. Operational overhead slowed usage, limited scalability, and made it difficult for facilities to reliably monetize or expand beyond tennis.",
    date: '2021—2022',
    collaborators: 'Lead Product Designer',
    align: 'center',
  },

  // 9. RESULTS STATS
  {
    id: 'results',
    type: 'results-stats',
    title: 'Results following our work',
    stats: [
      { value: 'ITA Partner', label: 'official video platform for national collegiate tennis' },
      { value: '40k+ Users', label: 'active across tennis, padel, and pickleball' },
      { value: '1,500+ Cameras', label: 'installed in facilities across the US' },
      { value: '8K+ Events', label: 'streamed in real time in the US' },
    ],
  },

  // 3. STANDARD IMAGE SECTION (16:9)
  {
    id: 'image-platform',
    type: 'image-block',
    src: '/images/track-tennis/highlight1.webp',
    alt: 'Track.Tennis platform overview',
  },

  // 4. PISO - Problem / Strategy / Outcomes / Impact
  {
    id: 'piso',
    type: 'piso',
    items: [
      {
        label: 'Problem',
        content: "Track.Tennis tried to serve everyone and ended up serving no one exceptionally well. The product required manual setup, QR codes, and staff intervention just to start recording. Mobile storage limits slowed performance, and facilities offering multiple racket sports had no scalable way to manage or monetize recordings. This was not a feature gap. It was a focus and delivery problem that limited growth.",
      },
      {
        label: 'Strategy',
        content: 'Narrow the audience, simplify access, and remove operational friction. Shift from a consumer app to a cloud-based B2B platform where facilities manage recording, players access performance data anywhere, and the system scales beyond tennis into padel and pickleball. Design the experience around competitive use cases where accuracy, speed, and reliability matter most.',
      },
      {
        label: 'Outcomes',
        content: 'Track.Tennis evolved into a web-based SaaS platform used by clubs, colleges, and competitive programs. The product eliminated app dependency, reduced setup friction, and expanded support for emerging racket sports. A unified design system and modernized brand positioned the company for institutional partnerships and long term growth.',
      },
      {
        label: 'Impact',
        content: 'The pivot aligned the product with real facility and athlete workflows, unlocked new revenue models, and future-proofed the platform for multi-sport expansion. The redesigned system supported Track.Tennis becoming the official video partner of the Intercollegiate Tennis Association.',
      },
    ],
  },

  // 5. CONTENT + IMAGE SECTION #1
  {
    id: 'content-focus',
    type: 'content-image',
    title: 'From consumer app to performance platform',
    body: 'Track.Tennis did not suffer from lack of ambition. It suffered from lack of focus. By narrowing the audience to competitive players, coaches, and facilities, the product shifted from novelty to necessity. Leading this change required asking a hard question early: do amateur players actually want to analyze their matches at this depth? The answer shaped everything that followed.',
    imageSrc: '/images/track-tennis/highlight2.webp',
    imageAlt: 'Track.Tennis strategic focus',
  },

  // 6. CONTENT + IMAGE SECTION #2
  {
    id: 'content-friction',
    type: 'content-image',
    title: 'Remove friction, unlock adoption',
    body: "Players didn't want to configure technology before every match. Facilities didn't want staff overhead. The new platform removed QR codes and manual setup, allowing matches to be recorded automatically and delivered through the cloud. The experience faded into the background so performance could take center stage.",
    imageSrc: '/images/track-tennis/track-webapp.png',
    imageAlt: 'Track.Tennis friction removal',
  },

  // 7. CARD SECTION (4 cards)
  {
    id: 'cards-strategy',
    type: 'card-section',
    title: 'Strategic bets that shaped the product',
    cards: [
      {
        imageSrc: '/images/track-tennis/details-6.png',
        title: 'Focus beats reach',
        description: 'Serving competitive players and facilities created a clearer product, stronger value, and better adoption.',
      },
      {
        imageSrc: '/images/track-tennis/app3.png',
        title: 'Web over app dependency',
        description: 'Cloud delivery removed storage limits, improved performance, and enabled access across devices without relying on a native app.',
      },
      {
        imageSrc: '/images/track-tennis/strat-2.png',
        title: 'Designed for multi-sport growth',
        description: "Supporting padel and pickleball anticipated facility trends and expanded the platform's market.",
      },
      {
        imageSrc: '/images/track-tennis/track-personalize.png',
        title: 'Flexible by design',
        description: 'Built to support the realities of college and facility operations, not one-size-fits-all workflows.',
      },
    ],
  },

  // 8. CONTENT + IMAGE SECTION #3
  {
    id: 'content-uncertainty',
    type: 'content-image',
    title: 'Conviction requires evidence',
    body: 'Shifting product direction in an early-stage startup required conviction backed by evidence. While my experience in competitive tennis helped identify the opportunity, research with players, coaches, and facilities validated the B2B pivot and clarified real operational needs. Progress depended on sequencing strategy before execution and aligning stakeholders around a sharper vision.',
    imageSrc: '/images/track-tennis/liam-tennis.png',
    imageAlt: 'Track.Tennis design process',
  },

  // 10. TABBED SECTION - Details
  {
    id: 'tabs-details',
    type: 'tabbed',
    title: 'Dig deeper into the product',
    tabs: [
      {
        id: 'features',
        label: 'More features',
        images: [
          { src: '/images/track-tennis/details-3.png', caption: 'Create, cut, and download highlights for social media, coaching and analysis.' },
          { src: '/images/track-tennis/details-2.png', caption: 'Sync fitness data overlays with video for in-depth performance analysis.' },
          { src: '/images/track-tennis/details-4.png', caption: 'Access advanced match analytics and detailed reports from our partners.' },
        ],
      },
    ],
  },

  // 11. CONTENT + IMAGE SECTION #4 - Retrospective
  {
    id: 'content-retrospective',
    type: 'content-image',
    title: 'My retrospective',
    body: 'This project reinforced that experience can spark insight, but data builds conviction. Narrowing focus unlocked clarity across product, brand, and business. If revisiting this work, I would validate the platform shift even earlier before exploring interface redesigns. Next steps include AI-driven highlight generation and automated insights that turn hours of footage into immediate, actionable moments.',
    imageSrc: '/images/track-tennis/track-partnership.png',
    imageAlt: 'Track.Tennis retrospective',
  },

  // 12. MORE PROJECTS
  {
    id: 'more-projects',
    type: 'more-projects',
  },
]

/* ============================================
   HRX EXPERIENCES + WEBVIEWS PROJECT - SECTION CONFIGURATION
   ============================================
   
   To reorder sections: simply move objects within this array.
   Each section is independent and can be placed in any order.
   
   ============================================ */

const hrxExperiencesWebviewsSections: CaseStudySection[] = [
  // 1. HERO MEDIA - Full viewport image
  {
    id: 'hero-media',
    type: 'hero-media',
    src: '/images/hrx-webviews/experiences-hero2.png',
    alt: 'HRX App Experiences + WebViews',
    mediaType: 'image',
  },

  // 2. HEADER CONTENT - Title, subtitle, metadata
  {
    id: 'header-content',
    type: 'header-content',
    title: "Booking shouldn’t feel like a handoff",
    subtitle: "The Hard Rock Experience app’s Experiences tab was intended to be the fastest way for members to book hotels, dining, shows, and on property experiences. The challenge was structural. Every booking ultimately lived on the web. My role was to design a system where app and web worked together as one continuous experience, so members could book with confidence without losing context or momentum. Getting this right mattered ahead of the Las Vegas flagship launch, where booking performance and trust would be under a spotlight.",
    date: '2025 — Present',
    collaborators: 'Product Designer',
    align: 'center',
  },

   // 12. RESULTS STATS - Experience outcome
   {
    id: 'results',
    type: 'results-stats',
    title: 'Experience outcome',
    stats: [
      { value: '~15%', label: 'projected increase in booking entry taps' },
      { value: '~20%', label: 'projected reduction in app-to-web drop-off' },
      { value: '3', label: 'flagship properties validating the rollout' },
      { value: '1', label: 'shared design system across app and web' },
    ],
  },

  // 3. STANDARD IMAGE SECTION (16:9)
  {
    id: 'image-overview',
    type: 'image-block',
    src: '/images/hrx-webviews/exp-highlight.webp',
    alt: 'HRX App Experiences overview',
  },

  // 4. PISO - Problem / Strategy / Outcomes / Impact
  {
    id: 'piso',
    type: 'piso',
    items: [
      {
        label: 'Problem',
        content: "Booking experiences in the HRX app required users to move between native app screens and web pages at the most critical moment. Without clear context, location relevance, or continuity, these transitions risked breaking trust and hurting conversion. At the same time, the app was launching in beta with only a limited set of properties live, creating tension between being useful today and representing a global brand. This was not a UI issue. It was a continuity and conversion problem that needed validation before scaling.",
      },
      {
        label: 'Strategy',
        content: 'Treat Experiences as a booking layer, not a content feature. Surface relevant, location-specific actions early, guide users intentionally into booking flows, and make web content feel like a natural extension of the app. Design the system to support a limited beta while clearly signaling the scale of the global Hard Rock ecosystem.',
      },
      {
        label: 'Outcomes',
        content: 'The Experiences tab became a centralized entry point for booking hotels, dining, shows, and on-property offerings. Location-aware content, focused calls to action, and optimized WebViews reduced friction and preserved momentum through the highest-intent flows in the app.',
      },
      {
        label: 'Impact',
        content: 'The system established a scalable foundation for app-to-web booking across properties, aligning product, design, and engineering around a shared conversion strategy. Early testing and launches with Hollywood and Tampa validated the approach and created a clear blueprint for onboarding additional properties.',
      },
    ],
  },

  // 5. CONTENT + IMAGE SECTION #1 - Designing Experiences as a booking layer
  {
    id: 'content-booking-layer',
    type: 'content-image',
    title: 'Designing Experiences as a booking layer',
    body: 'The Experiences tab was designed around action, not browsing. Clear paths to book hotels, dining, shows, spa, cabanas, promotions, and retail adapted dynamically to the selected location, so members only saw what was actually available. When no location was selected, experiences routed to broader, global entry points, supporting exploration without sacrificing clarity or conversion.',
    imageSrc: '/images/hrx-webviews/exp-locations.png',
    imageAlt: 'HRX App booking layer design',
  },

  // 7. CONTENT + IMAGE SECTION #3 - Transparency
  {
    id: 'content-transparency',
    type: 'content-image',
    title: 'WebViews as part of the product',
    body: 'Once members entered a WebView, the goal shifted to focus and momentum. Headers, footers, and unnecessary navigation were removed. App-aware layouts preserved context, kept booking actions visible, and ensured users always knew how to return without losing their place. Web content adapted to in-app constraints instead of forcing desktop patterns into a mobile shell.',
    imageSrc: '/images/hrx-webviews/webviews-shows3.webp',
    imageAlt: 'HRX App webviews design',
  },

  // 8. CARD SECTION - Strategic bets
  {
    id: 'cards-strategy',
    type: 'card-section',
    title: 'Strategic bets that shaped the experience',
    cards: [
      {
        imageSrc: '/images/hrx-webviews/exp-booking.png',
        title: 'Relevance before breadth',
        description: 'Only surface experiences that can actually be booked for the selected location.',
      },
      {
        imageSrc: '/images/hrx-webviews/location-filter.webp',
        title: 'Transparency without disappointment',
        description: 'Because the beta launched with only select properties live, unavailable locations were clearly marked as “Coming Soon” to signal scale without creating dead ends.',
      },
      {
        imageSrc: '/images/hrx-webviews/webviews-system.png',
        title: 'WebViews shouldn\'t distract from booking',
        description: 'App and web needed to feel like one system, not a redirect. WebViews were designed to feel like a continuation of the app by sharing layout patterns, spacing, and visual language.',
      },
      {
        imageSrc: '/images/hrx-webviews/pricing-comp.png',
        title: 'Driving transparency and conversion before the handoff',
        description: 'For hotel bookings, an intermediary screen allowed members to select dates, guests, and see pricing or comped indicators before entering the full booking engine, reinforcing value earlier in the journey.',
      },
    ],
  },

  // 11. CONTENT + IMAGE SECTION #6 - Designing within constraints
  {
    id: 'content-constraints',
    type: 'content-image',
    title: 'Proving the model across fragmented property systems',
    body: 'Each property operated on different backends, pricing systems, and technical capabilities. Rather than waiting for full alignment, the experience was designed to represent the ideal state and validated with launch properties. Proving conversion impact was our goal to create leverage to bring additional properties into the same model over time. This required close coordination across product, engineering, and property teams, with design acting as the connective tissue.',
    imageSrc: '/images/hrx-webviews/exp-backend.png',
    imageAlt: 'HRX App design constraints',
  },

  // 13. CONTENT + IMAGE SECTION #7 - Retrospective
  {
    id: 'content-retrospective',
    type: 'content-image',
    title: 'My retrospective',
    body: 'This project reinforced that the most important design work often lives in transitions. Treating WebViews as first-class product surfaces, not technical necessities, made the difference between friction and flow. If revisiting this work, our team should push earlier alignment on backend consistency to accelerate global rollout. The next step is expanding this system across more properties and deeper member-specific personalization.',
    imageSrc: '/images/hrx-webviews/exp-retro.png',
    imageAlt: 'HRX App retrospective',
  },

  // 14. MORE PROJECTS
  {
    id: 'more-projects',
    type: 'more-projects',
  },
]

/* ============================================
   HRX APP: MOMENTS PROJECT - SECTION CONFIGURATION
   ============================================
   
   To reorder sections: simply move objects within this array.
   Each section is independent and can be placed in any order.
   
   ============================================ */

const hrxAppMomentsSections: CaseStudySection[] = [
  // 1. HERO MEDIA - Full viewport image
  {
    id: 'hero-media',
    type: 'hero-media',
    src: '/images/hrx-moments/moments-hero4.png',
    alt: 'HRX App Moments',
    mediaType: 'image',
  },

  // 2. HEADER CONTENT - Title, subtitle, metadata
  {
    id: 'header-content',
    type: 'header-content',
    title: 'Inspiration should lead to action',
    subtitle: "Moments was introduced as part of the HRX Lifestyle upgrade to give Hard Rock properties a new way to showcase experiences and turn inspiration into bookings. Instead of static promotions or fragmented content, Moments brings real, timely experiences to life through immersive video and clear calls to action. My role was to design a net-new system that felt familiar, effortless, and intentional. One that maximized fun while quietly driving discovery and conversion across the ecosystem.",
    date: '2025 — Present',
    collaborators: 'Product Designer',
    align: 'center',
  },

  // 11. RESULTS STATS - Experience outcome
  {
    id: 'results',
    type: 'results-stats',
    title: 'Experience outcomes and impact',
    stats: [
      { value: 'New', label: 'discovery surface introduced as part of the HRX Lifestyle upgrade' },
      { value: '+15–25%', label: 'projected increase in session frequency driven by dynamic content' },
      { value: '+10–18%', label: 'projected lift in cross-line-of-business discovery' },
      { value: '1', label: 'scalable content system for properties, personalization, and UGC' },
    ],
  },

  // 3. STANDARD IMAGE SECTION
  {
    id: 'image-overview',
    type: 'image-block',
    src: '/images/hrx-moments/moments-scroll.webp',
    alt: 'HRX App Moments overview',
  },

  // 4. PISO - Problem / Strategy / Outcomes / Impact
  {
    id: 'piso',
    type: 'piso',
    items: [
      {
        label: 'Problem',
        content: "As part of the HRX Lifestyle upgrade, Hard Rock needed a way for properties to actively surface experiences inside the app. While the brand spans hotels, casinos, dining, shows, and entertainment worldwide, there was no dedicated surface to inspire guests, highlight what was happening now, or encourage cross line of business exploration. Opening the app often meant checking points or offers, not discovering what to do next. This limited discovery, reduced session depth, and constrained downstream conversion. It was a discovery and conversion problem.",
      },
      {
        label: 'Strategy',
        content: 'Design Moments as a discovery engine, not a feed. Introduce a net-new, immersive surface that leverages familiar social behaviors to reduce friction, highlight real property experiences, and create natural paths into booking flows. The goal was simple: increase discovery, maximize fun, and make action feel effortless.',
      },
      {
        label: 'Outcomes',
        content: 'Moments launched as a new, dynamic surface inside the HRX app where properties could actively showcase experiences through video. Guests could browse what’s happening, filter by interest, and move seamlessly from inspiration to booking without leaving the flow.',
      },
      {
        label: 'Impact',
        content: 'The system created a scalable foundation for increasing session frequency, cross-property discovery, and conversion through content. It gave properties a new merchandising surface and positioned HRX for future personalization and UGC user-generated content.',
      },
    ],
  },

  // 5. CONTENT + IMAGE SECTION - Designing Moments as a discovery engine
  {
    id: 'content-discovery-engine',
    type: 'content-image',
    title: 'Designing Moments as a discovery engine',
    body: 'Moments was built from the ground up to feel immediately familiar. A global header anchors the experience, while category chips let guests quickly filter content by interest. From there, a vertically scrolling, full-screen video feed delivers immersive content tied directly to real properties and experiences. Each moment is intentional. When relevant, videos include clear calls to action that lead directly into booking flows.',
    imageSrc: '/images/hrx-moments/moments-discovery.webp',
    imageAlt: 'Main Moments feed with category filters and full-screen video cards',
  },

  // 6. CONTENT + IMAGE SECTION - Familiar patterns
  {
    id: 'content-familiar-patterns',
    type: 'content-image',
    title: 'Familiar patterns, tailored for Hard Rock',
    body: 'Interaction behaviors intentionally mirror platforms guests already understand. Swiping advances content, tapping controls audio, and double-tap expresses interest. Nothing new to learn. Nothing unexpected. Where social platforms optimize for endless consumption, Moments optimizes for relevance. Content is curated, finite, and grounded in real destinations, events, and experiences guests can actually book.',
    imageSrc: '/images/hrx-moments/mockup-ui.png',
    imageAlt: 'Swipe interactions, mute states, and focus-mode transitions',
  },

  // 10. CARD SECTION - Strategic bets
  {
    id: 'cards-strategy',
    type: 'card-section',
    title: 'Strategic bets that shaped the experience',
    cards: [
      {
        imageSrc: '/images/hrx-moments/moments-filters.png',
        title: 'Content that adapts to intent',
        description: 'Selecting a category reshapes the feed around a single theme, while an always-visible "Home" option makes it easy to reset and explore again.',
      },
      {
        imageSrc: '/images/hrx-moments/moments-actions.png',
        title: 'Discovery with direction',
        description: 'Inspiration should always point toward a next step, not a dead end.',
      },
      {
        imageSrc: '/images/hrx-moments/moments-share.webp',
        title: 'Engagement beyond the app',
        description: 'Built-in sharing allows Moments to extend beyond HRX, increasing reach and discovery.',
      },
      {
        imageSrc: '/images/hrx-moments/moments-loading.webp',
        title: 'Design for when systems are down',
        description: 'Moments also had to work when things went wrong. Loading states, no-connection messaging, and retry paths were designed to be clear and calm, preserving trust even when content couldn\'t load immediately.',
      },
    ],
  },

  // 9. CONTENT + IMAGE SECTION - Reliability
  {
    id: 'content-reliability',
    type: 'content-image',
    title: 'Sound that works by default',
    body: "Moments was designed so audio is clear, consistent, and always under the user’s control. Sound can be quickly turned on or off from both the feed and focus mode, without disrupting the viewing experience.",
    imageSrc: '/images/hrx-moments/moments-sound.webp',
    imageAlt: 'Error, offline, and retry states across feed and focus mode',
  },


  // 12. CONTENT + IMAGE SECTION - Retrospective
  {
    id: 'content-retrospective',
    type: 'content-image',
    title: 'My retrospective',
    body: 'The core challenge moving forward is content consistency. Designing the system was only part of the work. Sustaining value depends on partnering with properties to create and refresh content on a regular cadence. Generating quality content, especially video, remains a shared challenge across the ecosystem and will ultimately determine how far Moments can scale.',
    imageSrc: '/images/hrx-moments/moments-retro.png',
    imageAlt: 'HRX App Moments retrospective',
  },

  // 13. MORE PROJECTS
  {
    id: 'more-projects',
    type: 'more-projects',
  },
]

/* ============================================
   HP INTERNAL AI PROJECT - SECTION CONFIGURATION
   ============================================
   
   To reorder sections: simply move objects within this array.
   Each section is independent and can be placed in any order.
   
   ============================================ */

const hpInternalAiSections: CaseStudySection[] = [
  // 1. HERO MEDIA - Placeholder
  {
    id: 'hero-media',
    type: 'hero-media',
    src: '/images/hp-ai/hero-mockup3.png',
    alt: 'HP Internal AI Assistant',
    mediaType: 'image',
  },

  // 2. HEADER CONTENT - Title, subtitle, metadata
  {
    id: 'header-content',
    type: 'header-content',
    title: "Efficiency & Productivity Without Compromising Security",
    subtitle: "In 2024, as public AI tools rapidly emerged, HP enforced a company wide block on their use to protect proprietary data. An HP executive still needed a way to get answers in the moment across specialists, teams, and decisions. The real challenge was time. Knowledge lived with specialists, generalists relied on follow ups, and conversations rarely turned into action. I designed and helped build a locally hosted AI assistant that bridged this gap and turned internal knowledge into clear, actionable output entirely within HP’s environment.",
    date: '2024 (12 Weeks)',
    collaborators: 'Product Designer, Prompt Engineer',
    align: 'center',
  },

  // 3. RESULTS STATS
  {
    id: 'results',
    type: 'results-stats',
    title: 'Experience outcomes and impact',
    stats: [
      { value: '12 weeks', label: 'From concept to a working, locally hosted executive tool' },
      { value: '4', label: 'Strategic pivots to align with HP infrastructure and security constraints' },
      { value: '10+', label: 'Team members actively using the assistant in daily workflows' },
      { value: '~35%', label: 'Reduced time spent searching, clarifying ownership, and following up' },
    ],
  },

  // 4. IMAGE BLOCK - Placeholder
  {
    id: 'image-overview',
    type: 'image-block',
    src: '/images/hp-ai/chat-mockup2.png',
    alt: 'HP AI assistant overview image or UI screenshot',
  },

  // 5. PISO - Problem / Strategy / Outcomes / Impact
  {
    id: 'piso',
    type: 'piso',
    items: [
      {
        label: 'Problem',
        content: "Public AI tools were blocked across HP in 2024, leaving executives without fast ways to access internal knowledge. Specialists held critical context, but that context did not travel. Generalists relied on meetings and email to get answers. Information lived across PDFs, spreadsheets, and disconnected systems, slowing decisions and turning conversations into follow up work rather than action.",
      },
      {
        label: 'Strategy',
        content: "Build a private AI assistant for one executive and his team that lived entirely inside HP’s environment. The system needed to bridge specialists and generalists, mirror the executive’s concise style, and convert conversations into next steps. Speed and trust mattered more than feature breadth.",
      },
      {
        label: 'Outcomes',
        content: "We delivered a locally hosted AI assistant that provided fast, trusted answers, surfaced reminders and priorities, and reduced back and forth across teams while keeping all data secure.",
      },
      {
        label: 'Impact',
        content: "The tool became a daily utility, improving decision speed without introducing security risk or operational overhead.",
      },
    ],
  },

  // 7. CONTENT + IMAGE - Designing for secure, real world use
  {
    id: 'content-secure-design',
    type: 'content-image',
    title: 'Building an assistant for real use cases',
    body: "The assistant used a deliberate three column layout inspired by NotebookLM rather than a generic chat. Inputs set context, chat focused on questions, and outputs surfaced reminders, tables, and files. This made intent clear and kept conversations action oriented.",
    imageSrc: '/images/hp-ai/chat-columns.png',
    imageAlt: 'Knowledge base or chat UI',
  },

  // 6. CONTENT + IMAGE - Led design and rapid build execution
  {
    id: 'content-design-lead',
    type: 'content-image',
    title: 'Working within AI limits',
    body: "HP data quickly pushed model limits, with spreadsheets exceeding eighty thousand rows and many PDFs poorly structured. Loading everything into one conversation was not viable. The system separated deep, conversation specific inputs from broader reference knowledge so answers stayed precise rather than speculative.",
    imageSrc: '/images/hp-ai/2-knowledgebase.png',
    imageAlt: 'Early UI or flow diagram',
  },

  // 8. CARD SECTION - Strategic bets
  {
    id: 'cards-strategy',
    type: 'card-section',
    title: 'Strategic bets that shaped the product',
    cards: [
      {
        imageSrc: '/images/hp-ai/strat-bet-1.png',
        title: 'Agents mapped to real roles',
        description: 'Agent behavior mirrored real specialist and industry roles while remaining invisible in the interface.',
      },
      {
        imageSrc: '/images/hp-ai/strat-bet-3.png',
        title: 'User controlled knowledge structure',
        description: 'Giving the users the ability to structure knowledge in a way that matched how they thought.',
      },
      {
        imageSrc: '/images/hp-ai/strat-bet-2.png',
        title: 'Actionable output over summaries',
        description: 'Conversations ended with reminders, priorities, or next steps rather than summaries.',
      },
      {
        imageSrc: '/images/hp-ai/context-knowledge.png',
        title: 'Bridging specialists and generalists',
        description: 'The chat adapted output format using concise language, tables, and resources to feel supportive and intelligent.',
      },
    ],
  },

  // 9. CONTENT + IMAGE - Pivoting under real constraints
  {
    id: 'content-pivot',
    type: 'content-image',
    title: 'Pivoting under real constraints',
    body: "We began the project modelling ChatGPT in Figma before recognizing a quicker need to deliver a working solution. After moving to Replit, firewall and document access limitations forced a temporary pivot to Microsoft Copilot due to HP’s infrastructure. After testing, it proved too limiting. We returned to a local solution, updated the stack, and refocused on the core problem.",
    imageSrc: '/images/hp-ai/pivot-mockup.png',
    imageAlt: 'Iteration or pivot artifact',
  },


  // 12. CONTENT + IMAGE - My retrospective
  {
    id: 'content-retrospective',
    type: 'content-image',
    title: 'My retrospective',
    body: "Designing with AI for AI introduced a steep learning curve where small prompt changes had outsized impact on usability, cost, and trust. Tooling shifted mid project, requiring constant adaptation in both interface and system behavior. Next steps include secure mobile access and personal agents per team member so others can query expertise directly and reduce email driven delays.",
    imageSrc: '/images/hp-ai/highlight-6.png',
    imageAlt: 'Reflection or final UI',
  },

  // 13. MORE PROJECTS
  {
    id: 'more-projects',
    type: 'more-projects',
  },
]

/* ============================================
   HRX APP ONBOARDING / SIGN UP PROJECT - SECTION CONFIGURATION
   ============================================
   
   To reorder sections: simply move objects within this array.
   Each section is independent and can be placed in any order.
   
   ============================================ */

const hrxAppOnboardingSections: CaseStudySection[] = [
  // 1. HERO MEDIA - Full viewport image
  {
    id: 'hero-media',
    type: 'hero-media',
    src: '/images/hrx-onboarding/mockup-hero2.png',
    alt: 'HRX App Onboarding and Sign Up Flow',
    mediaType: 'image',
  },

  // 2. HEADER CONTENT - Title, subtitle, metadata
  {
    id: 'header-content',
    type: 'header-content',
    title: 'Trust is earned in the first 60 seconds',
    subtitle: "The HRX onboarding experience defines a guest's first interaction with the brand inside the app. From account creation to permissions, validation, and recovery flows, every step needed to feel secure, clear, and friction-aware. My role was to design a resilient onboarding system that reduced drop-off, handled errors gracefully, and balanced business needs with user trust.",
    date: '2025',
    collaborators: 'Product Designer',
    align: 'center',
  },

  // 3. RESULTS STATS
  {
    id: 'results',
    type: 'results-stats',
    title: 'Activation outcomes and impact',
    stats: [
      { value: '-18–25%', label: 'projected reduction in onboarding drop-off through validation and clarity improvements' },
      { value: '+12–20%', label: 'projected increase in completed registrations' },
      { value: '0', label: 'duplicate form submissions through controlled state handling' },
      { value: '1', label: 'unified error system across sign up, login, and recovery flows' },
    ],
  },

  // 4. IMAGE OVERVIEW
  {
    id: 'image-overview',
    type: 'image-block',
    src: '/images/hrx-onboarding/app-open.webp',
    alt: 'HRX onboarding flow overview including account creation and permissions',
  },

  // 5. PISO
  {
    id: 'piso',
    type: 'piso',
    items: [
      {
        label: 'Problem',
        content: "The HRX app plans to launch as a new platform for millions of existing Unity members while also supporting new users joining through sweepstakes and promotional campaigns. Onboarding needed to serve both groups at once. Returning members required fast, low-friction access. New users needed clear guidance and trust from the first interaction. The challenge was designing a single system that handled migration, acquisition, and compliance without slowing either audience down.",
      },
      {
        label: 'Strategy',
        content: 'Design onboarding as a trust-building system. Reduce friction through real-time validation. Prevent avoidable errors before submission. Sequence permission requests intentionally. Make every message clear, actionable, and calm.',
      },
      {
        label: 'Outcomes',
        content: 'The onboarding flow became a cohesive system spanning account creation, password logic, phone validation, legal consent, personalization, biometric enablement, and recovery paths.',
      },
      {
        label: 'Impact',
        content: 'Improved activation quality directly supports loyalty growth, personalized marketing, and cross-line-of-business engagement. A smoother first experience increases the likelihood of return sessions and downstream bookings.',
      },
    ],
  },

  // 6. CONTENT + IMAGE
  {
    id: 'content-validation',
    type: 'content-image',
    title: 'Removing friction for existing members',
    body: 'Returning Unity members can log in by scanning their physical card instead of typing an account number or email. Using the camera reduces input friction, speeds up access, and lowers failed login attempts. For high-intent users, the fastest path increases successful authentication and improves re-engagement.',
    imageSrc: '/images/hrx-onboarding/camera-scan.png',
    imageAlt: 'Real-time password validation indicators and inline error messaging',
  },

  // 7. CONTENT + IMAGE
  {
    id: 'content-password',
    type: 'content-image',
    title: 'Personalization from the first tap',
    body: 'Before entering the core experience, users select the Hard Rock moments that matter most to them. Hotels, Casinos, Live Events, Cafes and Shop. These preferences shape home content, offer visibility, and promotional emphasis from the first session. Aligning the app to intent increases relevance, engagement, lifetime value, and cross-line-of-business discovery.',
    imageSrc: '/images/hrx-onboarding/favorite-moment.webp',
    imageAlt: 'Hard Rock Moment selection flow',
  },

  // 11. CARD SECTION
  {
    id: 'cards-strategy',
    type: 'card-section',
    title: 'Key decisions that reduced drop-off',
    cards: [
      {
        imageSrc: '/images/hrx-onboarding/permissions.png',
        title: 'Permission timing with context',
        description: 'Explain the value first, then request access. This reduces denial rates and protects trust.',
      },
      {
        imageSrc: '/images/hrx-onboarding/error-states.png',
        title: 'One error system, everywhere',
        description: 'Consistent patterns across sign up, sign in, and recovery makes issues faster to understand and fix with support one click away.',
      },
      {
        imageSrc: '/images/hrx-onboarding/biometrics.png',
        title: 'Biometrics after verification',
        description: 'Prompting at the right time reinforces security and improves opt-in without adding early friction.',
      },
      {
        imageSrc: '/images/hrx-onboarding/global-scale.png',
        title: 'Built for scale across properties',
        description: 'Onboarding was designed as a reusable system, not a one-off flow. Validation, messaging, and permission patterns were standardized so new properties and markets could launch without redesigning the experience.',
      },
    ],
  },

  // 12. CONTENT + IMAGE
  {
    id: 'content-errors',
    type: 'content-image',
    title: 'Guest Mode as a lower-friction entry',
    body: 'Guest Mode gives users a way to enter the app without creating an account, widening reach and reducing early drop-off. Users can explore key surfaces and get a feel for the experience, but when an action requires membership, we gate the flow with a clear sign up prompt. This keeps the first session moving, builds intent, and converts users when value is proven.',
    imageSrc: '/images/hrx-onboarding/guest-mode.png',
    imageAlt: 'Error states across onboarding including network and validation errors',
  },

  // 13. RETROSPECTIVE
  {
    id: 'content-retrospective',
    type: 'content-image',
    title: 'My retrospective',
    body: 'Onboarding is often treated as a checklist of fields. In reality, it is a conversion surface and a trust moment. The strongest improvement opportunity moving forward is measuring drop-off by micro step and continuously refining copy and sequencing. Small friction compounds quickly at scale.',
    imageSrc: '/images/hrx-onboarding/retro.png',
    imageAlt: 'HRX onboarding system reflection',
  },

  // 14. MORE PROJECTS
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
  // HRX APP: MOMENTS PROJECT - Array-driven rendering
  // ==========================================
  if (slug === 'hrx-app-moments') {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Fixed header */}
        <CaseHeader projectName="HRX App: Moments" />

        {/* Render sections from array */}
        {hrxAppMomentsSections.map((section) => renderSection(section, slug))}
      </div>
    )
  }

  // ==========================================
  // HP INTERNAL AI PROJECT - Array-driven rendering
  // ==========================================
  if (slug === 'hp-internal-ai') {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Fixed header */}
        <CaseHeader projectName="HP Internal AI" />

        {/* Render sections from array */}
        {hpInternalAiSections.map((section) => renderSection(section, slug))}
      </div>
    )
  }

  // ==========================================
  // HRX EXPERIENCES + WEBVIEWS PROJECT - Array-driven rendering
  // ==========================================
  if (slug === 'hrx-experiences-webviews') {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Fixed header */}
        <CaseHeader projectName="HRX App: Experiences + Webviews" />

        {/* Render sections from array */}
        {hrxExperiencesWebviewsSections.map((section) => renderSection(section, slug))}
      </div>
    )
  }

  // ==========================================
  // HRX APP ONBOARDING / SIGN UP PROJECT - Array-driven rendering
  // ==========================================
  if (slug === 'hrx-app-onboarding') {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Fixed header */}
        <CaseHeader projectName="HRX App Onboarding / Sign Up" />

        {/* Render sections from array */}
        {hrxAppOnboardingSections.map((section) => renderSection(section, slug))}
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
  // TRACK.TENNIS PROJECT - Array-driven rendering
  // ==========================================
  if (slug === 'track-tennis') {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Fixed header */}
        <CaseHeader projectName="Track.Tennis" />

        {/* Render sections from array */}
        {trackTennisSections.map((section) => renderSection(section, slug))}
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
