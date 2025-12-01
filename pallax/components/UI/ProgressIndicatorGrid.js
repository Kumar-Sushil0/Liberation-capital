import React from 'react';
import styles from '../../Pallax.module.css';

export const ProgressIndicatorGrid = ({ 
  currentSection, 
  sections, 
  scrollToSection, 
  isMuted, 
  toggleMute, 
  isHoveringProgress, 
  setIsHoveringProgress, 
  progressTimeoutRef,
  isMobile = false
}) => {

  return (
    <div
      className={styles.progressIndicatorGrid}
      onMouseEnter={() => {
        setIsHoveringProgress(true);
        // Clear any existing timeout
        if (progressTimeoutRef.current) {
          clearTimeout(progressTimeoutRef.current);
          progressTimeoutRef.current = null;
        }
      }}
      onMouseLeave={() => {
        // Set timeout to hide after 5 seconds
        progressTimeoutRef.current = setTimeout(() => {
          setIsHoveringProgress(false);
        }, 5000);
      }}
    >
      {/* Mute/Unmute Button */}
      <div className={`${styles.muteButtonContainer} ${isHoveringProgress ? styles.show : ''}`}>
        <button
          className={styles.muteButton}
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          )}
        </button>
      </div>

      <div className={styles.progressBarGrid}>
        {(() => {
          // Skip first 2 sections (indices 0 and 1), start from index 2 (slide 3)
          const visibleSections = sections.slice(2);
          const groupCount = Math.ceil(visibleSections.length / 4);
          
          return Array.from({ length: groupCount }, (_, groupIndex) => {
            const startIndex = groupIndex * 4;
            const groupSections = visibleSections.slice(startIndex, startIndex + 4);
            // Actual section index = groupIndex * 4 + 2 (to account for skipped sections)
            const actualStartIndex = startIndex + 2;
            
            return (
              <div key={groupIndex} className={styles.progressGroup}>
                {groupSections.map((_, localIndex) => {
                  const index = actualStartIndex + localIndex;
                  const isActive = currentSection === index;
                  
                  return (
                    <div
                      key={index}
                      className={`${styles.progressDotGrid} ${isActive ? styles.activeGrid : ''}`}
                      onClick={() => {
                        if (!isActive) {
                          scrollToSection(index);
                        }
                      }}
                    />
                  );
                })}
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

