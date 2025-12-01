"use client";

export const SubscrollSlide1 = () => {
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
          The World Funds Products, Not People
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          A world obsessed with funding products
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          forgets the only thing that truly moves a life:
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          the human at the center of it.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Liberation Capital flips the script:
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          You design & gamify → we fund.
        </p>
      </div>
    </div>
  );
};
