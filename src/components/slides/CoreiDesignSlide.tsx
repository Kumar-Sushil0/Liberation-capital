"use client";

export const CoreiDesignSlide = () => {
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
        maxWidth: '950px',
        width: '100%'
      }}>
        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          fontWeight: 'bold',
          marginBottom: '2rem',
          fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)'
        }}>
          Fund Emotion — <span style={{ color: '#00e87b' }}>COREiDESIGN</span>
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          marginBottom: '2rem',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          Your emotional code is the real operating system of your life.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem',
          fontSize: 'clamp(1rem, 2.2vw, 1.4rem)'
        }}>
          Your emotional architecture decides:
        </p>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.8rem',
          marginBottom: '2rem',
          paddingLeft: '2rem'
        }}>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            • what you tolerate
          </p>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            • what you pursue
          </p>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            • what you destroy
          </p>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            • what you repeat
          </p>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            • what you're willing to walk toward
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.8rem',
          marginBottom: '2rem'
        }}>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            <strong>Mirror Mode</strong> → reveals possibilities
          </p>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            <strong>NPC Mode</strong> → dismantles financial delusions
          </p>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            <strong>Monk Mode</strong> → measures readiness
          </p>
        </div>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginTop: '2rem'
        }}>
          This is where trauma, ambition, desire, fear, and discipline
        </p>
        <p style={{ 
          ...textStyle,
          color: '#ffffff'
        }}>
          are rewritten into a coherent emotional OS.
        </p>
      </div>
    </div>
  );
};
