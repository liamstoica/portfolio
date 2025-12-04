'use client'

import { useEffect, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X } from 'lucide-react'

interface ImageLightboxProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({ src, alt, isOpen, onClose }: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false)

  // Ensure we're on the client before using portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || !mounted) return null

  const modalContent = (
    <div 
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button 
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close preview"
      >
        <X size={24} />
      </button>
      <div 
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lightbox-image-wrapper">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="95vw"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </div>
  )

  // Render portal to document.body for true full-screen overlay
  return createPortal(modalContent, document.body)
}
