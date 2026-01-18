'use client'

import { useState } from 'react'
import Image from 'next/image'

interface TabContent {
  id: string
  label: string
  images: {
    src: string
    caption?: string
  }[]
}

interface TabbedSectionProps {
  title?: string
  tabs: TabContent[]
}

export function TabbedSection({ title, tabs }: TabbedSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  const activeContent = tabs.find((t) => t.id === activeTab)

  return (
    <div className="w-full">
      {/* Title - centered */}
      {title && (
        <h3 className="font-serif text-2xl md:text-3xl italic text-white text-center mb-8">
          {title}
        </h3>
      )}

      {/* Tab navigation - centered */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-black'
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeContent.images.map((image, index) => (
            <figure key={index} className="group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900">
                <Image
                  src={image.src}
                  alt={image.caption || `${activeContent.label} image ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              {image.caption && (
                <figcaption className="mt-2 text-sm text-neutral-400 text-center">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
