'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { WorkGridCard } from '@/components/ui/work-card'
import { ArrowLeft, ChevronDown, Check, X } from 'lucide-react'

// Filter options
const PLATFORMS = ['Web', 'iOS', 'SaaS', 'Metaverse'] as const
const FOCUSES = ['Systems', 'E-Commerce', 'AI', 'Data'] as const
const CONTEXTS = ['Enterprise', 'B2B', '0 → 1', 'Physical'] as const

interface Project {
  slug: string
  title: string
  sentence: string
  tags: string[]
  year: string
  image: string
  platform: string[]
  focus: string[]
  context: string[]
}

interface MultiSelectDropdownProps {
  label: string
  options: readonly string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

function MultiSelectDropdown({ label, options, selected, onChange }: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  const displayLabel = selected.length > 0 
    ? `${label} (${selected.length})` 
    : `${label} (All)`

  return (
    <div ref={dropdownRef} className="project-filter-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="project-filter-dropdown-trigger"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{displayLabel}</span>
        <ChevronDown 
          size={16} 
          style={{ 
            transition: 'transform 0.15s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }} 
        />
      </button>
      {isOpen && (
        <div className="project-filter-dropdown-menu" role="listbox">
          <div className="project-filter-dropdown-options">
            {options.map((option) => {
              const isSelected = selected.includes(option)
              return (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={`project-filter-dropdown-item ${isSelected ? 'selected' : ''}`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="project-filter-checkbox">
                    {isSelected && <Check size={12} />}
                  </span>
                  <span>{option}</span>
                </button>
              )
            })}
          </div>
          {/* Close button for mobile - full width at bottom */}
          <button
            className="project-filter-dropdown-close"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      )}
      <style>{`
        .project-filter-dropdown {
          position: relative;
          flex: 1;
          min-width: 0;
        }
        @media (min-width: 640px) {
          .project-filter-dropdown {
            flex: none;
            width: auto;
            min-width: 140px;
          }
        }
        .project-filter-dropdown-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid var(--border-light);
          background-color: var(--card-bg, #fff);
          color: var(--text-primary, #333);
        }
        .project-filter-dropdown-trigger:hover {
          border-color: var(--text-muted);
        }
        /* Dropdown menu - fully opaque background */
        .project-filter-dropdown-menu {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          z-index: 50;
          background-color: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 10px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          max-height: 320px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        :root.dark .project-filter-dropdown-menu {
          background-color: #1a1a1a;
        }
        .project-filter-dropdown-options {
          flex: 1;
          overflow-y: auto;
          padding: 6px;
        }
        /* Close button - full width at bottom, mobile only */
        .project-filter-dropdown-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 12px 16px;
          border: none;
          border-top: 1px solid var(--border-light);
          background-color: rgba(0, 0, 0, 0.06);
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary, #333);
          border-radius: 0 0 10px 10px;
          transition: background-color 0.1s ease;
        }
        :root.dark .project-filter-dropdown-close {
          background-color: rgba(255, 255, 255, 0.08);
        }
        .project-filter-dropdown-close:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        :root.dark .project-filter-dropdown-close:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }
        @media (min-width: 640px) {
          .project-filter-dropdown-close {
            display: none;
          }
          .project-filter-dropdown-menu {
            max-height: 280px;
          }
          .project-filter-dropdown-options {
            padding: 6px;
          }
        }
        .project-filter-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          text-align: left;
          border-radius: 6px;
          color: var(--text-primary, #333);
          transition: background-color 0.1s ease;
        }
        .project-filter-dropdown-item:hover {
          background-color: rgba(0, 0, 0, 0.08);
        }
        :root.dark .project-filter-dropdown-item:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .project-filter-dropdown-item.selected {
          background-color: rgba(255, 165, 0, 0.15);
        }
        .project-filter-dropdown-item.selected:hover {
          background-color: rgba(255, 165, 0, 0.25);
        }
        /* Checkbox - light mode */
        .project-filter-checkbox {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1.5px solid rgba(0, 0, 0, 0.4);
          background-color: transparent;
          flex-shrink: 0;
          transition: all 0.1s ease;
          color: #000;
        }
        /* Checkbox - dark mode */
        :root.dark .project-filter-checkbox {
          border-color: rgba(255, 255, 255, 0.6);
          color: #fff;
        }
        /* Selected checkbox - light mode */
        .project-filter-dropdown-item.selected .project-filter-checkbox {
          background-color: #FFA500;
          border-color: #FFA500;
          color: #000;
        }
        /* Selected checkbox - dark mode */
        :root.dark .project-filter-dropdown-item.selected .project-filter-checkbox {
          background-color: #FFA500;
          border-color: #FFA500;
          color: #000;
        }
      `}</style>
    </div>
  )
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedFocuses, setSelectedFocuses] = useState<string[]>([])
  const [selectedContexts, setSelectedContexts] = useState<string[]>([])

  const hasActiveFilters = selectedPlatforms.length > 0 || selectedFocuses.length > 0 || selectedContexts.length > 0

  const clearFilters = () => {
    setSelectedPlatforms([])
    setSelectedFocuses([])
    setSelectedContexts([])
  }

  // Filtering logic:
  // - No filters = show all
  // - Platform selected = project must match at least one selected platform
  // - Focus selected = project must match at least one selected focus
  // - Context selected = project must match at least one selected context
  // - Multiple dimensions = AND logic between dimensions
  const filteredProjects = projects.filter((project) => {
    const matchesPlatform = selectedPlatforms.length === 0 || 
      project.platform.some((p) => selectedPlatforms.includes(p))
    
    const matchesFocus = selectedFocuses.length === 0 || 
      project.focus.some((f) => selectedFocuses.includes(f))
    
    const matchesContext = selectedContexts.length === 0 || 
      project.context.some((c) => selectedContexts.includes(c))
    
    return matchesPlatform && matchesFocus && matchesContext
  })

  return (
    <div className="card-container">
      {/* Header - Theme toggle aligned right, matching project detail pages */}
      <header style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link 
            href="/" 
            className="back-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.15s ease',
            }}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <ThemeToggle />
        </div>
        {/* Large title matching project detail typography */}
        <h1 style={{ 
          fontSize: 'clamp(1.875rem, 5vw, 2.5rem)', 
          fontWeight: 600, 
          margin: '0 0 10px 0',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}>
          All Projects
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: 'var(--text-muted)', 
          margin: 0,
        }}>
          Selected work across web, mobile, and enterprise design.
        </p>
      </header>

      {/* Filter Bar - Three Dropdowns + Clear Button */}
      <div className="project-filter-bar">
        <div className="project-filter-dropdowns">
          <MultiSelectDropdown
            label="Platform"
            options={PLATFORMS}
            selected={selectedPlatforms}
            onChange={setSelectedPlatforms}
          />
          <MultiSelectDropdown
            label="Focus"
            options={FOCUSES}
            selected={selectedFocuses}
            onChange={setSelectedFocuses}
          />
          <MultiSelectDropdown
            label="Context"
            options={CONTEXTS}
            selected={selectedContexts}
            onChange={setSelectedContexts}
          />
        </div>
        <button
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className={`project-filter-clear-btn ${hasActiveFilters ? 'active' : ''}`}
        >
          <X size={14} />
          <span>Clear Filters</span>
        </button>
        <style>{`
          .project-filter-bar {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 16px 0;
            margin-bottom: 8px;
          }
          @media (min-width: 640px) {
            .project-filter-bar {
              flex-direction: row;
              align-items: center;
              gap: 12px;
            }
          }
          .project-filter-dropdowns {
            display: flex;
            flex-direction: row;
            gap: 10px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .project-filter-dropdowns {
              width: auto;
            }
          }
          .project-filter-clear-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 10px 16px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.15s ease;
            border: 1px solid var(--border-light);
            background-color: transparent;
            color: var(--text-muted);
            width: 100%;
          }
          @media (min-width: 640px) {
            .project-filter-clear-btn {
              width: auto;
            }
          }
          .project-filter-clear-btn:not(:disabled):hover {
            border-color: #FFA500;
            color: #FFA500;
            background-color: rgba(255, 165, 0, 0.08);
          }
          .project-filter-clear-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
          /* Active state - when filters are applied */
          .project-filter-clear-btn.active {
            color: #000;
            border-color: rgba(0, 0, 0, 0.3);
          }
          :root.dark .project-filter-clear-btn.active {
            color: #fff;
            border-color: rgba(255, 255, 255, 0.3);
          }
          .project-filter-clear-btn.active:hover {
            border-color: #FFA500;
            color: #FFA500;
            background-color: rgba(255, 165, 0, 0.08);
          }
        `}</style>
      </div>

      {/* Projects Grid - 2 cols desktop, 1 mobile, 20px gap */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '20px',
      }}
      className="projects-grid"
      >
        <style>{`
          @media (min-width: 640px) {
            .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        {filteredProjects.map((project) => (
          <WorkGridCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            sentence={project.sentence}
            tags={project.tags}
            year={project.year}
            image={project.image}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>No projects found for these filters.</p>
          <button 
            onClick={clearFilters} 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid #FFA500',
              backgroundColor: 'transparent',
              color: '#FFA500',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 165, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <X size={14} />
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

