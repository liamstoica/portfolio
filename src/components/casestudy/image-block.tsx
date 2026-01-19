'use client'

import Image from 'next/image'

interface ImageBlockProps {
  src: string
  alt: string
  caption?: string
  aspectRatio?: 'auto' | '16/9' | '21/9' | '4/3' | '1/1'
  rounded?: boolean
}

export function ImageBlock({
  src,
  alt,
  caption,
  aspectRatio = '16/9',
  rounded = true,
}: ImageBlockProps) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm')
  const isGif = src.endsWith('.gif')

  return (
    <figure className="w-full">
      <div
        className={`relative w-full overflow-hidden ${rounded ? 'rounded-2xl md:rounded-3xl' : ''}`}
        style={{ aspectRatio: aspectRatio === 'auto' ? undefined : aspectRatio }}
      >
        {isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill={aspectRatio !== 'auto'}
            width={aspectRatio === 'auto' ? 1920 : undefined}
            height={aspectRatio === 'auto' ? 1080 : undefined}
            className={aspectRatio === 'auto' ? 'w-full h-auto' : 'object-cover'}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-4 text-sm text-neutral-400 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}













