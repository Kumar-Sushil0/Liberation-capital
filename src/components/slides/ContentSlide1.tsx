"use client";

export const ContentSlide1 = () => {
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
        alignItems: 'flex-start',
        gap: '0.5rem',
        maxWidth: '800px',
        fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
        lineHeight: 1.3
      }}>
        <p style={{ margin: 0, color: '#ffffff' }}>
          Up to <span style={{ color: '#ffffff', fontWeight: 'bold' }}>$100,000</span> for humans who complete the
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          LIFEiDESIGN Accelerator,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          rebuild their identity from the inside out,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          and pitch their <span style={{ fontWeight: 'bold' }}>future self</span>, not another business plan.
        </p>

        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
            We don't fund startups.
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
            We fund humans redesigning themselves.
          </p>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#ffffff' }}>
          <p style={{ margin: 0 }}>Capital becomes scaffolding.</p>
          <p style={{ margin: 0 }}>Identity becomes architecture.</p>
          <p style={{ margin: 0 }}>Coherence becomes proof.</p>
          <p style={{ margin: 0 }}>Your evolution becomes the application.</p>
        </div>
      </div>
    </div>
  );
};
