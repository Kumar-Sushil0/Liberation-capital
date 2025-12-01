"use client";

export const Slide05 = () => {
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
          GAMEiDESIGN (Awareness Engine)
        </h2>

        <p style={{ margin: 0, color: '#ffffff' }}>
          • Pre-Game → Map every timeline your life could become
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.3rem' }}>
          • End-Game → Confront the best and worst of your identity
        </p>

        <p style={{ margin: 0, color: '#ffffff', marginTop: '0.3rem' }}>
          • Me-Game → Wear the mask you choose, not the one you inherited
        </p>
      </div>
    </div>
  );
};
