"use client";

export const ContentSlide3 = () => {
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
          Why We Exist (Traction ≠ Coherence)
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Anyone can fake traction.
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          No one can fake coherence.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          We don't care about pitch decks.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          We care whether your future self is <span style={{ fontStyle: 'italic' }}>executable</span>.
        </p>
      </div>
    </div>
  );
};
