'use client'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid rgba(99,102,241,0.11)',
      padding: '28px clamp(22px,4vw,48px)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
    }}>
      <Image
        src="/logo.png"
        alt="Lyra Solutions"
        width={100}
        height={100}
        style={{ width: 'auto', height: '32px', objectFit: 'contain' }}
      />

      <p style={{ fontSize: '0.7rem', color: '#7A8499' }}>
        © 2026 Lyra Solutions, El Paso, TX
      </p>

      <ul style={{ display: 'flex', gap: 24, listStyle: 'none' }}>
        {[
          { href: 'mailto:team@lyrasolutions.dev', label: 'team@lyrasolutions.dev' },
          { href: 'https://instagram.com/lyrasolutions__', label: '@lyrasolutions__' },
        ].map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ fontSize: '0.7rem', color: '#7A8499', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#EEF0FF')}
              onMouseLeave={e => (e.currentTarget.style.color = '#7A8499')}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
