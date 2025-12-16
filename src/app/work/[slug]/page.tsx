'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ExpandableImage } from '@/components/ui/expandable-image'
import { getProjectBySlug, type Project } from '@/lib/data'
import { ArrowLeft } from 'lucide-react'
import {
  SectionWrapper,
  StatGrid,
  HighlightGrid,
  ContextGrid,
  ResearchCarousel,
  ProcessCarousel,
  StrategyTabs,
  ImageGallery,
  ChallengeGrid,
  MoreProjects,
} from '@/components/project'

// HP AI Assistant content
const hpAiContent = {
  overview: {
    title: 'From idea to AI assistant in 8 weeks.',
    copy: 'We built a custom, locally hosted AI tool for an HP executive to streamline workflows, summarize internal data, and stay ahead of the rapid evolution of AI. Designed, coded, and shipped on an HP Z box in under two months, the assistant balanced performance, privacy, and practicality.\n\nI led design, testing, and prompt engineering, moving from Figma into Replit as the project evolved. What began as a design handoff evolved into direct product building, requiring me to design, prototype, and implement UI directly in code.',
    image: '/images/hp-ai/highlight-overview.png',
  },
  results: {
    title: 'Key Results',
    stats: [
      { stat: '1', label: 'localized AI assistant built end to end' },
      { stat: '100%', label: 'alignment with HP data security requirements' },
      { stat: '8 wk', label: 'turnaround from first prototype to functional deployment' },
      { stat: '5×', label: 'faster access to key internal documents' },
    ],
  },
  highlights: {
    title: 'A secure AI assistant built for one executive and his team.',
    copy: 'We shipped a secure, locally hosted AI tool running on an HP Z box. The product featured a clean HP branded UI inspired by NotebookLM, built in access to team knowledge, and dual knowledge bases.',
    items: [
      {
        image: '/images/hp-ai/highlight-1.png',
        title: 'Conversational Knowledge Base',
      },
      {
        image: '/images/hp-ai/highlight-2.png',
        title: 'System Wide Knowledge',
      },
      {
        image: '/images/hp-ai/highlight4.png',
        title: 'HP Branded UI',
      },
    ],
  },
  context: {
    title: 'When security meets speed, something has to give.',
    copy: 'The executive managed hundreds of people and teams across HP. He needed a secure AI powered assistant that could help him find information faster, summarize internal files, and support decision making without sending any data outside HP.',
    items: [
      {
        image: '/images/hp-ai/context-knowledge.png',
        title: 'Siloed Knowledge',
        copy: 'Information scattered across documents, drives, and teams slowed decision making.',
      },
      {
        image: '/images/hp-ai/context-firewall.png',
        title: 'Firewall Restrictions',
        copy: 'Tools like ChatGPT, Claude, and Gemini were blocked inside HP.',
      },
      {
        image: '/images/hp-ai/context-time.png',
        title: 'Time Constraints',
        copy: 'The executive needed concise summaries, not more digging.',
      },
      {
        image: '/images/hp-ai/context-security.png',
        title: 'Security as Priority',
        copy: 'Every interaction had to stay inside HP infrastructure.',
      },
    ],
  },
  research: {
    title: 'Designing around one executive\'s world and workflow.',
    subtitle: 'Direct access was limited, so most insight came from working closely with the executive and his immediate stakeholders. Through testing sessions and fast feedback loops, we calibrated tone, preferences, and how AI should fit into his day.',
    cards: [
      {
        title: 'The Executive',
        copy: 'Wanted to feel like Tony Stark with Jarvis on call at all times, with outputs that matched his tone and style.',
        bullets: [
          'Retrieve key information across departments instantly',
          'Summarize reports, meetings, and threads',
          'Keep proprietary data fully secure',
          'Access the latest AI capabilities without extra effort',
        ],
      },
      {
        title: 'IT and Security Team',
        copy: 'Responsible for compliance and risk. Needed a solution that worked with HP systems without leaking data.',
        bullets: [
          'Approve and monitor local LLM deployments',
          'Maintain transparency and governance',
          'Ensure no data leaves the HP network',
        ],
      },
      {
        title: 'Marketing and Sales Specialists',
        copy: 'Needed faster access to product, brand, and competitor knowledge.',
        bullets: [
          'Search and summarize internal docs',
          'Automate first drafts for decks and proposals',
          'Pull context on clients, competitors, and products on demand',
        ],
      },
      {
        title: 'Marketing and Sales Generalists',
        copy: 'Needed access to specialist knowledge without always routing through subject matter experts.',
        bullets: [
          'Tap into a shared knowledge base at any time',
          'Retrieve specialist level insight during client work',
          'Automate first drafts that are informed by internal expertise',
        ],
      },
      {
        title: 'Experience Benchmarks',
        copy: 'We studied reference tools to define what good should feel like.',
        bullets: [
          'Chat AI: ChatGPT, Gemini, Claude',
          'Local LLMs: Ollama, Langflow, CrewAI',
          'Knowledge: Notion AI, NotebookLM',
          'Voice: Whisper, ElevenLabs',
        ],
      },
    ],
  },
  hypothesis: {
    title: 'The faster we can design, the sooner we can test the real thing.',
    copy: 'With a two person team, strict firewalls, and a tight timeline, Figma alone would slow us down. Given the constraints, we chose to design and code in parallel using vibe coding tools like Replit to validate UI behavior, LLM responses, and workflows simultaneously. This would skip heavy handoff cycles and accelerate learning.',
  },
  process: {
    title: 'Process Highlights',
    heroImage: '/images/hp-ai/figma-replit.png',
    cards: [
      { image: '/images/hp-ai/process-wireframe.png', title: 'Starting In Figma', copy: 'The executive initially asked for a ChatGPT style interface, so we started with a familiar chat layout.' },
      { image: '/images/hp-ai/process-initial.gif', title: 'Initial Styling & Prototyping', copy: 'We designed key interactions and flows using the HP design system as a base.' },
      { image: '/images/hp-ai/process-agentic.png', title: 'Understanding Agentic AI', copy: 'We evaluated newly released open-source agents to support deeper, context-aware conversations without external APIs.' },
      { image: '/images/hp-ai/process-replit.gif', title: 'Shifting to Replit', copy: 'Moving from Figma into Replit collapsed the design–build loop, shifting my role into direct UI implementation and prompt engineering.' },
      { image: '/images/hp-ai/process-design.png', title: 'Visual Design Changes', copy: 'We explored a more futuristic and innovative look that still felt grounded in HP.' },
      { image: '/images/hp-ai/process-llama.png', title: 'Prompt Precision', copy: 'We fine tuned temperature, uncertainty, and tone to generate consistent, executive ready outputs.' },
      { image: '/images/hp-ai/process-box.png', title: 'Local Solution', copy: 'We hosted the assistant on an HP Z box to keep all data local and under HP control.' },
    ],
    tabs: [
      {
        id: 'strategy',
        label: 'Pillars of Strategy',
        subtitle: 'Core Design Principles',
        goal: 'Goal: Make daily processes simpler for the executive and his team. Help them access, summarize, and act on information faster without leaving HP secure systems.',
        cards: [
          { image: '/images/hp-ai/strat-knowledge.png', title: 'Two Knowledge Bases', copy: 'Support both a conversational knowledge base and a platform wide system knowledge base.' },
          { image: '/images/hp-ai/strat-chat.png', title: 'Chat Structure', copy: 'Keep the chat UI simple and actionable. Inputs, conversation, and clear outputs.' },
          { image: '/images/hp-ai/strat-out.png', title: 'Actionable Outtakes', copy: 'Convert each chat into a task, summary, or decision ready note.' },
          { image: '/images/hp-ai/strat-add.webp', title: 'Adding Knowledge', copy: 'Allow users to upload content from files, URLs, and notes as needed.' },
        ],
      },
    ],
  },
  challenges: {
    title: 'Moving fast inside a firewall.',
    items: [
      {
        title: 'Design and Development Pivots',
        copy: 'Switching between design and development was intense. Each pivot meant adjusting both UI and prompts. HP firewall restrictions blocked many APIs, which forced us to pivot to Microsoft Copilot to leverage OneDrive data, then pivot away again when performance fell short.',
      },
      {
        title: 'Vibe Coding Constraints',
        copy: 'Vibe coding in Replit created new constraints. Saves were unstable, backend options were limited, and prompts had to be extremely precise to avoid memory overload. This reinforced the need for clearer guardrails and tooling maturity when building production-grade AI experiences.',
      },
    ],
  },
  delivered: {
    title: 'A locally hosted AI assistant built by two people for one executive and his team.',
    copy: 'We shipped a secure, locally hosted AI tool running on an HP Z box. The product featured a clean HP branded UI inspired by NotebookLM, built in access to team knowledge, and dual knowledge bases. One conversational, one system wide.\n\nThe assistant could recognize reminders, summarize files, and respond in the executive concise tone. Powered by Ollama and Llama 3.2, every interaction stayed private, fast, and fully inside HP infrastructure.',
    heroImage: '/images/hp-ai/highlight-11.png',
    images: [
      '/images/hp-ai/highlight-9.png',
      '/images/hp-ai/highlight-8.png',
      '/images/hp-ai/highlight-5.png',
      '/images/hp-ai/highlight-6.png',
    ],
  },
  learnings: {
    title: 'Designing while vibe coding created a new level of precision.',
    items: [
      'This project was as much about learning as it was about shipping. It was my first time using vibe coding as a core part of the design process.',
      'I learned how model choice, temperature, and prompt phrasing could completely change the experience, and how important it was to define constraints clearly.',
      'Next time, I would validate prompts in isolated environments before integrating them into the build to reduce iteration cost.',
      'Next steps: Collaborate with a developer to create personal AI agents for key team members so they can tap into each other domain knowledge without extra email. Explore a secure mobile extension of the assistant for the executive on the go.',
    ],
  },
}

// Track.Tennis content
const trackTennisContent = {
  overview: {
    title: 'Designing the next era of smart racket sport experiences.',
    copy: 'Track.Tennis began focused on every player type. When I joined, I led a strategic and design-driven pivot to clarify the target market, streamline the experience, and expand beyond tennis into fast growing racket sports like padel and pickleball.\n\nI led research and design, helping shape brand and product strategy. My background as a competitive player, coach, and tennis New Zealand representative informed every decision.',
    image: '/images/track-tennis/highlight1.webp',
    },
  results: {
    title: 'Key Results',
    stats: [
      { stat: '1500+', label: 'cameras installed' },
      { stat: '40k+', label: 'active users' },
      { stat: '8k+', label: 'events streamed' },
      { stat: '90+', label: 'college programs and facilities' },
    ],
  },
  highlights: {
    title: 'A focused ecosystem built for competitive players, coaches, and facilities.',
    copy: 'Track.Tennis evolved from a QR code workflow into a streamlined, cloud based experience with clearer messaging, sharper positioning, and broader market potential.',
    items: [
      {
        image: '/images/track-tennis/highlight4.png',
        title: 'Cloud Based Platform',
      },
      {
        image: '/images/track-tennis/highlight5.png',
        title: 'Becoming Official Partner of ITA',
      },
      {
        image: '/images/track-tennis/highlight2.webp',
        title: 'Matchplay Analysis',
      },
    ],
  },
  context: {
    title: 'When you try to appeal to everyone, you resonate with no one.',
    copy: 'Track.Tennis originally catered to juniors, casual players, leagues, and competitors. The result was diluted messaging and an experience that struggled to satisfy any group fully, especially with SwingVision dominating the consumer market.\n\nThe product needed clarity and a defined audience to establish real value.',
    items: [
      {
        image: '/images/track-tennis/process-1.jpg',
        title: 'Fragmented Focus',
        copy: 'Trying to serve all players left the product without a strong message.',
      },
      {
        image: '/images/track-tennis/process-2.png',
        title: 'Complex Setup',
        copy: 'QR scans, camera configuration, and staff involvement slowed everything down.',
      },
      {
        image: '/images/track-tennis/process-3.png',
        title: 'Mobile Fatigue',
        copy: 'Local video storage filled devices and reduced performance.',
      },
      {
        image: '/images/track-tennis/process-4.png',
        title: 'Visual Disconnect',
        copy: 'An orange tinted identity clashed with brand perception and player psychology.',
      },
    ],
  },
  research: {
    title: 'Which user groups would truly benefit from performance analysis?',
    subtitle: 'I interviewed dozens of players, coaches, facilities, and organizers. Insights mapped five primary personas who needed Track.Tennis and revealed specific jobs to be done for each.',
    cards: [
      {
        title: 'Competitive Players',
        copy: 'Wanted frictionless match recording and deeper insight.',
        bullets: [
          'Record automatically without setup',
          'Upload personal recordings',
          'Store and annotate history',
          'Share insights with coaches',
          'Discover Track.Tennis enabled courts',
        ],
      },
      {
        title: 'Competitive Juniors',
        copy: 'Focused on improvement and college recruitment.',
        bullets: [
          'Record analyzed match videos for recruitment',
          'Receive actionable insights',
          'Find and book facilities',
          'Build a highlight library',
        ],
      },
      {
        title: 'Amateur Players',
        copy: 'Wanted lightweight analysis without complexity.',
        bullets: [
          'Record lessons or matches',
          'Get basic insights',
          'Share fun moments',
        ],
      },
      {
        title: 'Facilities and Clubs',
        copy: 'Needed efficiency and monetization.',
        bullets: [
          'Offer recording as a paid upgrade',
          'Customize branding',
          'Manage multiple sports',
          'Increase revenue',
        ],
      },
      {
        title: 'Coaches and Colleges',
        copy: 'Required reliable footage and collaboration tools.',
        bullets: [
          'Review recordings remotely',
          'Annotate and comment',
          'Organize team footage',
          'Personalize the platform',
        ],
      },
      {
        title: 'Tournament Organizers',
        copy: 'Needed scalable streaming and professional delivery.',
        bullets: [
          'Enable live streaming',
          'Archive footage',
          'Provide post event recordings',
          'Prepare for future line calling',
        ],
      },
      {
        title: 'Experience Benchmarks',
        copy: 'We studied reference tools to define what good should feel like.',
        bullets: [
          'HUDL, Dartfish, SwingVision',
          'YouTube, Vimeo',
          'Mindbody, CourtReserve',
          'Notion, HUDL, Figma',
        ],
      },
    ],
  },
  hypothesis: {
    title: 'Move from consumer app to cloud B2B to scale and eliminate mobile and setup friction.',
    copy: 'We shifted from a consumer mobile app to a cloud-based B2B platform to eliminate setup friction, enable facility-level control, and unlock expansion into padel and pickleball. This pivot can help align business goals with actual user behaviors and reduced operational barriers, taking us into a new blue ocean instead of directly competing with SwingVision.',
  },
  process: {
    title: 'Process Highlights',
    heroImage: '/images/track-tennis/process-player.png',
    cards: [
      { image: '/images/track-tennis/process-5.png', title: 'Initial App Designs', copy: 'Early redesign work exposed systemic friction, reinforcing the need for a strategic pivot rather than incremental UI improvement.' },
      { image: '/images/track-tennis/process-6.png', title: 'Initial Design System', copy: 'Created the product\'s first design system using the existing brand identity.' },
      { image: '/images/track-tennis/process-7.png', title: 'Mapping ICP & Key Flows', copy: 'Mapping multi-layer user flows revealed structural friction that couldn’t be solved within a consumer mobile model.' },
      { image: '/images/track-tennis/process-8.png', title: 'Wireframing the First Experience', copy: 'Began wireframing desktop flows for a web based platform, visualizing the ideas and allowing early stakeholder feedback.' },
    ],
    tabs: [
      {
        id: 'strategy',
        label: 'Pillars of Strategy',
        subtitle: 'Core Strategy Pillars',
        goal: 'Goal: Make the experience simple for every stakeholder and help players grow with ease.',
        cards: [
          { image: '/images/track-tennis/strat-1.png', title: 'Simplify Access', copy: 'Reducing operational overhead for clubs and friction for players.' },
          { image: '/images/track-tennis/strat-2.png', title: 'Expand Beyond Tennis', copy: 'Introduce padel and pickleball to future proof the platform.' },
          { image: '/images/track-tennis/strat-3.png', title: 'Modernize the Brand', copy: 'Shift from orange to a vibrant green for a performance driven identity.' },
          { image: '/images/track-tennis/strat-4.png', title: 'Personalize the Platform', copy: 'Offer customizable branding for clubs, colleges, and facilities.' },
        ],
      },
    ],
  },
  challenges: {
    title: 'Proving conviction with data.',
    items: [
      {
        title: 'Strategic Pivot Validation',
        copy: 'Driving a startup pivot required aligning research, business viability, and product feasibility to build conviction across stakeholders. Research and interviews validated the shift from consumer to B2B and aligned the business model with actual demand.',
      },
    ],
  },
  delivered: {
    title: 'A new identity, product offering, and strategy for all racket sports.',
    copy: 'We rebuilt Track.Tennis around a cloud-based B2B model, aligning brand, product, and revenue around facilities rather than individual players. Players can now reserve courts, record matches, and receive analyzed videos automatically, while facilities gained a simple way to offer premium, automated recording as a service.',
    heroImage: '/images/track-tennis/deliver-1.png',
    images: [
      '/images/track-tennis/deliver-2.png',
      '/images/track-tennis/deliver-3.png',
      '/images/track-tennis/deliver-4.png',
      '/images/track-tennis/deliver-5.png',
    ],
  },
  learnings: {
    title: 'Experience informs insight, but data drives conviction.',
    items: [
      'My background in tennis highlighted problems early, but validating those instincts was essential. This project taught me the importance of sequencing: strategy first, design second.',
      'Next time: Validate the business and product direction fully before deep design exploration.',
      'Next steps: Introduce AI generated highlight reels and auto moments to turn hours of footage into actionable insights.',
    ],
  },
}

// Hard Rock Experience App content
const hardRockAppContent = {
  overview: {
    title: 'One brand. Many worlds. One lifestyle app.',
    copy: 'Hard Rock needed to evolve from a casino-driven loyalty app into a connected lifestyle platform for every guest. The Hard Rock Experience app brings hotels, cafes, concerts, retail, and gaming together in one seamless digital journey. My role focused on UX and UI design across key features, aligning the app with the new web platform, and helping shape a unified ecosystem ahead of the 2027 Las Vegas flagship launch.',
    image: '/images/hard-rock-app/hard-rock-hero3.png',
  },
  results: {
    title: 'Key Results',
    stats: [
      { stat: '1', label: 'connected loyalty ecosystem spanning experiences' },
      { stat: '30+', label: 'properties integrating into one platform' },
      { stat: '5+', label: 'lines of business unified under a single design system' },
      { stat: '+45%', label: 'higher engagement vs baseline Unity app tests' },
    ],
  },
  highlights: {
    title: 'A lifestyle ecosystem designed to expand loyalty beyond gaming and drive everyday engagement.',
    copy: 'The HRX app elevates how users experience Hard Rock every day. Guests can browse moments, book stays, explore cafes, discover shows, track rewards, and connect with every part of the brand.',
    items: [
      {
        image: '/images/hard-rock-app/highlight-app.webp',
        title: 'Welcome Screen',
      },
      {
        image: '/images/hard-rock-app/highlight-moments1.webp',
        title: 'Moments',
      },
      {
        image: '/images/hard-rock-app/highlight-moments3.png',
        title: 'Moments Categories',
      },
    ],
  },
  context: {
    title: 'Expand loyalty beyond the Florida casino floor.',
    copy: "The existing Unity app focused almost entirely on gaming audiences based in Florida. Hotel guests, diners, travelers, and concert goers were left out. HRX was created to bridge these worlds and give every guest a reason to return.\n\nHard Rock's global scale introduced major challenges. Every property operated differently. Every line of business had unique needs. The goal was to design one flexible system that could support all of them without losing brand cohesion.",
    items: [
      {
        image: '/images/hard-rock-app/context1.jpeg',
        title: 'Global, Yet Local Needs',
        copy: 'Every property required unique integrations, regulations, and user flows before launch.',
      },
      {
        image: '/images/hard-rock-app/context2.png',
        title: 'Offer & Reward Confusion',
        copy: 'Users were often confused or weren\'t aware of offers andrewards achieved by their account.',
      },
      {
        image: '/images/hard-rock-app/context3.png',
        title: 'Outdated & Not Functional',
        copy: 'The original Unity app lacked modern functionality, requiring a reboot and uplift.',
      },
    ],
  },
  research: {
    title: 'We ran a multi-segment research program to understand how different audiences connect with Hard Rock.',
    subtitle: 'We also benchmarked leading experience brands across loyalty, hospitality, content, and community.',
    cards: [
      {
        title: 'Casino Players',
        copy: 'Driven by status, rewards, and exclusive access.',
        bullets: [
          'Track rewards',
          'Access offers',
          'View balances',
          'Receive invitations',
        ],
      },
      {
        title: 'Hotel Guests',
        copy: 'Lifestyle-focused travelers seeking convenience.',
        bullets: [
          'Browse and book rooms',
          'Discover dining and shows',
          'View benefits',
        ],
      },
      {
        title: 'Cafe Visitors',
        copy: 'Casual diners and travelers seeking food, menus, merch, and moments.',
        bullets: [
          'Find cafes',
          'View menus',
          'Link purchases',
          'Collect badges',
        ],
      },
      {
        title: 'Concert Fans',
        copy: 'Music-first users energized by events.',
        bullets: [
          'Discover shows',
          'Buy tickets',
          'Unlock access',
          'Relive moments',
        ],
      },
      {
        title: 'Collectors and Loyalists',
        copy: 'Superfans who engage across all Hard Rock offerings.',
        bullets: [
          'Track merch',
          'Earn long-term rewards',
          'Showcase memorabilia',
        ],
      },
    ],
  },
  hypothesis: {
    title: 'A connected, personalized ecosystem drives deeper engagement.',
    copy: 'If we evolve Hard Rock loyalty into a connected digital ecosystem that understands it\'s customers, users will explore more, book more, and deepen their relationship with the brand. Linking hotels, dining, retail, and entertainment into one experience will strengthen engagement and drive value for every customer segment.',
  },
  process: {
    title: 'Process Highlights',
    heroImage: '/images/hard-rock-app/positioning-strategy1.png',
    cards: [
      { image: '/images/hard-rock-app/process-brainstorm.jpg', title: 'Stakeholder Workshops', copy: 'Collaborating to under segment motivations for download and return.' },
      { image: '/images/hard-rock-app/process-flows.jpg', title: 'Mapping Key Ideas', copy: 'Visualizing key flows we envisioned for V1.' },
      { image: '/images/hard-rock-app/positioning-strategy-1.png', title: 'Validating Our Omnichannel Strategy', copy: 'It was important to use data to validate our conviction.' },
      { image: '/images/hard-rock-app/process-og.jpeg', title: 'Trialing Our Initial Designs', copy: 'Audited and simplified existing design systems to reduce LOB-specific divergence and enable reuse.' },
      { image: '/images/hard-rock-app/process-ideate.jpeg', title: 'Feature Development', copy: 'Conducted multiple hackathons to ideate and prototype initial features for V1.' },
      { image: '/images/hard-rock-app/process-demo.jpg', title: 'Property Prototypes', copy: 'Testing with stakeholders and guests at key properties for our MVP.' },
    ],
    tabs: [
      {
        id: 'interactions',
        label: 'Interactions',
        subtitle: 'Key Micro-Interactions',
        goal: 'Goal: Create delightful, memorable moments throughout the app.',
        cards: [
          { image: '/images/hard-rock-app/highlight-status.gif', title: 'New Status Celebration', copy: 'Emotive full-screen animation' },
          { image: '/images/hard-rock-app/highlight-tier.webp', title: 'Tier Status', copy: 'Micro-interaction in the tier card' },
          { image: '/images/hard-rock-app/interaction-moments.webp', title: 'Moments', copy: 'Lifestyle exploration' },
          { image: '/images/hard-rock-app/interaction-momentsshare.webp', title: 'Moments Share', copy: 'Share with friends and family' },
          { image: '/images/hard-rock-app/interaction-offercal.webp', title: 'Offer Calendar', copy: 'Exploring offer options and dates' },
          { image: '/images/hard-rock-app/interaction-offerfilter.webp', title: 'Offer Filter', copy: 'Filter offers through locations and preferences' },
          { image: '/images/hard-rock-app/interaction-location.webp', title: 'Notification Permissions', copy: 'Contextual permission requests' },
        ],
      },
    ],
  },
  challenges: {
    title: 'Designing for a global brand with local realities.',
    items: [
      {
        title: 'Different Systems',
        copy: 'Each line of business had different systems, workflows, and user behaviors. Clarifying the techstack for each proved to be difficult, and required a lot of back and forth with stakeholders.',
      },
      {
        title: 'Independent Properties',
        copy: 'Every property operated independently. Balancing global consistency with local flexibility required defining which elements were non-negotiable versus property-owned.',
      },
    ],
  },
  delivered: {
    title: 'A connected lifestyle app for every kind of Hard Rock fan.',
    copy: 'We designed the foundation for a unified experience linking users across every property, line of business, and loyalty tier. HRX shifts Hard Rock from a transactional loyalty app into a global lifestyle platform, establishing a foundation for future features, integrations, and partner experiences.\n\nThe app is in development with phased rollouts planned ahead of the 2027 flagship launch.',
    heroImage: '/images/hard-rock-app/highlight-experiences.png',
    images: [
      '/images/hard-rock-app/positioning-strategy-3.png',
      '/images/hard-rock-app/hrx-hero1.png',
      '/images/hard-rock-app/highlight-experiences-1.png',
      '/images/hard-rock-app/highlight-hrx.png',
      '/images/hard-rock-app/highlight-vegas.jpg',
      '/images/hard-rock-app/highlight-engine.png',
    ],
  },
  learnings: {
    title: 'Designing for unity at global scale.',
    items: [
      'Understanding operations across gaming, hotels, cafes, retail, and entertainment shaped how we designed offers, discovery, and loyalty.',
      'Earlier stakeholder alignment would have helped accelerate the vision.',
      'Next steps: continue property testing, expand integrations, and prepare for the 2027 Las Vegas launch.',
    ],
  },
}

// Hard Rock Web content
const hardRockWebContent = {
  overview: {
    title: 'One brand. Five lines of business. Thirty+ properties. One seamless experience.',
    copy: 'Hard Rock’s web presence had grown into a maze of legacy microsites, outdated patterns, and inconsistent journeys. My role was to turn a fragmented, text-heavy “newspaper” web into a modern, conversion-focused ecosystem: built to scale globally and feel unified locally. We didn’t just migrate content. We rebuilt how millions experience Hard Rock online.',
    image: '/images/hard-rock-web/hard-rock-hero.jpg',
  },
  results: {
    title: 'Key outcomes',
    stats: [
      { stat: '100M+', label: 'annual visits guided through one cohesive experience' },
      { stat: '30+', label: 'brands unified under one design system' },
      { stat: '3×', label: 'projected increase in Hard Rock experiences per guest' },
      { stat: '+22%', label: 'projected lift in direct bookings' },
    ],
  },
  highlights: {
    title: 'Designing a system that aligned scale, conversion, and brand trust.',
    copy: 'The redesign elevated how millions (75% mobile) interact with the Hard Rock brand globally, delivering faster performance, stronger conversions, and a scalable foundation for every future launch.',
    items: [
      {
        image: '/images/hard-rock-web/strat-arch1.webp',
        title: 'Piecing LOBs Together',
      },
      {
        image: '/images/hard-rock-web/highlight-map.webp',
        title: 'Global Maps',
      },
      {
        image: '/images/hard-rock-web/strat-arch2.webp',
        title: 'Location Switcher',
      },
    ],
  },
  context: {
    title: "Hard Rock was preparing for a major Las Vegas flagship launch, but the web ecosystem wasn't ready.",
    copy: "What began as a straightforward CMS migration quickly revealed a bigger opportunity: if we had to rebuild everything, we might as well do it right. Hard Rock’s digital estate was a maze of siloed microsites, outdated navigation, inconsistent design, heavy URL debt, and Y2K-era patterns. The mandate became clear—create one cohesive, modern ecosystem capable of supporting the entire Hard Rock universe.",
    items: [
      {
        image: '/images/hard-rock-web/context-journey.png',
        title: 'Incohesive Journey',
        copy: 'Disjointed LOB experiences and design styles caused siloed customer flows.',
      },
      {
        image: '/images/hard-rock-web/context-action.png',
        title: 'Lack of Concise Action',
        copy: 'Information architecture buried critical CTAs.',
      },
      {
        image: '/images/hard-rock-web/context-y2k.png',
        title: 'Y2k styled',
        copy: 'Visual design and content felt dated and text heavy.',
      },
      {
        image: '/images/hard-rock-web/context-url.png',
        title: 'URL Debt',
        copy: 'No consistent URL structure or scalable navigation model.',
      },
    ],
  },
  research: {
    title: 'We ran a two-track research program:',
    subtitle: '30+ stakeholder interviews • UX benchmarking + analytics',
    cards: [
      {
        title: 'Resorts',
        copy: 'Users wanted clearer pricing, simpler offers, easier mobile discovery, and a streamlined way to find meetings and events.',
        bullets: [
          'Find and compare destinations quickly',
          'Browse stays with trust and transparency',
          'Get a sense of brand and property vibe pre-booking',
          'Find meeting spaces that match needs',
        ],
      },
      {
        title: 'Shows',
        copy: 'Entertainment seekers needed faster discovery and booking.',
        bullets: [
          'Discover relevant shows',
          'Clarity on ticket availability',
          'Book cross-sell experiences',
        ],
      },
      {
        title: 'Cafes',
        copy: 'Diners wanted quick access to menus and local info.',
        bullets: [
          'View menus + pricing',
          'Find cafes, order online',
          'See hours + ratings',
        ],
      },
      {
        title: 'Casinos',
        copy: 'Players wanted excitement and exploration.',
        bullets: [
          'Live jackpots + wins',
          'Explore by map',
          'Capture excitement of play',
        ],
      },
      {
        title: 'Properties',
        copy: 'Guests needed seamless cross-property navigation.',
        bullets: [
          'Find key features quickly',
          'Get accurate live info',
          'Seamlessly navigate across properties',
        ],
      },
    ],
  },
  hypothesis: {
    title: 'Unified experiences. Higher trust. Better conversion.',
    copy: "If we unify Hard Rock's fragmented digital ecosystem, simplify navigation, surface key actions, and highlight local property identity, then users will complete tasks faster and convert more often, driving stronger brand loyalty.",
  },
  process: {
    title: 'Process Highlights',
    heroImage: '/images/hard-rock-web/process-hero1.png',
    cards: [
      { image: '/images/hard-rock-web/process-flows.png', title: 'Understanding Key Flows', copy: 'Mapping critical journeys to identify where fragmentation broke trust and conversion.' },
      { image: '/images/hard-rock-web/process-wireframes.png', title: 'Wireframing & Reiterating', copy: 'Quick concepting for early solutions.' },
      { image: '/images/hard-rock-web/process-copy.png', title: 'Repositioning Copy', copy: 'Intentionally reducing “Rock” language to let clarity and conversion lead, not branding noise.' },
      { image: '/images/hard-rock-web/process-lobs.png', title: 'LOBs Connect', copy: 'How might we interconnect service lines and show omnichannel pathways?' },
      { image: '/images/hard-rock-web/process-menu.png', title: 'Mega Menu Design', copy: 'Navigating global discovery based on MGM patterns.' },
    ],
    tabs: [
      {
        id: 'architecture',
        label: 'Start Here',
        subtitle: 'Architecture & Navigation',
        goal: "Goal: Make discovery seamless across Hard Rock's universe.",
        cards: [
          { image: '/images/hard-rock-web/highlight-lobs.png', title: 'Global Quick-Tab Nav', copy: 'Unified navigation across all properties' },
          { image: '/images/hard-rock-web/highlight-switcher.png', title: 'Location Switcher Component', copy: 'Seamless destination switching' },
          { image: '/images/hard-rock-web/strat-arch3.png', title: 'Mega Menu Redesign', copy: 'Scalable discovery patterns' },
          { image: '/images/hard-rock-web/strat-arch4.webp', title: 'Unified URL Schema', copy: 'Consistent linking structure' },
        ],
      },
      {
        id: 'experience',
        label: 'Then Go Here',
        subtitle: 'Experience Design & Content',
        goal: 'Goal: Replace static, text-heavy pages with interactive, emotional experiences.',
        cards: [
          { image: '/images/hard-rock-web/strat-exp1.png', title: 'Dynamic Destination Map', copy: 'Interactive property exploration' },
          { image: '/images/hard-rock-web/strat-exp2.png', title: 'Sticky Action Bars', copy: 'Persistent CTAs for conversion' },
          { image: '/images/hard-rock-web/strat-exp3.png', title: 'Social Proof Integration', copy: 'Guest reviews and UGC' },
          { image: '/images/hard-rock-web/strat-exp4.png', title: 'Menu Explorer for Cafes', copy: 'Visual menu browsing' },
        ],
      },
      {
        id: 'systems',
        label: 'Can\'t Miss This',
        subtitle: 'Systems & Scalability',
        goal: 'Goal: Design once, scale infinitely.',
        cards: [
          { image: '/images/hard-rock-web/strat-des1.webp', title: 'Unified Design Language', copy: 'Consistent brand expression' },
          { image: '/images/hard-rock-web/strat-des2.png', title: 'Modular Component Library', copy: 'Reusable building blocks' },
          { image: '/images/hard-rock-web/strat-des3.webp', title: 'Tokenized Styling Framework', copy: 'Theme-able design tokens' },
          { image: '/images/hard-rock-web/strat-des4.png', title: 'Future-Proofing for Ecosystem', copy: 'Extensible architecture' },
        ],
      },
    ],
  },
  challenges: {
    title: 'Earning trust and navigating uncertainty.',
    items: [
      {
        title: 'Stakeholder Alignment',
        copy: 'Managing competing needs and earning long-term trust. We aligned stakeholders early by creating visible decision moments and shared ownership, which reduced downstream resistance.',
      },
      {
        title: 'Migration & Project Uncertainty',
        copy: 'Working around mid-migration technical limitations and poor product inheritance. We had to be patient and work with the limitations we had.',
      },
    ],
  },
  delivered: {
    title: 'A Hard Rock ecosystem connecting every experience.',
    copy: 'This project aligned corporate and property-level stakeholders around a shared digital vision. By sharing the same system and CMS as the app, the web platform established a reference architecture for all future internal and external products.',
    heroImage: '/images/hard-rock-web/deliver-hero3.png',
    images: [
      '/images/hard-rock-web/del1.png',
      '/images/hard-rock-web/del2.png',
      '/images/hard-rock-web/del3.png',
      '/images/hard-rock-web/del4.png',
      '/images/hard-rock-web/del5.png',
      '/images/hard-rock-web/del6.png',
    ]
  },
  learnings: {
    title: 'Corporate collaboration is its own design challenge.',
    items: [
      'Scaling design is as much about people as pixels.',
      'Aligning stakeholders is a core design skill.',
      'Next time, integrate analytics earlier (LogRocket) to validate our varying hypotheses.',
      'Future priority: redesign booking and member experiences.',
    ],
  },
}

// Jumpnav sections (Results removed to reduce clutter)
const jumpnavSections = [
  { id: 'overview', title: 'Overview' },
  { id: 'highlights', title: 'Highlights' },
  { id: 'context', title: 'Context' },
  { id: 'research', title: 'Research' },
  { id: 'hypothesis', title: 'Hypothesis' },
  { id: 'process', title: 'Process' },
  { id: 'challenges', title: 'Challenges' },
  { id: 'delivered', title: 'Delivered' },
  { id: 'learnings', title: 'Learnings' },
]

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [project, setProject] = useState<Project | null>(null)
  const [activeSection, setActiveSection] = useState('overview')
  const jumpnavItemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  useEffect(() => {
    const found = getProjectBySlug(slug)
    if (!found) {
      router.push('/')
      return
    }
    setProject(found)
  }, [slug, router])

  // Intersection observer for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    jumpnavSections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [project])

  // Auto-scroll jumpnav to keep active tab visible
  useEffect(() => {
    const activeButton = jumpnavItemRefs.current[activeSection]
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [activeSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
    }
  }

  if (!project) {
    return (
      <div className="card-container" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '32px', height: '32px', border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  // Use project-specific content based on slug
  const content = slug === 'hard-rock-web' 
    ? hardRockWebContent 
    : slug === 'hard-rock-app' 
      ? hardRockAppContent 
      : slug === 'hp-ai'
        ? hpAiContent
        : slug === 'track-tennis'
          ? trackTennisContent
          : null

  return (
    <div className="card-container">
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

      {/* Project Title Section */}
      <div className="project-hero">
        <h1 className="project-hero-title">{project.title}</h1>
        <p className="project-hero-description">{project.description}</p>
        <div className="project-hero-meta">
          <span className="project-hero-pill">{project.role}</span>
          {slug === 'hard-rock-web' && (
            <span className="project-hero-timeline">April 2024–Ongoing</span>
          )}
          {slug === 'hard-rock-app' && (
            <span className="project-hero-timeline">April 2025–Present (In Development)</span>
          )}
          {slug === 'hp-ai' && (
            <span className="project-hero-timeline">Sep 2024 to Nov 2024</span>
          )}
          {slug === 'track-tennis' && (
            <span className="project-hero-timeline">Feb 2021 to Jan 2022</span>
          )}
        </div>
      </div>

      {/* Sticky Jumpnav - CSS position:sticky, below role tag */}
      <nav 
        className="jumpnav"
        role="navigation"
        aria-label="Page sections"
      >
        <div className="jumpnav-inner">
          {jumpnavSections.map(({ id, title }) => (
            <button
              key={id}
              ref={(el) => { jumpnavItemRefs.current[id] = el }}
              onClick={() => scrollToSection(id)}
              className={`jumpnav-item ${activeSection === id ? 'jumpnav-item-active' : ''}`}
              aria-current={activeSection === id ? 'true' : undefined}
            >
              {title}
            </button>
          ))}
        </div>
      </nav>

        {/* Main Content */}
        <main className="project-main">
          {content ? (
            <article>
              {/* 1. Overview */}
              <SectionWrapper id="overview" pill="Overview" title={content.overview.title}>
                <p className="section-copy">{content.overview.copy}</p>
                <div className="hero-image-wrapper">
                  {content.overview.image ? (
                    <ExpandableImage 
                      src={content.overview.image} 
                      alt={project.title}
                      width={1920}
                      height={1400}
                      sizes="(max-width: 768px) 100vw, 800px"
                      style={{ width: '100%', height: 'auto' }}
                      priority
                    />
                  ) : (
                    <div className="image-placeholder" />
                  )}
                </div>
              </SectionWrapper>

              {/* 2. Results */}
              <SectionWrapper id="results" pill="Results" title={content.results.title}>
                <StatGrid stats={content.results.stats} />
              </SectionWrapper>

              {/* 3. Highlights */}
              <SectionWrapper id="highlights" pill="Highlights" title={content.highlights.title}>
                <p className="section-copy">{content.highlights.copy}</p>
                <HighlightGrid highlights={content.highlights.items} />
              </SectionWrapper>

              <div className="section-divider-thick" />

              {/* 4. Context */}
              <SectionWrapper id="context" pill="Context" title={content.context.title}>
                <p className="section-copy">{content.context.copy}</p>
                {content.context.items.length > 0 ? (
                  <ContextGrid items={content.context.items} />
                ) : (
                  <div className="image-placeholder" style={{ marginTop: '24px' }} />
                )}
              </SectionWrapper>

              {/* 5. Research */}
              <SectionWrapper id="research" pill="Research" title={content.research.title}>
                <p className="section-copy" style={{ marginBottom: '8px' }}>{content.research.subtitle}</p>
                <ResearchCarousel cards={content.research.cards} />
              </SectionWrapper>

              {/* 6. Hypothesis */}
              <SectionWrapper id="hypothesis" pill="Hypothesis" title={content.hypothesis.title}>
                <p className="section-copy">{content.hypothesis.copy}</p>
              </SectionWrapper>

              {/* 7. Process */}
              <SectionWrapper id="process" pill="Process" title={content.process.title}>
                {content.process.heroImage && (
                  <div className="hero-image-wrapper" style={{ marginBottom: '32px' }}>
                    <ExpandableImage 
                      src={content.process.heroImage} 
                      alt="Process overview"
                      width={1920}
                      height={1400}
                      sizes="(max-width: 768px) 100vw, 800px"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                )}
                <ProcessCarousel cards={content.process.cards} />
                <div style={{ marginTop: '48px' }}>
                  <h3 className="strategy-section-title">
                    {slug === 'hard-rock-app' ? 'Interactions' : 'Pillars of Strategy'}
                  </h3>
                  {content.process.tabs.length > 0 && (
                    <StrategyTabs tabs={content.process.tabs} />
                  )}
                </div>
              </SectionWrapper>

              {/* 8. Challenges */}
              <SectionWrapper id="challenges" pill="Challenges" title={content.challenges.title} className="challenges-section">
                <ChallengeGrid challenges={content.challenges.items} />
              </SectionWrapper>

              {/* 9. Delivered */}
              <SectionWrapper id="delivered" pill="Delivered" title={content.delivered.title}>
                <p className="section-copy">{content.delivered.copy}</p>
                {content.delivered.heroImage && (
  <div className="hero-image-wrapper" style={{ marginBottom: '32px' }}>
    <ExpandableImage 
      src={content.delivered.heroImage} 
      alt="Delivered overview"
      width={1920}
      height={1400}
      sizes="(max-width: 768px) 100vw, 800px"
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
)}

                {content.delivered.images.length > 0 ? (
                  <ImageGallery images={content.delivered.images} />
                ) : (
                  <div className="image-placeholder" style={{ marginTop: '24px' }} />
                )}
              </SectionWrapper>

              {/* 10. Learnings */}
              <SectionWrapper id="learnings" pill="Learnings" title={content.learnings.title}>
                <ul className="learnings-list">
                  {content.learnings.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </SectionWrapper>

              {/* 11. More Projects */}
              <SectionWrapper id="more" title="More Projects">
                <MoreProjects currentSlug={slug} />
              </SectionWrapper>
            </article>
          ) : (
            // Placeholder for other projects
            <article>
              <SectionWrapper id="overview" pill="Overview" title="Project Overview">
                <p className="section-copy">
                  This case study is a placeholder. Replace this content with the actual project overview.
                </p>
                <div className="hero-image-wrapper" style={{ background: 'var(--tile-bg)', aspectRatio: '16/9', borderRadius: '16px' }} />
              </SectionWrapper>

              <SectionWrapper id="results" pill="Results" title="Key Results">
                <StatGrid stats={[
                  { stat: '—', label: 'Metric placeholder' },
                  { stat: '—', label: 'Metric placeholder' },
                  { stat: '—', label: 'Metric placeholder' },
                  { stat: '—', label: 'Metric placeholder' },
                ]} />
              </SectionWrapper>

              <SectionWrapper id="highlights" pill="Highlights" title="Project Highlights">
                <p className="section-copy">Key achievements and highlights from this project.</p>
              </SectionWrapper>

              <div className="section-divider-thick" />

              <SectionWrapper id="context" pill="Context" title="The Context">
                <p className="section-copy">Background and context for this project.</p>
              </SectionWrapper>

              <SectionWrapper id="research" pill="Research" title="Research Insights">
                <p className="section-copy">Research findings and user insights.</p>
              </SectionWrapper>

              <SectionWrapper id="hypothesis" pill="Hypothesis" title="Our Hypothesis">
                <p className="section-copy">The hypothesis that guided our approach.</p>
              </SectionWrapper>

              <SectionWrapper id="process" pill="Process" title="Design Process">
                <p className="section-copy">The methodology and process followed.</p>
              </SectionWrapper>

              <SectionWrapper id="challenges" pill="Challenges" title="Key Challenges">
                <p className="section-copy">Challenges encountered and overcome.</p>
              </SectionWrapper>

              <SectionWrapper id="delivered" pill="Delivered" title="What We Delivered">
                <p className="section-copy">The final deliverables and outcomes.</p>
              </SectionWrapper>

              <SectionWrapper id="learnings" pill="Learnings" title="Learnings">
                <p className="section-copy">Key takeaways and lessons learned.</p>
              </SectionWrapper>

              <SectionWrapper id="more" title="More Projects">
                <MoreProjects currentSlug={slug} />
              </SectionWrapper>
            </article>
          )}
        </main>
    </div>
  )
}
