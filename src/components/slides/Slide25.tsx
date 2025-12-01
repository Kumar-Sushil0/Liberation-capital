"use client";

export const Slide25 = () => {
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
          PLAYERS → For Humans Re-designing Themselves
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          If you're redesigning your life,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          you shouldn't have to beg a broken system for permission.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem', fontWeight: 'bold' }}>
          We fund:
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.3rem' }}>
          • disciplined
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          • self-aware
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          • committed
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          • evolving
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          ...humans who need capital as oxygen.
        </p>
      </div>
    </div>
  );
};
