"use client";

export const Slide13 = () => {
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
          Discipline Receipts
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Your logs.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Your consistency.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Your emotional architecture.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Your upgrades.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Data doesn't lie.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Identity patterns don't either.
        </p>
      </div>
    </div>
  );
};
