"use client";

export const ContentSlide2 = () => {
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
          The Institution Behind the Ascent
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          In a world where money rewards performance,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          we reward <span style={{ fontStyle: 'italic' }}>becoming</span>.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Not bandaids.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Blueprints.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          This is capital for people willing to rebuild their identity
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          with intent, discipline, and clarity.
        </p>
      </div>
    </div>
  );
};
