'use client'
import { useState } from 'react'
import FadeIn from './FadeIn'

const steps = [
  {
    n: '01',
    title: 'We build your demo',
    desc: 'Before you pay anything, we build a working version of your site. You can see exactly how it looks and how it works.',
  },
  {
    n: '02',
    title: 'You review it',
    desc: 'We go over it together and you tell us what to change. We adjust until you are happy with it.',
  },
  {
    n: '03',
    title: 'We launch it',
    desc: 'Once you approve it, we put it live. We handle the domain, hosting, and all the technical setup. You just share the link.',
  },
]

export default function Process() {
  return (
    <section
      id="process"
      style={{
        position: 'relative', zIndex: 1,
        padding: '110px 0',
        borderTop: '1px solid rgba(99,102,241,0.11)',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 clamp(22px,4vw,48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <FadeIn>
            <p className="section-label" style={{ justifyContent: 'center' }}>How It Works</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)',
              fontWeight: 700, letterSpacing: '-0.022em', marginTop: 10,
            }}>
              Three steps. No surprises.
            </h2>
          </FadeIn>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          position: 'relative',
        }}>
          {steps.map(({ n, title, desc }, i) => (
            <StepCard key={n} n={n} title={title} desc={desc} delay={i * 0.12} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ n, title, desc, delay, isLast }: { n: string; title: string; desc: string; delay: number; isLast: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <FadeIn delay={delay}>
      <div
        style={{ padding: '0 44px', textAlign: 'center' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 54, height: 54,
          border: `1px solid ${hovered ? '#6366F1' : 'rgba(99,102,241,0.32)'}`,
          borderRadius: '50%',
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: '1.05rem', fontWeight: 800, color: '#6366F1',
          marginBottom: 28, position: 'relative', zIndex: 1,
          background: hovered ? 'rgba(99,102,241,0.12)' : '#04040A',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'all 0.3s',
        }}>
          {n}
        </div>
        <div style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: '1.05rem', fontWeight: 700,
          letterSpacing: '-0.01em', marginBottom: 10,
        }}>
          {title}
        </div>
        <p style={{ fontSize: '0.8125rem', color: '#7A8499', lineHeight: 1.72, maxWidth: 270, margin: '0 auto' }}>
          {desc}
        </p>
      </div>
    </FadeIn>
  )
}
