"use client";

export const ContentSlide1 = () => {
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
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem'
      }}>
        {/* Left Column */}
        <div>
          {/* Opening italic statement */}
          <p style={{ 
            ...textStyle,
            color: '#b8b8b8',
            fontStyle: 'italic',
            marginBottom: '1.5rem'
          }}>
            Where online acceleration meets monastic incubation... and humans become investable.
          </p>

          {/* What it's not */}
          <p style={{ ...textStyle, color: '#b8b8b8', marginBottom: '0.3rem' }}>
            This is not Y Combinator.
          </p>
          <p style={{ ...textStyle, color: '#b8b8b8', marginBottom: '0.3rem' }}>
            This is not a retreat.
          </p>
          <p style={{ ...textStyle, color: '#b8b8b8', marginBottom: '1.5rem' }}>
            This is not a course.
          </p>

          {/* What it is */}
          <p style={{ ...textStyle, color: '#ffffff', marginBottom: '0.3rem' }}>
            This is a <strong>human evolution accelerator with a balance sheet attached</strong> —
          </p>
          <p style={{ ...textStyle, color: '#ffffff', marginBottom: '1rem' }}>
            built for two tribes:
          </p>

          {/* Two tribes */}
          <p style={{ ...textStyle, color: '#ffffff', marginBottom: '0.3rem' }}>
            <strong>Become Player</strong> → <em>Your game of life is the due diligence.</em>
          </p>
          <p style={{ ...textStyle, color: '#ffffff' }}>
            <strong>Become Patron</strong> → <em>Invest in human capital, not hype.</em>
          </p>
        </div>

        {/* Right Column */}
        <div>
          {/* Capital at a Glance */}
          <p style={{ 
            ...textStyle,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '0.8rem'
          }}>
            Capital at a Glance:
          </p>
          
          <p style={{ ...textStyle, color: '#ffffff', marginBottom: '0.3rem', paddingLeft: '1.5rem' }}>
            • Up to <strong style={{ color: '#00e87b' }}>$100,000</strong>
          </p>
          <p style={{ ...textStyle, color: '#ffffff', marginBottom: '0.3rem', paddingLeft: '1.5rem' }}>
            • No equity in identity
          </p>
          <p style={{ ...textStyle, color: '#ffffff', marginBottom: '0.3rem', paddingLeft: '1.5rem' }}>
            • Principal + 10% / 3 years
          </p>
          <p style={{ ...textStyle, color: '#ffffff', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
            • Optional legacy: 2% honor-based
          </p>

          {/* Closing statements */}
          <p style={{ ...textStyle, color: '#b8b8b8', marginBottom: '0.3rem' }}>
            Capital becomes scaffolding.
          </p>
          <p style={{ ...textStyle, color: '#b8b8b8', marginBottom: '0.3rem' }}>
            Identity becomes architecture.
          </p>
          <p style={{ ...textStyle, color: '#b8b8b8', marginBottom: '0.3rem' }}>
            Coherence becomes proof.
          </p>
          <p style={{ ...textStyle, color: '#ffffff', fontWeight: '500' }}>
            Your evolution becomes the application.
          </p>
        </div>
      </div>
    </div>
  );
};
