"use client";

export const Slide03 = () => {
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
          The Two Tribes
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          ⚡ <span style={{ fontWeight: 'bold' }}>Investors</span> — wealthy, restless, allergic to hype, craving meaning.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.3rem' }}>
          💀 <span style={{ fontWeight: 'bold' }}>Players</span> — disciplined, devoted, oxygen-starved for capital.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Same ecosystem.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Different missions.
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold', marginTop: '0.5rem' }}>
          Same game: human evolution.
        </p>
      </div>
    </div>
  );
};
