"use client";

export const LiberationDaySlide = () => {
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
          ▼ Fund Rite — Liberation Day (Ceremony {'>'} Pitch)
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          marginBottom: '2rem',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          Investors don't interrogate. They witness.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          Liberation Day is not Shark Tank. It's a rite-of-passage.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          A ceremonial reveal where the future self speaks not through persuasion, but through coherence.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          Patrons don't challenge. They observe. They feel the architecture of becoming, not the performance of ambition.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          This is not a pitch call. It's a human unveiling.
        </p>
      </div>
    </div>
  );
};
