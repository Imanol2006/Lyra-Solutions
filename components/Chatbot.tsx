'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  'What do you build?',
  'How much does a website cost?',
  'How long does it take?',
  'Do you work with businesses in Juárez?',
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (open && !started) {
      setMessages([{
        role: 'assistant',
        content: "Hey! I'm the Lyra assistant. Ask me anything about our services, pricing, or how we work.",
      }])
      setStarted(true)
    }
  }, [open, started])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || streaming) return

    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setInput('')
    setStreaming(true)

    const assistantIndex = newMessages.length
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    const abort = new AbortController()
    abortRef.current = abort

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
        signal: abort.signal,
      })

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => 'no body')
        throw new Error(`HTTP ${res.status}: ${errText}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (!raw) continue

          const event = JSON.parse(raw)
          if (event.type === 'text') {
            setMessages(prev => {
              const updated = [...prev]
              updated[assistantIndex] = {
                role: 'assistant',
                content: updated[assistantIndex].content + event.text,
              }
              return updated
            })
          }
          if (event.type === 'error') {
            setMessages(prev => {
              const updated = [...prev]
              updated[assistantIndex] = { role: 'assistant', content: `Error: ${event.message}` }
              return updated
            })
            break
          }
          if (event.type === 'done') break
        }
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') return
      setMessages(prev => {
        const updated = [...prev]
        updated[assistantIndex] = {
          role: 'assistant',
          content: `Error: ${(err as Error).message}`,
        }
        return updated
      })
    } finally {
      setStreaming(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const showSuggested = messages.length <= 1 && !streaming

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 200,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 24px rgba(99,102,241,0.45)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20" height="20" viewBox="0 0 20 20" fill="none"
            >
              <path d="M5 5l10 10M15 5L5 15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="22" height="22" viewBox="0 0 22 22" fill="none"
            >
              <path d="M11 2C6.03 2 2 5.69 2 10.2c0 2.4 1.1 4.56 2.87 6.1L4 20l4.13-1.72C9.35 18.73 10.16 19 11 19c4.97 0 9-3.69 9-8.2C20 5.69 15.97 2 11 2z" fill="#fff" fillOpacity=".9"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 96,
              right: 28,
              zIndex: 200,
              width: 'min(380px, calc(100vw - 40px))',
              height: 'min(560px, calc(100vh - 120px))',
              background: '#0C0C18',
              border: '1px solid rgba(99,102,241,0.22)',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(99,102,241,0.14)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(99,102,241,0.06)',
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2C6.03 2 2 5.69 2 10.2c0 2.4 1.1 4.56 2.87 6.1L4 20l4.13-1.72C9.35 18.73 10.16 19 11 19c4.97 0 9-3.69 9-8.2C20 5.69 15.97 2 11 2z" fill="#fff"/>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#EEF0FF', margin: 0 }}>
                  Lyra Assistant
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399' }} />
                  <p style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '0.65rem', color: '#7A8499', margin: 0 }}>
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 16px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(99,102,241,0.2) transparent',
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #6366F1, #818CF8)'
                      : 'rgba(255,255,255,0.05)',
                    border: msg.role === 'assistant' ? '1px solid rgba(99,102,241,0.12)' : 'none',
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: '0.8rem',
                    lineHeight: 1.6,
                    color: msg.role === 'user' ? '#fff' : '#C8CCDA',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {msg.content}
                    {msg.role === 'assistant' && streaming && i === messages.length - 1 && msg.content === '' && (
                      <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', height: 14 }}>
                        {[0, 1, 2].map(d => (
                          <span key={d} style={{
                            width: 4, height: 4, borderRadius: '50%',
                            background: '#6366F1',
                            display: 'inline-block',
                            animation: `bounce 1.2s ease-in-out ${d * 0.2}s infinite`,
                          }} />
                        ))}
                      </span>
                    )}
                    {msg.role === 'assistant' && streaming && i === messages.length - 1 && msg.content !== '' && (
                      <span style={{
                        display: 'inline-block',
                        width: 2,
                        height: '0.85em',
                        background: '#6366F1',
                        marginLeft: 2,
                        animation: 'blink 0.8s step-end infinite',
                        verticalAlign: 'middle',
                      }} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Suggested questions */}
              {showSuggested && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}
                >
                  {SUGGESTED.map(q => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      style={{
                        fontFamily: 'var(--font-syne), sans-serif',
                        fontSize: '0.68rem',
                        color: '#818CF8',
                        background: 'rgba(99,102,241,0.08)',
                        border: '1px solid rgba(99,102,241,0.22)',
                        borderRadius: 20,
                        padding: '5px 11px',
                        cursor: 'pointer',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(99,102,241,0.18)'
                        e.currentTarget.style.borderColor = '#6366F1'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.22)'
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '12px 14px',
              borderTop: '1px solid rgba(99,102,241,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(0,0,0,0.2)',
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything..."
                disabled={streaming}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(99,102,241,0.18)',
                  borderRadius: 10,
                  padding: '9px 14px',
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: '0.78rem',
                  color: '#EEF0FF',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)')}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || streaming}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: input.trim() && !streaming ? '#6366F1' : 'rgba(99,102,241,0.2)',
                  border: 'none',
                  cursor: input.trim() && !streaming ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M13.5 7.5L2 2l2 5.5-2 5.5 11.5-5.5z" fill="#fff" fillOpacity={input.trim() && !streaming ? 1 : 0.4}/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  )
}
