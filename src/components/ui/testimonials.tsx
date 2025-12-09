'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  quote: string
  linkedin: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Dave Bridgeland',
    role: 'Director of Product',
    company: 'DWP&A',
    image: '/images/testimonials/dave-bridgeland.jpeg',
    quote: '"The quality of Liam\’s work was uniformly superb. Every interface he delivered was thoughtful, polished, and grounded in clear product reasoning. He quickly absorbed the business context, made strong UX decisions, and carried himself with the maturity of someone many years into their career."',
    linkedin: 'https://www.linkedin.com/in/bridgeland',
  },
  {
    id: 2,
    name: 'BC Hwang',
    role: 'Chair of UX',
    company: 'SCAD',
    image: '/images/testimonials/bc-hwang.jpg',
    quote: '“Liam consistently stood out as one of the most driven designers in our program. His work showed a rare blend of creativity, strategic thinking, and executional precision. He elevates every project he touches and brings a level of professionalism and initiative that sets him apart.”',
    linkedin: 'https://www.linkedin.com/in/uxking/',
  },
  {
    id: 3,
    name: 'Matthew Alberty',
    role: 'Senior VP Digital Services',
    company: 'Adcetera',
    image: '/images/testimonials/matthew-alberty.jpeg',
    quote: '“Liam demonstrated strong strategic instincts from day one. He understands the business problem before designing the solution and consistently translates strategy into clear, effective digital experiences. His potential as a product designer is exceptional.”',
    linkedin: 'https://www.linkedin.com/in/alberty',
  },
  {
    id: 4,
    name: 'Yoni Rubin',
    role: 'CEO',
    company: 'mrgn',
    image: '/images/testimonials/yoni-rubin.jpeg',
    quote: '“Liam is a rockstar designer who elevated our product both visually and strategically. His work directly strengthened our value story and helped support our successful $2M raise. He brings energy, clarity, and strong product instincts to every challenge.”',
    linkedin: 'https://www.linkedin.com/in/yonirubin',
  },
  {
    id: 5,
    name: 'Kieran Burke',
    role: 'Head of Growth',
    company: 'Track.Tennis',
    image: '/images/testimonials/kieran-burke.jpeg',
    quote: '“Liam quickly understood our industry, uncovered opportunities, and translated them into practical product improvements. His design leadership supported our move into new markets and played a role in securing key partnerships. He brings initiative and strategic perspective beyond his years.”',
    linkedin: 'https://www.linkedin.com/in/kieranburke',
  },
  {
    id: 6,
    name: 'Sarah Baradaran',
    role: 'CPO',
    company: 'mrgn',
    image: '/images/testimonials/sarah-baradaran.jpeg',
    quote: '“Liam was invaluable to our team. He adapted quickly, produced high-quality work at speed, and helped bring structure to an early product. His ability to understand context, communicate clearly, and drive momentum made him a true partner in our progress.”',
    linkedin: 'https://www.linkedin.com/in/sarah-baradaran-24b94364',
  },
  {
    id: 7,
    name: 'Jay Peters',
    role: 'Chair SCAD DMGT',
    company: 'Partner PARK',
    image: '/images/testimonials/jay-peters.jpg',
    quote: '“Liam brings a sharp, strategic mind to every conversation. During his capstone, he demonstrated clarity, intelligence, and the ability to connect design decisions to broader business goals. He is the type of designer who quickly becomes a trusted partner.”',
    linkedin: 'https://www.linkedin.com/in/jaycpeters',
  },
  {
    id: 8,
    name: 'German Arellano',
    role: 'Director of Digital Marketing',
    company: 'Adcetera',
    image: '/images/testimonials/german-are.png',
    quote: '“Liam connects UX principles with marketing and SEO strategy in a way that produces smarter, more holistic design outcomes. He takes initiative, asks the right questions, and consistently delivers with intention. A strong partner for any cross-functional digital team.”',
    linkedin: 'https://www.linkedin.com/in/germanare',
  },
  {
    id: 9,
    name: 'Jon Denham',
    role: 'Chair',
    company: 'SCADpro',
    image: '/images/testimonials/jon-denham.jpg',
    quote: '“During our BMW engagement, Liam emerged as a natural leader when the team needed it most. He stabilized the group, aligned the work, and delivered a clear value story that impressed a major global client. He consistently goes above and beyond to make the work successful.”',
    linkedin: 'https://www.linkedin.com/in/jon-denham-a031895',
  },
  {
    id: 10,
    name: 'Clark Delashmet',
    role: 'Chair of UX',
    company: 'SCAD',
    image: '/images/testimonials/clark-delashmet.jpg',
    quote: '“Liam was always the designer I could count on. He balanced heavy academic and athletic commitments yet still delivered exceptional work, supported his peers, and pushed ideas further than expected. His work ethic and talent set a standard in the program.”',
    linkedin: 'https://www.linkedin.com/in/clark-delashmet-745590156',
  },
  {
    id: 11,
    name: 'Sean Suggs',
    role: 'Director of Digital Services',
    company: 'Adcetera',
    image: '/images/testimonials/sean-suggs.jpeg',
    quote: '“I enjoyed working with Liam because he brings curiosity, drive, and genuine enthusiasm to every project. He learns new tools and technologies quickly and applies them thoughtfully. He elevated the quality of our work and energized the team around him.”',
    linkedin: 'linkedin.com/in/suggs',
  },
  {
    id: 12,
    name: 'John Storey',
    role: 'Professor of Design Management',
    company: 'SCAD',
    image: '/images/testimonials/john-storey.jpeg',
    quote: '“Liam brings a sharp, strategic mind to every conversation. During his capstone, he demonstrated clarity, intelligence, and the ability to connect design decisions to broader business goals. He is the type of designer who quickly becomes a trusted partner.”',
    linkedin: 'linkedin.com/in/john-storey-6a4a63',
  },
]

// Base speed: pixels per millisecond (lower = slower)
const BASE_SPEED = 0.035 // ~50s for full loop at typical width
const HOVER_SPEED = 0.015 // ~50% slower on hover
const SPEED_TRANSITION_RATE = 0.008 // How fast to transition between speeds

export function Testimonials() {
  // Duplicate the array twice for seamless infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]
  
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)
  const currentSpeedRef = useRef(BASE_SPEED)
  const targetSpeedRef = useRef(BASE_SPEED)
  const halfWidthRef = useRef(0)
  const [isHovered, setIsHovered] = useState(false)

  // Measure the width of one full set of cards
  const measureWidth = useCallback(() => {
    if (trackRef.current) {
      const fullWidth = trackRef.current.scrollWidth
      halfWidthRef.current = fullWidth / 2
    }
  }, [])

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = timestamp
    }

    const deltaTime = timestamp - lastTimeRef.current
    lastTimeRef.current = timestamp

    // Smoothly transition current speed toward target speed
    const speedDiff = targetSpeedRef.current - currentSpeedRef.current
    if (Math.abs(speedDiff) > 0.0001) {
      currentSpeedRef.current += speedDiff * Math.min(deltaTime * SPEED_TRANSITION_RATE, 0.1)
    } else {
      currentSpeedRef.current = targetSpeedRef.current
    }

    // Update position
    positionRef.current += currentSpeedRef.current * deltaTime

    // Seamless loop: when we've scrolled past half (one full set), reset to 0
    if (halfWidthRef.current > 0 && positionRef.current >= halfWidthRef.current) {
      positionRef.current = positionRef.current - halfWidthRef.current
    }

    // Apply transform
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-positionRef.current}px)`
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  // Start/stop animation and handle resize
  useEffect(() => {
    measureWidth()
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Handle resize
    const handleResize = () => {
      measureWidth()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [animate, measureWidth])

  // Update target speed based on hover state
  useEffect(() => {
    targetSpeedRef.current = isHovered ? HOVER_SPEED : BASE_SPEED
  }, [isHovered])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <div 
      className="testimonials-wrapper"
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="testimonials-track" ref={trackRef}>
        {duplicatedTestimonials.map((testimonial, index) => (
          <div key={`${testimonial.id}-${index}`} className="testimonial-card">
            {/* Top section: Profile */}
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="testimonial-avatar-img"
                />
              </div>
              <div className="testimonial-info">
                <a 
                  href={testimonial.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="testimonial-name-link"
                >
                  {testimonial.name}
                </a>
                <span className="testimonial-role">
                  {testimonial.role} – {testimonial.company}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="testimonial-divider" />

            {/* Quote */}
            <p className="testimonial-quote">{testimonial.quote}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .testimonials-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          margin-left: calc(-1 * var(--card-padding, 48px));
          margin-right: calc(-1 * var(--card-padding, 48px));
          width: calc(100% + 2 * var(--card-padding, 48px));
        }

        @media (max-width: 640px) {
          .testimonials-wrapper {
            margin-left: calc(-1 * var(--card-padding-mobile, 28px));
            margin-right: calc(-1 * var(--card-padding-mobile, 28px));
            width: calc(100% + 2 * var(--card-padding-mobile, 28px));
          }
        }

        .testimonials-track {
          display: flex;
          gap: 20px;
          width: max-content;
          padding: 8px 0;
          will-change: transform;
        }

        .testimonial-card {
          flex-shrink: 0;
          width: 360px;
          padding: 24px;
          background: var(--tile-bg);
          border-radius: 16px;
          border: 1px solid var(--border-light);
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.04),
            0 4px 16px rgba(0, 0, 0, 0.02);
          transition: box-shadow 0.2s ease;
        }

        @media (max-width: 640px) {
          .testimonial-card {
            width: 320px;
            padding: 16px;
          }
        }

        .testimonial-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .testimonial-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(135deg, var(--accent-soft) 0%, var(--tile-bg) 100%);
          flex-shrink: 0;
        }

        .testimonial-avatar :global(.testimonial-avatar-img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .testimonial-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .testimonial-name-link {
          font-family: var(--font-sans);
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          text-decoration: none;
          transition: text-decoration-thickness 0.2s ease, color 0.2s ease;
        }

        .testimonial-name-link:hover {
          text-decoration: underline;
          text-decoration-thickness: 2px;
        }

        .testimonial-role {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 400;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .testimonial-divider {
          width: 100%;
          height: 1px;
          background: var(--border-light);
          margin: 16px 0;
        }

        .testimonial-quote {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }
      `}</style>
    </div>
  )
}
