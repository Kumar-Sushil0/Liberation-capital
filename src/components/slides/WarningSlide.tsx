"use client";

export const WarningSlide = () => {
  const textStyle = {
    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
    lineHeight: 1.5,
    margin: 0
  };

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
        maxWidth: '900px',
        width: '100%'
      }}>
        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          <strong>Warning:</strong> This philosophy disrupts your default settings.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          Enter only when you can give <strong>15 uninterrupted minutes</strong> to wrestle with new ideas.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic'
        }}>
          Choose a time when you're ready to think, not react.
        </p>
      </div>
    </div>
  );
};
