'use client'

import { useTheme } from '@/components/theme-provider'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      role="switch"
      aria-checked={theme === 'dark'}
    >
      <span className="theme-toggle-icon sun">
        <Sun size={14} strokeWidth={2.5} />
      </span>
      <span className="theme-toggle-icon moon">
        <Moon size={14} strokeWidth={2.5} />
      </span>
      <span className="theme-toggle-slider" />
    </button>
  )
}
