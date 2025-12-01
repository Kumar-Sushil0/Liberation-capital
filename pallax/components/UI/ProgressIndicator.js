import React, { useState, useEffect } from 'react';
import styles from '../../Pallax.module.css';
import { getSubscrollSections, getSubscrollSteps } from '../../constants';

export const ProgressIndicator = ({ 
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
  const SUBSCROLL_SECTIONS = getSubscrollSections(isMobile);
  const SUBSCROLL_STEPS = getSubscrollSteps(isMobile);
  const isSubscrollSection = SUBSCROLL_SECTIONS.includes(currentSection);
  const [completedSteps, setCompletedSteps] = useState({});
  const [animatingStep, setAnimatingStep] = useState(null);

  // Reset states when leaving sections
  useEffect(() => {
    SUBSCROLL_SECTIONS.forEach(sectionIndex => {
      if (currentSection !== sectionIndex) {
        setCompletedSteps(prev => ({ ...prev, [sectionIndex]: 0 }));
      }
    });
    setAnimatingStep(null);
  }, [currentSection, SUBSCROLL_SECTIONS]);

  // Listen for custom event to trigger animation
  useEffect(() => {
    const handleSubscrollComplete = (event) => {
      const { section, step } = event.detail;
      
      if (SUBSCROLL_SECTIONS.includes(section)) {
        // Step 0 is used to reset (make all lines visible again)
        if (step === 0) {
          setCompletedSteps(prev => ({ ...prev, [section]: 0 }));
          setAnimatingStep(null);
          return;
        }
        
        // Update completed steps count
        setCompletedSteps(prev => ({ ...prev, [section]: step }));
        
        // Trigger animation for this specific step
        setAnimatingStep(`${section}-${step}`);
        
        // After animation completes, clear animation state
        setTimeout(() => {
          setAnimatingStep(null);
        }, 600);
      }
    };

    window.addEventListener('subscrollComplete', handleSubscrollComplete);
    return () => window.removeEventListener('subscrollComplete', handleSubscrollComplete);
  }, [SUBSCROLL_SECTIONS]);
  return (
    <div
      className={styles.progressIndicator}
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

      <div className={styles.progressBar}>
        {Array.from({ length: sections.length }, (_, index) => {
          const isSubscroll = SUBSCROLL_SECTIONS.includes(index);
          const isActive = currentSection === index;
          const totalSteps = SUBSCROLL_STEPS[index] || 0;
          const completedStepsCount = completedSteps[index] || 0;
          
          return (
            <div
              key={index}
              className={`${styles.progressDot} ${isActive ? styles.active : ''} ${isActive && isSubscroll ? styles.subscroll : ''}`}
              onClick={() => scrollToSection(index)}
            >
              {/* Show stacked green lines when this is an active subscroll section */}
              {isActive && isSubscroll && totalSteps > 0 && (
                <div className={styles.subscrollDots}>
                  {Array.from({ length: totalSteps }, (_, dotIndex) => {
                    const stepNumber = dotIndex + 1;
                    const isStepCompleted = stepNumber <= completedStepsCount;
                    const isStepAnimating = animatingStep === `${index}-${stepNumber}`;
                    
                    // Always render the div to prevent layout shift, but use visibility
                    const shouldShow = !isStepCompleted || isStepAnimating;
                    
                    return (
                      <div 
                        key={dotIndex} 
                        className={isStepAnimating ? styles.subscrollDotItemAnimating : styles.subscrollDotItem}
                        style={{
                          visibility: shouldShow ? 'visible' : 'hidden'
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

