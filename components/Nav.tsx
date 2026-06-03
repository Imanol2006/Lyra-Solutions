'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#process',  label: 'Process'  },
  { href: '#pricing',  label: 'Pricing'  },
  { href: '#about',    label: 'About'    },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px clamp(22px,4vw,48px)',
        background: scrolled ? 'rgba(4,4,10,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,102,241,0.11)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <a
        href="#"
        onClick={scrollTo('#hero')}
        data-hover
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image
          src="/logo.png"
          alt="Lyra Solutions"
          width={140}
          height={50}
          priority
          style={{
            width: 'auto',
            height: '100px',
            objectFit: 'contain',
          }}
        />
      </a>

      <ul className="hidden md:flex items-center gap-9 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              onClick={scrollTo(href)}
              data-hover
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: '0.75rem',
                fontWeight: 400,
                color: '#7A8499',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#EEF0FF')}
              onMouseLeave={e => (e.currentTarget.style.color = '#7A8499')}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="mailto:team@lyrasolutions.dev"
        data-hover
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: '0.75rem',
          fontWeight: 500,
          color: '#EEF0FF',
          textDecoration: 'none',
          letterSpacing: '0.06em',
          padding: '8px 20px',
          border: '1px solid rgba(99,102,241,0.32)',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(99,102,241,0.12)'
          e.currentTarget.style.borderColor = '#6366F1'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.32)'
        }}
      >
        Get in Touch
      </a>
    </motion.nav>
  )
}
