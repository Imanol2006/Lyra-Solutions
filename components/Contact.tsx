'use client'
import { useState } from 'react'
import FadeIn from './FadeIn'

export default function Contact() {
  const [hovered, setHovered] = useState(false)

  return (
    <section
      id="contact"
      style={{
        position: 'relative', zIndex: 1,
        padding: '110px 0 150px',
        borderTop: '1px solid rgba(99,101,239,0.11)',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 clamp(22px,4vw,48px)' }}>
        <FadeIn>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'center', gap: 72,
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(1.9rem, 3.8vw, 3.3rem)',
                fontWeight: 800, letterSpacing: '-0.033em',
                lineHeight: 1.05, maxWidth: 520,
              }}>
                Want to see what your<br />
                <em style={{ fontStyle: 'normal', color: '#6365EF' }}>site could look like?</em>
              </h2>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontSize: '0.7rem', color: '#7A8499',
                letterSpacing: '0.08em', marginTop: 22,
              }}>
                <span className="loc-dot" />
                El Paso, TX · Ciudad Juárez, MX
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14 }}>
              <p style={{ fontSize: '0.75rem', color: '#7A8499', lineHeight: 1.6 }}>
                Send us a message and we will<br />get back to you the same day.
              </p>

              <a
                href="mailto:team@lyrasolutions.dev"
                data-hover
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  background: '#6365EF', color: '#fff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.06em',
                  padding: '16px 32px',
                  position: 'relative', overflow: 'hidden',
                  transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: hovered ? '0 14px 38px rgba(99,101,239,0.38)' : 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                Send us a message
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 4 }}>
                <SocLink href="https://instagram.com/lyrasolutions__" label="@lyrasolutions__">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </SocLink>
                <SocLink href="https://facebook.com" label="Lyra Solutions">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </SocLink>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function SocLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-hover
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        fontSize: '0.75rem',
        color: hov ? '#EEF0FF' : '#7A8499',
        textDecoration: 'none', letterSpacing: '0.04em',
        transition: 'color 0.2s',
      }}
    >
      {children}
      {label}
    </a>
  )
}
