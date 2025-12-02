"use client";
import styles from '../../styles/slides.module.css';

export const HeroSlide = () => {
  return (
    <div className={styles.slideContent}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        maxWidth: '1200px',
        width: '100%',
        padding: '0 3rem',
        textAlign: 'center'
      }}>
        {/* Main headline */}
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: '600',
          margin: 0,
          lineHeight: 1.3,
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          Want a new life?
        </h1>

        {/* 3-column grid for Design/Play/Pitch */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          width: '100%',
          maxWidth: '900px',
          marginBottom: '1rem'
        }}>
          <p style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '600',
            margin: 0,
            lineHeight: 1.3,
            color: '#ffffff'
          }}>
            Design it.
          </p>
          <p style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '600',
            margin: 0,
            lineHeight: 1.3,
            color: '#ffffff'
          }}>
            Play it.
          </p>
          <p style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '600',
            margin: 0,
            lineHeight: 1.3,
            color: '#ffffff'
          }}>
            Pitch it.
          </p>
        </div>

        {/* Get funded */}
        <p style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: '600',
          margin: 0,
          lineHeight: 1.3,
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          Get funded for it.
        </p>

        {/* Funding details section */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
            margin: 0,
            lineHeight: 1.5,
            color: '#b8b8b8',
            marginBottom: '0.5rem'
          }}>
            Up to <span style={{ color: '#00e87b', fontWeight: '600' }}>$100,000</span> to redesign your identity
          </p>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
            margin: 0,
            lineHeight: 1.5,
            color: '#b8b8b8'
          }}>
            and pitch your <span style={{ fontStyle: 'italic', color: '#ffffff' }}>future self</span> — not another idea.
          </p>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
          margin: 0,
          lineHeight: 1.5,
          color: '#ffffff',
          fontWeight: '500',
          marginTop: '0.5rem'
        }}>
          We don't fund startups. We fund humans redesigning themselves.
        </p>
      </div>
    </div>
  );
};
