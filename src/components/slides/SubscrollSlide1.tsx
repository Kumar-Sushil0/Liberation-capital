"use client";

export const SubscrollSlide1 = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      position: 'relative'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '2rem',
        width: '100%',
        height: '100%',
        maxWidth: '1400px',
        position: 'relative'
      }}>
        {/* Vertical separator line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '1px',
          background: '#00e87b',
          transform: 'translateX(-50%)'
        }} />
        
        {/* Horizontal separator line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          right: '0',
          height: '1px',
          background: '#00e87b',
          transform: 'translateY(-50%)'
        }} />
        {/* Top Left - The World Funds Products, Not People */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            The World Funds Products, Not People
          </h3>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>
            A world obsessed with funding products
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>
            forgets the only thing that truly moves a life:
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3, fontWeight: 'bold' }}>
            the human at the center of it.
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3, marginTop: '0.3rem' }}>
            Liberation Capital flips the script:
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3, fontWeight: 'bold' }}>
            You design & gamify → we fund.
          </p>
        </div>

        {/* Top Right - The Institution Behind the Ascent */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            The Institution Behind the Ascent
          </h3>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>
            In a world where money rewards performance,
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>
            we reward <span style={{ fontStyle: 'italic' }}>becoming</span>.
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3, marginTop: '0.3rem' }}>
            Not bandaids.
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>
            Blueprints.
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3, marginTop: '0.3rem' }}>
            This is capital for people willing to rebuild their identity
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>
            with intent, discipline, and clarity.
          </p>
        </div>

        {/* Bottom Left - Why We Exist */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Why We Exist (Traction ≠ Coherence)
          </h3>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>
            Anyone can fake traction.
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3, fontWeight: 'bold' }}>
            No one can fake coherence.
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3, marginTop: '0.3rem' }}>
            We don't care about pitch decks.
          </p>
          <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>
            We care whether your future self is <span style={{ fontStyle: 'italic' }}>executable</span>.
          </p>
        </div>

        {/* Bottom Right - Empty */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          {/* Empty quadrant */}
        </div>
      </div>
    </div>
  );
};
