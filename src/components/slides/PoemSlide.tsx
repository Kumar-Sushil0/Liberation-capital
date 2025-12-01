"use client";

export const PoemSlide = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1rem',
        width: '100%',
        maxWidth: '900px',
        fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
        lineHeight: 1.6,
        textAlign: 'left'
      }}>
        <h2 style={{ 
          margin: 0, 
          color: '#ffffff', 
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          alignSelf: 'flex-start'
        }}>
          No Goal Too Crazy
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Liberation Capital does not care
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          how audacious your identity is,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          how unreasonable your future feels,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          or how impossible your reinvention looks on paper.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '1rem' }}>
          There is no goal too crazy,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          no form too untamed,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          no self too vast or too strange —
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          for those willing to design themselves into it.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '1rem', fontWeight: 'bold' }}>
          We do not fund realism.
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          We fund becoming.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '1rem' }}>
          We fund the human who refuses to negotiate with the smallness they inherited.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '1rem' }}>
          If the world calls your vision unrealistic, good.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '1rem' }}>
          Reality was built by people who refused to obey it.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '1rem', fontWeight: 'bold' }}>
          Your future is not required to make sense.
        </p>

        <p style={{ margin: 0, color: '#ffffff', fontWeight: 'bold' }}>
          It is required to make you more alive.
        </p>
      </div>
    </div>
  );
};
