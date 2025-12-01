"use client";

export const Slide19 = () => {
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
          Up to $100,000 Capital Deployment
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Actual money.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          For actual identity transformation.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          No equity in your identity.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          No strings — just responsibility.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Great players don't become customers.
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          They become mythology.
        </p>
      </div>
    </div>
  );
};
