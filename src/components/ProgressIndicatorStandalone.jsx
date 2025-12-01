import React, { useState } from 'react';

/**
 * ProgressIndicatorStandalone - A standalone progress indicator component
 * 
 * Features:
 * - 2x2 grid layout for progress dots
 * - Mute/unmute button that appears on hover
 * - Fully styled with inline CSS (no external dependencies)
 * - Responsive design
 * 
 * Props:
 * - totalSections: number of sections (default: 20)
 * - currentSection: active section index (default: 0)
 * - isMuted: mute state (default: false)
 * - showMuteButton: whether to show mute button (default: true)
 * - onSectionClick: callback when a dot is clicked (optional)
 */
export const ProgressIndicatorStandalone = ({ 
  totalSections = 20,
  currentSection = 0,
  isMuted = false,
  showMuteButton = true,
  onSectionClick
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // Create array of sections (skip first 2, start from index 2)
  const visibleSections = Array.from({ length: totalSections - 2 }, (_, i) => i + 2);
  const groupCount = Math.ceil(visibleSections.length / 4);

  return (
    <div
      style={styles.container}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Mute/Unmute Button */}
      {showMuteButton && (
        <div style={{
          ...styles.muteButtonContainer,
          ...(isHovering ? styles.muteButtonContainerShow : {})
        }}>
          <button style={styles.muteButton}>
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={styles.svg}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={styles.svg}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Progress Dots Grid */}
      <div style={styles.progressBarGrid}>
        {Array.from({ length: groupCount }, (_, groupIndex) => {
          const startIndex = groupIndex * 4;
          const groupSections = visibleSections.slice(startIndex, startIndex + 4);
          const actualStartIndex = startIndex + 2;
          
          return (
            <div key={groupIndex} style={styles.progressGroup}>
              {groupSections.map((_, localIndex) => {
                const index = actualStartIndex + localIndex;
                const isActive = currentSection === index;
                
                return (
                  <div
                    key={index}
                    onClick={() => onSectionClick && onSectionClick(index)}
                    style={{
                      ...styles.progressDot,
                      ...(isActive ? styles.progressDotActive : {}),
                      ...(onSectionClick ? { cursor: 'pointer' } : {})
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    position: 'fixed',
    top: '50%',
    right: '30px',
    transform: 'translateY(-50%)',
    background: 'transparent',
    padding: '15px 10px',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
    zIndex: 1002,
  },
  muteButtonContainer: {
    position: 'absolute',
    top: '-50px',
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
  },
  muteButtonContainerShow: {
    opacity: 1,
    visibility: 'visible',
  },
  muteButton: {
    background: 'transparent',
    border: 'none',
    padding: 0,
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    transition: 'all 0.3s ease',
  },
  svg: {
    width: '20px',
    height: '20px',
    transition: 'all 0.3s ease',
  },
  progressBarGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    alignItems: 'center',
  },
  progressGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '2px',
    width: 'fit-content',
  },
  progressDot: {
    width: '8px',
    height: '8px',
    background: '#000000',
    border: '1px solid #00e87b',
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  progressDotActive: {
    background: '#00e87b',
    border: '1px solid #00e87b',
    boxShadow: '0 0 10px rgba(0, 232, 123, 0.5)',
  },
};

// Responsive styles (add to your global CSS or use a CSS-in-JS solution)
export const progressIndicatorResponsiveStyles = `
  @media (max-width: 1024px) {
    /* Adjust right position for tablets */
  }

  @media (max-width: 768px) {
    /* Adjust for mobile */
  }

  @media (max-width: 480px) {
    /* Adjust for small mobile */
  }
`;

export default ProgressIndicatorStandalone;
