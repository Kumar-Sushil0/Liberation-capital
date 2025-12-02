"use client";

export const PlayiDesignSlide = () => {
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
          Fund Discipline — <span style={{ color: '#00e87b' }}>PLAYiDESIGN</span>
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          marginBottom: '2rem',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          Daily coherence is the only proof your future self exists.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          Dreams mean nothing if your behavior doesn't match.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem',
          fontSize: 'clamp(1rem, 2.2vw, 1.4rem)'
        }}>
          PLAYiDESIGN measures your consistency with obsessive honesty:
        </p>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.8rem',
          marginBottom: '2rem',
          paddingLeft: '2rem'
        }}>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            • <strong>Everyday Mode</strong> → where intentions collide with actions
          </p>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            • <strong>Ghost Mode</strong> → coherence logs and discipline receipts
          </p>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            • <strong>Underground Mode</strong> → the internal metrics dashboard you can't fake
          </p>
        </div>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '0.5rem'
        }}>
          You don't get "accepted" into Liberation Capital.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          You get <strong>measured</strong>. 80% coherence → eligibility. Not before.
        </p>
      </div>
    </div>
  );
};
