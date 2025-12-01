"use client";

export const Slide14 = () => {
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
          Life Blueprint Reveal
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          This is your <span style={{ fontWeight: 'bold' }}>game architecture</span>,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          not your aspiration.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          A clear, mapped identity
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          you intend to build, live, embody.
        </p>
      </div>
    </div>
  );
};
