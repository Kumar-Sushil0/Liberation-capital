"use client";

export const FundOriginSlide = () => {
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
          marginBottom: '2rem'
        }}>
          The moment both tribes realize the world they live in is broken — and the one ahead is possible.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          ▼ Fund Origin — World Funds Products, We Fund Players
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          marginBottom: '1.5rem',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          Because the only thing that ever moves a life is the human at the center.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '0.5rem'
        }}>
          For decades, capital has poured into features and apps, and into founders performing confidence.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          But the human behind the pitch? Untouched. Unfunded. Unquestioned.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          Liberation Capital flips the axis:
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}>
          You redesign your identity → we fund your becoming.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          If life is playable, this is where the game begins.
        </p>
      </div>
    </div>
  );
};
