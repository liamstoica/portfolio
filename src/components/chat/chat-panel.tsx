'use client'

import { useRef, useEffect, useState } from 'react'
import { useChat } from './chat-provider'
import { X, Loader2, Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

// Default quick suggestions
const DEFAULT_SUGGESTIONS = [
  "Why should I hire Liam?",
  "What are Liam's top 3 strengths?",
  "What makes Liam different?",
  "Want to learn a fun fact about Liam?"
]

// Quick Suggestions Component
function QuickSuggestions({ 
  suggestions = DEFAULT_SUGGESTIONS, 
  onSelect 
}: { 
  suggestions?: string[]
  onSelect: (question: string) => void 
}) {
  return (
    <div className="quick-suggestions">
      <span className="quick-suggestions-label">Continue exploring:</span>
      <div className="quick-suggestions-pills">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="quick-suggestion-pill"
            type="button"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

export function ChatPanel() {
  const { isOpen, setIsOpen, messages, isLoading, sendMessage, placeholderQuestion } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const message = input.trim()
    setInput('')
    await sendMessage(message)
  }

  const handleQuickSelect = async (question: string) => {
    if (isLoading) return
    await sendMessage(question)
  }

  // Check if last message is from assistant (to show suggestions)
  const lastMessage = messages[messages.length - 1]
  const showSuggestions = !isLoading && lastMessage?.role === 'assistant'

  return (
    <>
      {/* Backdrop */}
      <div
        className={`chat-panel-backdrop ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`chat-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Chat with Liam's AI assistant"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="chat-panel-header">
          <h2 className="chat-panel-title">Ask me anything</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="chat-panel-close"
            aria-label="Close chat"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-panel-messages">
          {messages.length === 0 ? (
            <div className="chat-panel-empty">
              <h3>Hi, I&apos;m Liam&apos;s assistant</h3>
              <p>Ask me about Liam&apos;s work, experience, design philosophy, or anything you&apos;d like.</p>
              <QuickSuggestions onSelect={handleQuickSelect} />
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={message.id} className={`chat-message ${message.role}`}>
                  <div className="chat-message-bubble">
                    <div className="chat-message-content">
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          h1: ({ children }) => <h1 className="chat-title">{children}</h1>,
                          h2: ({ children }) => <h2 className="chat-title">{children}</h2>,
                          h3: ({ children }) => <h3 className="chat-title">{children}</h3>,
                          h4: ({ children }) => <h4 className="chat-title">{children}</h4>,
                          strong: ({ children }) => <strong className="chat-bold">{children}</strong>,
                          em: ({ children }) => <em className="chat-italic">{children}</em>,
                          p: ({ children }) => <p className="chat-paragraph">{children}</p>,
                          ul: ({ children }) => <ul className="chat-list">{children}</ul>,
                          li: ({ children }) => <li className="chat-list-item">{children}</li>,
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="chat-link">
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  {/* Show suggestions after the last assistant message */}
                  {message.role === 'assistant' && index === messages.length - 1 && !isLoading && (
                    <QuickSuggestions onSelect={handleQuickSelect} />
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="chat-message assistant">
                  <div className="chat-message-bubble chat-loading">
                    <Loader2 size={14} className="animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="chat-panel-input-wrapper">
          <div className="chat-panel-input">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholderQuestion}
              disabled={isLoading}
              aria-label="Type your message"
              autoComplete="off"
            />
            <button type="submit" disabled={!input.trim() || isLoading} aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
