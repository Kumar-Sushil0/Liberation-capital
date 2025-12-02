"use client";

export const FundCrucibleSlide = () => {
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
          Fund Receipts — Discipline Logs
        </p>

        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          marginBottom: '2rem',
          paddingLeft: '1.5rem',
          borderLeft: '3px solid #444'
        }}>
          Proof of becoming lives in your patterns, not your promises.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          No founder cosplay. No charisma competition.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          Your logs, your metrics, your rituals, your receipts.
        </p>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          These are your traction.
        </p>

        <ul style={{
          listStyleType: 'disc',
          paddingLeft: '2rem',
          marginBottom: '2rem'
        }}>
          <li style={{ 
            ...textStyle,
            color: '#ffffff',
            marginBottom: '0.5rem'
          }}>
            Your discipline graphs
          </li>
          <li style={{ 
            ...textStyle,
            color: '#ffffff',
            marginBottom: '0.5rem'
          }}>
            Your coherence logs
          </li>
          <li style={{ 
            ...textStyle,
            color: '#ffffff',
            marginBottom: '0.5rem'
          }}>
            Your emotional upgrades
          </li>
          <li style={{ 
            ...textStyle,
            color: '#ffffff',
            marginBottom: '0.5rem'
          }}>
            Your behavioral patterns
          </li>
        </ul>

        <p style={{ 
          ...textStyle,
          color: '#ffffff',
          marginBottom: '2rem'
        }}>
          This is identity data, not identity drama. And data doesn't lie.
        </p>
      </div>
    </div>
  );
};
