"use client";

export const Slide24 = () => {
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
          CATEGORY-DEFINING POSITIONING
        </h2>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          Liberation Capital is the world's first fund that invests in humans, not startups.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          We back the only asset that actually drives outcomes:
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          humans who don't want to just live life —
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          they want to play with it.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          You don't pitch a business.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          You pitch your <span style={{ fontStyle: 'italic' }}>future self</span>.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Your coherence is your traction.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Your evolution is your ROI.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem', fontWeight: 'bold' }}>
          This isn't venture capital.
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          This is identity capital.
        </p>
      </div>
    </div>
  );
};
