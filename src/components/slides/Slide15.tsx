"use client";

export const Slide15 = () => {
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
          The Liberation Number
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Your exact capital requirement.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Not valuation.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Not fantasy.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem', fontWeight: 'bold' }}>
          Existential budgeting.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Identity is the product.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Becoming is the traction.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Coherence is the collateral.
        </p>
      </div>
    </div>
  );
};
