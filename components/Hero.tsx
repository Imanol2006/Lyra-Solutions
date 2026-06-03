'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Constellation = ({ draw }: { draw: boolean }) => (
  <svg
    viewBox="0 0 400 490"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
  >
    <defs>
      <radialGradient id="vg" cx="50%" cy="17%" r="32%">
        <stop offset="0%" stopColor="#6366F1" stopOpacity=".14" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="200" cy="84" rx="130" ry="110" fill="url(#vg)" />
    <line className={`cl${draw ? ' draw' : ''}`} x1="200" y1="84"  x2="270" y2="196" />
    <line className={`cl${draw ? ' draw' : ''}`} x1="200" y1="84"  x2="130" y2="200" />
    <line className={`cl${draw ? ' draw' : ''}`} x1="130" y1="200" x2="147" y2="338" />
    <line className={`cl${draw ? ' draw' : ''}`} x1="147" y1="338" x2="270" y2="345" />
    <line className={`cl${draw ? ' draw' : ''}`} x1="270" y1="345" x2="270" y2="196" />
    <circle className="star-vega" cx="200" cy="84"  r="5"   fill="#B4BDFF" />
    <circle className="star-sm"   cx="270" cy="196" r="2.5" fill="#EEF0FF" />
    <circle className="star-sm"   cx="130" cy="200" r="2.5" fill="#EEF0FF" />
    <circle className="star-sm"   cx="147" cy="338" r="3"   fill="#EEF0FF" />
    <circle className="star-sm"   cx="270" cy="345" r="2.5" fill="#EEF0FF" />
    <text x="213" y="81" fill="rgba(99,102,241,0.55)" fontFamily="var(--font-syne),sans-serif" fontSize="9.5" letterSpacing=".07em">Vega</text>
    <text x="281" y="197" fill="rgba(99,102,241,0.55)" fontFamily="var(--font-syne),sans-serif" fontSize="9.5" letterSpacing=".07em">ζ</text>
    <text x="116" y="201" fill="rgba(99,102,241,0.55)" fontFamily="var(--font-syne),sans-serif" fontSize="9.5" letterSpacing=".07em" textAnchor="end">ε</text>
    <text x="132" y="351" fill="rgba(99,102,241,0.55)" fontFamily="var(--font-syne),sans-serif" fontSize="9.5" letterSpacing=".07em">β</text>
    <text x="281" y="353" fill="rgba(99,102,241,0.55)" fontFamily="var(--font-syne),sans-serif" fontSize="9.5" letterSpacing=".07em">γ</text>
    <text x="200" y="435" textAnchor="middle" fontFamily="var(--font-syne),sans-serif" fontSize="11" letterSpacing=".28em" fill="rgba(99,102,241,.3)" fontWeight="600">LYRA</text>
  </svg>
)

export default function Hero() {
  const [draw, setDraw] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDraw(true), 900)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        padding: 'clamp(96px,12vh,130px) clamp(22px,4vw,48px) 80px',
        overflow: 'hidden',
      }}
    >
      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 2, maxWidth: 660 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#6366F1', marginBottom: 26,
        }}>
          <span style={{ width: 4, height: 4, background: '#6366F1', borderRadius: '50%', display: 'inline-block' }} />
          El Paso · Ciudad Juárez
        </div>

        <h1 style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: '-0.035em',
          marginBottom: 26,
          color: '#EEF0FF',
        }}>
          Your next client<br />
          is searching for you.<br />
          <em style={{ fontStyle: 'normal', color: '#6366F1' }}>Are they finding you?</em>
        </h1>

        <p style={{
          fontSize: '1rem', fontWeight: 300, color: '#7A8499',
          lineHeight: 1.75, maxWidth: 460, marginBottom: 44,
        }}>
          We build websites for local businesses in El Paso and Juárez. Fast, clean, and set up to show up when someone searches for what you do.
        </p>

        <a
          href="#contact"
          onClick={scrollTo('#contact')}
          data-hover
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 11,
            background: '#6366F1', color: '#fff', textDecoration: 'none',
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.04em',
            padding: '15px 30px', position: 'relative', overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.35)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Start getting found
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>

      {/* Constellation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.9 }}
        style={{
          position: 'absolute', right: '7%', top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(400px, 38vw)',
          zIndex: 1,
          display: 'none',
        }}
        className="lg:block"
      >
        <Constellation draw={draw} />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        style={{
          position: 'absolute', bottom: 38, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
          color: '#7A8499', fontSize: '0.625rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', zIndex: 2,
        }}
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  )
}
