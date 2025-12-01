"use client";

export const Slide27 = () => {
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
          POSITIONING SUMMARY
        </h2>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          Liberation Capital funds:
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.3rem' }}>
          the human → not the idea
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          the identity → not the business
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          the becoming → not the performance
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          the coherence → not the theatrics
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Category → <span style={{ fontWeight: 'bold' }}>Identity Capital</span>
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Promise → <span style={{ fontWeight: 'bold' }}>Design & gamify your life → get funded to live it</span>
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Audience → <span style={{ fontWeight: 'bold' }}>Players + Patrons</span>
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          Tone → <span style={{ fontWeight: 'bold' }}>Anti-system, premium, bold</span>
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          System → <span style={{ fontWeight: 'bold' }}>Accelerator → Incubator → Funding → Evolution</span>
        </p>
      </div>
    </div>
  );
};
