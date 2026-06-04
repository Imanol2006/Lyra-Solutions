'use client'
import { useState } from 'react'
import FadeIn from './FadeIn'

const tiers = [
  {
    name: 'Starter',
    tagline: 'Get online fast with a clean one-page site.',
    price: '$150',
    suffix: '',
    note: 'One-time payment',
    featured: false,
    features: [
      'Single-page site',
      'Mobile friendly',
      'Contact section and map',
      'Deployed on your domain',
      '2 rounds of revisions',
    ],
    subject: 'Starter Website',
  },
  {
    name: 'Standard',
    tagline: 'A full site with everything a local business needs.',
    price: '$300',
    suffix: '+',
    note: 'One-time payment',
    featured: true,
    badge: 'Most Common',
    features: [
      'Multi-section website',
      'Contact form',
      'SEO setup included',
      'Google Maps integration',
      'Mobile friendly',
      '2 rounds of revisions',
    ],
    subject: 'Standard Website',
  },
  {
    name: 'Premium',
    tagline: 'Full site plus AI chatbot and everything custom.',
    price: '$500',
    suffix: ' – $1,000+',
    note: 'One-time payment',
    featured: false,
    features: [
      'Everything in Standard',
      'AI chatbot for lead capture',
      'Custom design and animations',
      'Advanced SEO setup',
      'Priority build time',
      '3 rounds of revisions',
    ],
    subject: 'Premium Website',
  },
]

function PricingCard({ tier, delay }: { tier: typeof tiers[0]; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <FadeIn delay={delay}>
      <div
        data-hover
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `1px solid ${tier.featured ? 'rgba(99,101,239,0.45)' : hovered ? 'rgba(99,101,239,0.32)' : 'rgba(99,101,239,0.11)'}`,
          padding: '44px 40px',
          position: 'relative',
          background: tier.featured ? 'rgba(8,8,18,0.5)' : 'transparent',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.3s',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at top left, rgba(99,101,239,0.055) 0%, transparent 55%)',
          opacity: tier.featured || hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }} />

        {tier.badge && (
          <div style={{
            display: 'inline-block',
            fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#6365EF',
            border: '1px solid rgba(99,101,239,0.45)',
            padding: '4px 10px', marginBottom: 24,
          }}>
            {tier.badge}
          </div>
        )}

        <div style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: '1.4rem', fontWeight: 700,
          letterSpacing: '-0.02em', marginBottom: 7,
        }}>
          {tier.name}
        </div>

        <div style={{ fontSize: '0.8125rem', color: '#7A8499', marginBottom: 32, lineHeight: 1.5 }}>
          {tier.tagline}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 7 }}>
          <span style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.04em',
          }}>
            {tier.price}
          </span>
          {tier.suffix && (
            <span style={{ fontSize: '0.8125rem', color: '#7A8499' }}>{tier.suffix}</span>
          )}
        </div>

        <div style={{ fontSize: '0.75rem', color: '#7A8499', marginBottom: 36 }}>{tier.note}</div>

        <div style={{ height: 1, background: 'rgba(99,101,239,0.11)', marginBottom: 28 }} />

        <ul style={{
          listStyle: 'none', marginBottom: 40,
          display: 'flex', flexDirection: 'column', gap: 12, flex: 1,
        }}>
          {tier.features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.8125rem', color: '#7A8499' }}>
              <span style={{ display: 'inline-block', width: 14, height: 1, background: '#6365EF', flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>

        <a
          href={`mailto:team@lyrasolutions.dev?subject=${encodeURIComponent(tier.subject)}`}
          data-hover
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.04em',
            textDecoration: 'none',
            padding: '13px 26px',
            border: '1px solid rgba(99,101,239,0.32)',
            color: '#EEF0FF',
            position: 'relative', overflow: 'hidden',
            background: tier.featured ? '#6365EF' : 'transparent',
            borderColor: tier.featured ? '#6365EF' : 'rgba(99,101,239,0.32)',
            transition: 'transform 0.2s, border-color 0.2s',
            transform: 'translateX(0)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#6365EF'
            e.currentTarget.style.transform = 'translateX(4px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = tier.featured ? '#6365EF' : 'rgba(99,101,239,0.32)'
            e.currentTarget.style.transform = 'translateX(0)'
          }}
        >
          Get started
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5h9M8 3l3 3.5-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </FadeIn>
  )
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      style={{
        position: 'relative', zIndex: 1,
        padding: '110px 0',
        borderTop: '1px solid rgba(99,101,239,0.11)',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 clamp(22px,4vw,48px)' }}>
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <FadeIn><p className="section-label">Pricing</p></FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)',
              fontWeight: 700, letterSpacing: '-0.022em',
              marginTop: 10, marginBottom: 14,
            }}>
              Simple pricing.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: '0.9rem', color: '#7A8499', lineHeight: 1.65 }}>
              Three options, all one-time payments. Pick what fits your budget and what you need right now.
            </p>
          </FadeIn>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
        }}>
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} delay={i * 0.1} />
          ))}
        </div>

        {/* Managed / Transfer note */}
        <FadeIn delay={0.3}>
          <div style={{
            marginTop: 18, border: '1px solid rgba(99,101,239,0.11)',
            padding: 'clamp(20px,3vw,28px) clamp(22px,3vw,36px)',
            display: 'grid',
            gridTemplateColumns: '1fr 1px 1fr',
            gap: 32, alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: '0.875rem', fontWeight: 700, marginBottom: 6,
              }}>
                Managed Plan
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#7A8499', lineHeight: 1.6 }}>
                We keep the site live, updated, and working. $50 to $150 per month depending on your site. Cancel anytime.
              </p>
            </div>
            <div className="pnote-divider" />
            <div>
              <div style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: '0.875rem', fontWeight: 700, marginBottom: 6,
              }}>
                Full Ownership Transfer
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#7A8499', lineHeight: 1.6 }}>
                You get all the files and we help you set up your own hosting. Available as a premium add-on. No monthly fees, no ongoing support from us.
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
