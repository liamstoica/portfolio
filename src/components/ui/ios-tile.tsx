'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface IosTileProps {
  href: string
  label: string
  image?: string
  isExternal?: boolean
  color?: string
}

export function IosTile({ href, label, image, isExternal = false, color }: IosTileProps) {
  const tileStyle = color ? { backgroundColor: color } : undefined

  const content = (
    <>
      <div className="ios-tile-icon" style={tileStyle}>
        {image && (
          <Image
            src={image}
            alt={label}
            fill
            className="ios-tile-image"
            sizes="72px"
          />
        )}

        {isExternal && (
          <span className="ios-tile-external">
            <ExternalLink />
          </span>
        )}
      </div>

      <span className="ios-tile-label">{label}</span>
    </>
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="ios-tile">
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="ios-tile">
      {content}
    </Link>
  )
}

