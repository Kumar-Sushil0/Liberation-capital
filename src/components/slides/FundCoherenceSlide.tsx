"use client";

export const FundCoherenceSlide = () => {
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
          marginBottom: '1.5rem'
        }}>
          ▼ Fund Coherence — Coherence Over Traction
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          marginBottom: '1.5rem',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          Anyone can fake progress. No one can fake coherence.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '0.5rem'
        }}>
          Traction can be faked. Charisma can be learned. Decks can be decorated.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          But identity? Identity is a biometric.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          Liberation Capital measures what cannot be performed:
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          discipline, clarity, emotional truth, self-awareness.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          Identity is the only asset class that compounds exponentially.
        </p>
      </div>
    </div>
  );
};
