"use client";

export const OperatingSystemSlide = () => {
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
          fontSize: 'clamp(1.5rem, 3vw, 2rem)', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          alignSelf: 'flex-start',
          textTransform: 'uppercase'
        }}>
          The Operating System of Liberation Capital
        </h2>

        <p style={{ 
          margin: 0, 
          color: '#ffffff', 
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem, 1.9vw, 1.25rem)'
        }}>
          Where online acceleration meets monastic incubation... and humans become investable.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '1rem' }}>
          This is not Y Combinator.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          This is not a retreat.
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          This is not a course.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '1rem', fontWeight: 'bold' }}>
          This is a human evolution accelerator with a balance sheet attached.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '1.5rem' }}>
          We designed Liberation Capital for <span style={{ fontWeight: 'bold' }}>two tribes:</span>
        </p>
      </div>
    </div>
  );
};
