"use client";

export const Slide18 = () => {
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
          EPiCENTRE Residency
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          A sealed environment
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          for identities that need controlled conditions to hatch.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Where your future self becomes
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          your actual self.
        </p>
      </div>
    </div>
  );
};
