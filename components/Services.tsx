'use client'
import { useState } from 'react'
import FadeIn from './FadeIn'

const services = [
  {
    name: 'Website Design',
    desc: 'Built from scratch, not from a template. Works on phones, loads fast, and looks like a real business.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
        <rect x="3" y="6" width="30" height="21" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <line x1="3" y1="12" x2="33" y2="12" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="7" cy="9" r="1.1" fill="currentColor"/>
        <circle cx="11" cy="9" r="1.1" fill="currentColor"/>
        <circle cx="15" cy="9" r="1.1" fill="currentColor"/>
        <line x1="13" y1="31" x2="23" y2="31" stroke="currentColor" strokeWidth="1.4"/>
        <line x1="18" y1="27" x2="18" y2="31" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    name: 'AI Chatbot',
    desc: 'A chat widget that answers common questions and collects contact info from visitors, even when you\'re closed.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
        <path d="M6 8a2 2 0 012-2h20a2 2 0 012 2v14a2 2 0 01-2 2H12l-6 4V8z" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="12" cy="15" r="1.4" fill="currentColor"/>
        <circle cx="18" cy="15" r="1.4" fill="currentColor"/>
        <circle cx="24" cy="15" r="1.4" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'SEO Setup',
    desc: 'We set up your site so Google can find it and understand what you do. Simple stuff that most local sites skip entirely.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
        <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M23 23l7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Monthly Support',
    desc: 'We handle updates, fix anything that breaks, and make changes when you need them.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
        <path d="M18 6v4M18 26v4M6 18h4M26 18h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="18" cy="18" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 10l2.8 2.8M23.2 23.2l2.8 2.8M10 26l2.8-2.8M23.2 12.8l2.8-2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function ServiceCard({ name, desc, icon, delay }: { name: string; desc: string; icon: React.ReactNode; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <FadeIn delay={delay}>
      <div
        data-hover
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? '#0D0D1A' : '#04040A',
          padding: '36px 28px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s',
          cursor: 'default',
          height: '100%',
        }}
      >
        {/* Top line sweep */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: '#6366F1',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }} />

        <div style={{
          color: '#6366F1', opacity: hovered ? 1 : 0.75,
          marginBottom: 20,
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'opacity 0.2s, transform 0.3s',
        }}>
          {icon}
        </div>

        <div style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: '1rem', fontWeight: 700,
          letterSpacing: '-0.01em', marginBottom: 10,
        }}>
          {name}
        </div>

        <p style={{ fontSize: '0.8125rem', color: '#7A8499', lineHeight: 1.65 }}>
          {desc}
        </p>

        {/* Arrow */}
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{
            position: 'absolute', bottom: 26, right: 26,
            color: '#6366F1',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(-7px)',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
        >
          <path d="M3 9h12M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </FadeIn>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ position: 'relative', zIndex: 1, padding: '110px 0' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 clamp(22px,4vw,48px)' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 48, alignItems: 'end', marginBottom: 56,
        }}>
          <div>
            <FadeIn>
              <p className="section-label">What We Build</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)',
                fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.022em',
              }}>
                What we offer
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: '0.9rem', color: '#7A8499', lineHeight: 1.75, maxWidth: 400 }}>
              We build and maintain websites for local businesses in El Paso and Juárez.
            </p>
          </FadeIn>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1px',
          background: 'rgba(99,102,241,0.11)',
          border: '1px solid rgba(99,102,241,0.11)',
        }}>
          {services.map((s, i) => (
            <ServiceCard key={s.name} {...s} delay={i * 0.08} />
          ))}
        </div>

      </div>
    </section>
  )
}
