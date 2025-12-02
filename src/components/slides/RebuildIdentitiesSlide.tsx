"use client";

export const RebuildIdentitiesSlide = () => {
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
          color: '#b8b8b8',
          fontStyle: 'italic',
          marginBottom: '2rem',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          We don't patch lives. We rebuild identities.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '0.5rem'
        }}>
          This is capital for humans with intention, the ones who want a blueprint, not a bandaid.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          This is a design discipline for humans ready to take themselves seriously.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          Here, money doesn't reward performance. It rewards becoming.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          The deliberate construction of a self who can bear the weight of their future.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          We don't fund realism. We fund becoming.
        </p>
      </div>
    </div>
  );
};
