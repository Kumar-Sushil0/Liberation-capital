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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem'
    }}>
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Opening italic statement */}
        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          marginBottom: '2rem'
        }}>
          Where online acceleration meets monastic incubation... and humans become investable.
        </p>

        {/* What it's not and what it is */}
        <p style={{ ...textStyle, color: '#ffffff', marginBottom: '1.5rem' }}>
          This is not Y Combinator... This is not a retreat. This is not a course... This is about <strong style={{ fontStyle: 'italic' }}>FUNDING LIFE</strong>
        </p>

        <p style={{ ...textStyle, color: '#ffffff', marginBottom: '2rem' }}>
          This is a <strong>human evolution accelerator with Design Mechanics & Game Theory</strong>, built for two tribes:
        </p>

        {/* Two tribes side by side */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          marginBottom: '2.5rem'
        }}>
          {/* Become Player */}
          <div>
            <p style={{ ...textStyle, color: '#ffffff', marginBottom: '0.5rem' }}>
              • <strong>Become Player →</strong>
            </p>
            <p style={{ ...textStyle, color: '#b8b8b8', fontStyle: 'italic', marginBottom: '0.3rem', paddingLeft: '1rem' }}>
              Your game of life is the due diligence.
            </p>
            <p style={{ ...textStyle, color: '#b8b8b8', fontStyle: 'italic', paddingLeft: '1rem' }}>
              Apply as Player (Accelerator → Pitch)
            </p>
          </div>

          {/* Become Patron */}
          <div>
            <p style={{ ...textStyle, color: '#ffffff', marginBottom: '0.5rem' }}>
              • <strong>Become Patron →</strong>
            </p>
            <p style={{ ...textStyle, color: '#b8b8b8', fontStyle: 'italic', marginBottom: '0.3rem', paddingLeft: '1rem' }}>
              Invest in human capital, not hype.
            </p>
            <p style={{ ...textStyle, color: '#b8b8b8', fontStyle: 'italic', paddingLeft: '1rem' }}>
              Request Patron Access
            </p>
          </div>
        </div>

        {/* Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '2rem',
          border: '1px solid #333',
          fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)'
        }}>
          <tbody>
            <tr>
              <td style={{
                color: '#ffffff',
                fontWeight: 'bold',
                padding: '0.6rem',
                borderRight: '1px solid #333',
                verticalAlign: 'top'
              }}>
                Up to $100,000 -
              </td>
              <td style={{
                color: '#ffffff',
                fontWeight: 'bold',
                padding: '0.6rem',
                borderRight: '1px solid #333',
                verticalAlign: 'top'
              }}>
                No equity in identity
              </td>
              <td style={{
                color: '#ffffff',
                fontWeight: 'bold',
                padding: '0.6rem',
                borderRight: '1px solid #333',
                verticalAlign: 'top'
              }}>
                Principal + 10% / 3 years
              </td>
              <td style={{
                color: '#ffffff',
                fontWeight: 'bold',
                padding: '0.6rem',
                verticalAlign: 'top'
              }}>
                Optional legacy: 2% honor-based
              </td>
            </tr>
            <tr>
              <td style={{
                color: '#b8b8b8',
                padding: '0.6rem',
                borderRight: '1px solid #333',
                borderTop: '1px solid #333',
                verticalAlign: 'top'
              }}>
                Capital becomes scaffolding
              </td>
              <td style={{
                color: '#b8b8b8',
                padding: '0.6rem',
                borderRight: '1px solid #333',
                borderTop: '1px solid #333',
                verticalAlign: 'top'
              }}>
                Identity becomes architecture
              </td>
              <td style={{
                color: '#b8b8b8',
                padding: '0.6rem',
                borderRight: '1px solid #333',
                borderTop: '1px solid #333',
                verticalAlign: 'top'
              }}>
                Your evolution becomes the application.
              </td>
              <td style={{
                color: '#b8b8b8',
                padding: '0.6rem',
                borderTop: '1px solid #333',
                verticalAlign: 'top'
              }}>
                Coherence becomes proof
              </td>
            </tr>
          </tbody>
        </table>

        {/* Terms text */}
        <p style={{
          fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
          color: '#888',
          marginTop: '0.75rem',
          fontStyle: 'italic'
        }}>
          *Terms and eligibility apply.
        </p>
      </div>
    </div>
  );
};
