"use client";

export const SilenceTestSlide = () => {
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
          Fund Stillness — The Silence Test
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          marginBottom: '2rem',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          Stillness reveals what ambition tries to hide.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '0.5rem'
        }}>
          Ambition is loud.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          Stillness is honest.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '0.5rem'
        }}>
          When the noise stops, your loops reveal themselves:
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          your desires, your fears, your compulsions, your ghosts.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '0.5rem'
        }}>
          If clarity survives silence,
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          the identity is real.
        </p>
      </div>
    </div>
  );
};
