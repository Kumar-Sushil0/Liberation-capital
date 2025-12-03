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
        maxWidth: '1000px',
        width: '100%',
        textAlign: 'center'
      }}>
        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '0.75rem'
        }}>
          <strong>Warning:</strong> The philosophy of <strong>LIBERATION CAPITAL</strong> may disrupt your default settings.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '0.75rem'
        }}>
          Enter website only when you can give <strong>15 uninterrupted minutes</strong> to wrestle with new kind of reality.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic'
        }}>
          Choose a time when you're ready to think, not react. - Pick a 15-minute slot → we'll reserve it.
        </p>
      </div>
    </div>
  );
};
