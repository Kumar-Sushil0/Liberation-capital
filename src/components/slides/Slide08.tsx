"use client";

export const Slide08 = () => {
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
          The Incubator of Identity
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          EPiCENTRE is not a retreat.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          It's a silent, monastic, reality-heavy pressure chamber
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          where your future self is stress-tested.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          If it can't survive stillness,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          it won't survive life.
        </p>
      </div>
    </div>
  );
};
