"use client";

export const Slide11 = () => {
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
          The Distraction Withdrawal Test
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Your clarity vs your cravings.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Your identity vs your impulses.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Your coherence vs your chaos.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          This is <span style={{ fontWeight: 'bold' }}>human due diligence</span> —
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          ethical, accurate, unmatched by any VC.
        </p>
      </div>
    </div>
  );
};
