import FadeIn from './FadeIn'

const team = [
  {
    name: 'Imanol Galván',
    role: 'Technical Lead',
    bio: 'CS student at UTEP. I handle everything on the technical side — design, code, deployment, and ongoing maintenance. Placeholder bio, update this with your own words.',
    initials: 'IG',
  },
  {
    name: 'Cristian Ambriz',
    role: 'Sales & Client Relations',
    bio: 'Industrial & Systems Engineering student at UTEP. I work directly with clients from first contact through launch. Placeholder bio, update this with your own words.',
    initials: 'CA',
  },
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative', zIndex: 1,
        padding: '110px 0',
        borderTop: '1px solid rgba(99,101,239,0.11)',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 clamp(22px,4vw,48px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 80, alignItems: 'start',
        }}>
          {/* Left */}
          <div>
            <FadeIn>
              <p className="section-label">Who We Are</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)',
                fontWeight: 700, lineHeight: 1.15,
                letterSpacing: '-0.022em', marginTop: 10, marginBottom: 24,
              }}>
                Two people.<br />One focus.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: '0.9375rem', color: '#7A8499', lineHeight: 1.8, maxWidth: 440 }}>
                We&apos;re two students from UTEP who got tired of seeing local businesses in El Paso and Juárez
                with outdated websites or none at all. So we started building them.
              </p>
            </FadeIn>
          </div>

          {/* Right — team cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {team.map(({ name, role, bio, initials }, i) => (
              <FadeIn key={name} delay={0.1 + i * 0.15}>
                <div style={{
                  border: '1px solid rgba(99,101,239,0.11)',
                  padding: '28px 32px',
                  display: 'flex', gap: 24, alignItems: 'flex-start',
                }}>
                  {/* Avatar placeholder */}
                  <div style={{
                    width: 52, height: 52, flexShrink: 0,
                    background: 'rgba(99,101,239,0.12)',
                    border: '1px solid rgba(99,101,239,0.32)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: '0.875rem', fontWeight: 700, color: '#6365EF',
                  }}>
                    {initials}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: '1rem', fontWeight: 700,
                      letterSpacing: '-0.01em', marginBottom: 3,
                    }}>
                      {name}
                    </div>
                    <div style={{
                      fontSize: '0.6875rem', fontWeight: 500,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: '#6365EF', marginBottom: 12,
                    }}>
                      {role}
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#7A8499', lineHeight: 1.65 }}>
                      {bio}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
