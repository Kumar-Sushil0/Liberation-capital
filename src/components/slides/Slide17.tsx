"use client";

export const Slide17 = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        width: '100%',
        fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
        lineHeight: 1.3,
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
          Funding-In-Kind (FIK)
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          Sometimes the right fuel is
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          space, tools, mentors, or structure — not cash.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          From clarity to incubation,
        </p>

        <p style={{ margin: 0, color: '#ffffff' }}>
          we provide what accelerates your identity.
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.5rem' }}>
          This is when philosophy cures more than finances.
        </p>
      </div>
    </div>
  );
};
