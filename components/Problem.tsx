'use client'
import FadeIn from './FadeIn'

const stats = [
  { n: '75%',   d: 'of consumers judge a business\'s credibility based on its website design' },
  { n: '3 sec', d: 'is how long visitors wait before leaving a slow or confusing site' },
  { n: '46%',   d: 'of all Google searches are looking for local businesses near them' },
]

export default function Problem() {
  return (
    <section
      id="problem"
      style={{
        position: 'relative', zIndex: 1,
        padding: '110px 0',
        borderTop: '1px solid rgba(99,101,239,0.11)',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 clamp(22px,4vw,48px)' }}>
        <div style={{ maxWidth: 840 }}>
          <FadeIn>
            <p className="section-label">The Problem</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)',
              fontWeight: 700, lineHeight: 1.18,
              letterSpacing: '-0.022em', marginBottom: 28,
            }}>
              Someone in El Paso is searching for what you offer right now.<br />
              <span style={{ color: '#7A8499' }}>If they can&apos;t find you online, they&apos;re going somewhere else.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ fontSize: '1rem', color: '#7A8499', lineHeight: 1.8, maxWidth: 660 }}>
              Most local businesses either have no website or one that hasn&apos;t been touched in years.
              People look you up online before they call, and if the site looks bad or doesn&apos;t load
              on their phone, they just move on to the next result.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px',
              background: 'rgba(99,101,239,0.11)',
              border: '1px solid rgba(99,101,239,0.11)',
              marginTop: 56,
            }}>
              {stats.map(({ n, d }) => (
                <div
                  key={n}
                  data-hover
                  style={{
                    background: '#04040A', padding: '30px 26px',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0D0D1A')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#04040A')}
                >
                  <div style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: '2.4rem', fontWeight: 800,
                    color: '#6365EF', letterSpacing: '-0.04em',
                    lineHeight: 1, marginBottom: 7,
                  }}>{n}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#7A8499', lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
