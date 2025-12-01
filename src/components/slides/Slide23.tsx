"use client";

export const Slide23 = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        width: '100%',
        fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
        lineHeight: 1.3,
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
          Case Studies Become Culture
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Culture attracts investors.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Investors become players.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Players become creators.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Creators evolve the ecosystem.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          A living identity economy
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          powered by:
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem', fontWeight: 'bold', fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)' }}>
          design → discipline → coherence → capital → culture → awakening → creation.
        </p>
      </div>
    </div>
  );
};
