'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from './chat-provider'
import { Send } from 'lucide-react'

type PillState = 'idle' | 'focused' | 'typing'

export function ChatInputPill() {
  const { setIsOpen, sendMessage, isLoading, placeholderQuestion } = useChat()
  const [input, setInput] = useState('')
  const [pillState, setPillState] = useState<PillState>('idle')
  const [isAnimating, setIsAnimating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Determine if user has typed content
  const hasContent = input.trim().length > 0

  // Update state based on input content
  useEffect(() => {
    if (hasContent) {
      setPillState('typing')
    } else if (pillState === 'typing') {
      setPillState('focused')
    }
  }, [hasContent, pillState])

  const handleFocus = () => {
    if (pillState === 'idle') {
      setIsAnimating(true)
      setPillState('focused')
      // Reset animation flag after animation completes
      setTimeout(() => setIsAnimating(false), 200)
    }
  }

  const handleBlur = () => {
    // Only collapse if no content
    if (!hasContent) {
      setIsAnimating(true)
      setPillState('idle')
      setTimeout(() => setIsAnimating(false), 200)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    const message = input.trim()
    
    // Clear input and collapse pill
    setInput('')
    setIsAnimating(true)
    setPillState('idle')
    setTimeout(() => setIsAnimating(false), 200)
    
    // Open chat panel and send message
    setIsOpen(true)
    await sendMessage(message)
    
    // Blur input after submit
    inputRef.current?.blur()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  // Build dynamic class names for outer container
  const containerClasses = [
    'chat-input-container',
    `chat-input-container--${pillState}`,
    isAnimating ? 'chat-input-container--animating' : ''
  ].filter(Boolean).join(' ')

  // Gradient wrapper classes (owns the ::before pseudo-element)
  const wrapperClasses = [
    'chat-pill-gradient-wrapper',
    `chat-pill-gradient-wrapper--${pillState}`
  ].filter(Boolean).join(' ')

  const pillClasses = [
    'chat-input-pill',
    `chat-input-pill--${pillState}`,
    isAnimating ? 'chat-input-pill--bounce' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      {/* Gradient border wrapper */}
      <div className={wrapperClasses}>
        <form onSubmit={handleSubmit} className={pillClasses}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholderQuestion}
            disabled={isLoading}
            aria-label="Ask a question"
          />
          <button
            type="submit"
            disabled={!hasContent || isLoading}
            aria-label="Send message"
            className={`chat-input-pill-submit ${hasContent ? 'chat-input-pill-submit--visible' : ''}`}
            tabIndex={hasContent ? 0 : -1}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}



