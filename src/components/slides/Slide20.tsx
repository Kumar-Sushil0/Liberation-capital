"use client";

export const Slide20 = () => {
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
          Investors Become Players
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          They come to fund others.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.3rem' }}>
          They leave realizing
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          they've never designed themselves.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Money without meaning
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          collapses into spiritual bankruptcy.
        </p>
      </div>
    </div>
  );
};
