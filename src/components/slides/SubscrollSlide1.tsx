"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/slides.module.css';

interface SubscrollSlide1Props {
  onAllColumnsVisible?: () => void;
  currentSection: number;
  isScrollEnabled?: boolean;
}

export const SubscrollSlide1: React.FC<SubscrollSlide1Props> = ({ 
  onAllColumnsVisible, 
  currentSection, 
  isScrollEnabled = true 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 3);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);

  // Initialize component
  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 3);

    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isScrollEnabled]);

  // Reset when entering this section
  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (!isInitialized) return;

    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;

    // Only reset when ENTERING this section (index 2)
    if (currentSection === 2 && prevSection !== 2 && isScrollEnabled) {
      setSkipTransitions(true);
      setVisibleColumns(0);

      const container = containerRef.current;
      if (container) {
        container.scrollTop = 0;
      }

      setTimeout(() => {
        setSkipTransitions(false);
      }, 100);
    }
  }, [currentSection, isScrollEnabled, isInitialized]);

  // Wheel event handling for subscroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isScrollEnabled) return;

    let wheelDelta = 0;
    let wheelTimer: NodeJS.Timeout | null = null;
    let currentStep = 0;
    let isProcessingScroll = false;

    const smoothScrollToStep = (step: number) => {
      if (isScrollingRef.current || isProcessingScroll) return;
      isScrollingRef.current = true;
      isProcessingScroll = true;

      const scrollHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;
      const maxScroll = scrollHeight - containerHeight;

      // Define scroll positions for each step
      const scrollPositions = [
        0,
        maxScroll * 0.33,
        maxScroll * 0.66,
        maxScroll
      ];

      const targetScroll = scrollPositions[step] || 0;
      const startScroll = container.scrollTop;
      const distance = targetScroll - startScroll;
      const duration = 500;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Cubic easing
        const easeProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        container.scrollTop = startScroll + (distance * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          isScrollingRef.current = false;
          setVisibleColumns(step);
          currentStep = step;
          
          setTimeout(() => {
            isProcessingScroll = false;
          }, 100);

          // Dispatch event for progress tracking
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 2, step: step } 
          }));

          // If at last step, re-enable main scroll
          if (step === 3) {
            if (onAllColumnsVisible) {
              onAllColumnsVisible();
            }
          }

          // If scrolled past last step, go to next slide
          if (step > 3 && currentSection === 2) {
            setTimeout(() => {
              if ((window as any).gotoNextSlide && currentSection === 2) {
                (window as any).gotoNextSlide();
              }
            }, 300);
          }
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      wheelDelta += e.deltaY;

      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }

      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 40 && !isProcessingScroll) {
          if (wheelDelta > 0) {
            // Scroll down
            const nextStep = Math.min(currentStep + 1, 4);
            smoothScrollToStep(nextStep);
          } else {
            // Scroll up
            if (currentStep === 0) {
              // At beginning - go to previous slide
              if ((window as any).gotoPrevSlide) {
                (window as any).gotoPrevSlide();
              }
            } else {
              const prevStep = Math.max(currentStep - 1, 0);
              smoothScrollToStep(prevStep);
            }
          }
        }
        wheelDelta = 0;
      }, 10);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [onAllColumnsVisible, isScrollEnabled, currentSection]);

  return (
    <div
      ref={containerRef}
      className={styles.scrollRevealContainer}
    >
      <div style={{ height: '200vh', position: 'relative' }}>
        <div className={styles.scrollRevealMasterContainer}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>
              The Three Pillars
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#888' }}>
              Scroll to reveal each pillar of transformation
            </p>
          </div>

          <div className={styles.threeColumnGrid}>
            {/* Column 1 */}
            <div
              className={styles.gridColumn}
              style={{
                opacity: visibleColumns >= 1 ? 1 : 0,
                transform: visibleColumns >= 1 ? 'translateX(0)' : 'translateX(100px)',
                transition: skipTransitions ? 'none' : 'all 0.4s ease'
              }}
            >
              <div className={styles.columnTitle}>
                <h3>DESIGN</h3>
              </div>
              <div className={styles.columnText}>
                <p>Architect your identity from the inside out.</p>
                <p>Your future self is not found — it's designed.</p>
              </div>
              <div className={styles.columnImage}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'linear-gradient(135deg, #00e87b 0%, #00a859 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem'
                }}>
                  🎨
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div
              className={styles.gridColumn}
              style={{
                opacity: visibleColumns >= 2 ? 1 : 0,
                transform: visibleColumns >= 2 ? 'translateX(0)' : 'translateX(100px)',
                transition: skipTransitions ? 'none' : 'all 0.4s ease 0.1s'
              }}
            >
              <div className={styles.columnTitle}>
                <h3>DISCIPLINE</h3>
              </div>
              <div className={styles.columnText}>
                <p>Consistency is the currency of transformation.</p>
                <p>Your daily actions become your destiny.</p>
              </div>
              <div className={styles.columnImage}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'linear-gradient(135deg, #00e87b 0%, #00a859 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem'
                }}>
                  💪
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div
              className={styles.gridColumn}
              style={{
                opacity: visibleColumns >= 3 ? 1 : 0,
                transform: visibleColumns >= 3 ? 'translateX(0)' : 'translateX(100px)',
                transition: skipTransitions ? 'none' : 'all 0.4s ease 0.2s'
              }}
            >
              <div className={styles.columnTitle}>
                <h3>COHERENCE</h3>
              </div>
              <div className={styles.columnText}>
                <p>Alignment between who you are and who you claim to be.</p>
                <p>This is your proof of evolution.</p>
              </div>
              <div className={styles.columnImage}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'linear-gradient(135deg, #00e87b 0%, #00a859 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem'
                }}>
                  ✨
                </div>
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className={styles.columnProgressIndicator}>
            <div className={styles.progressLine}>
              <div
                className={`${styles.progressSegment} ${visibleColumns >= 1 ? styles.progressActive : ''}`}
                style={{
                  transition: skipTransitions ? 'none' : 'all 0.4s ease'
                }}
              />
              <div
                className={`${styles.progressConnector} ${visibleColumns >= 2 ? styles.progressActive : ''}`}
                style={{
                  transition: skipTransitions ? 'none' : 'all 0.4s ease 0.05s'
                }}
              />
              <div
                className={`${styles.progressSegment} ${visibleColumns >= 2 ? styles.progressActive : ''}`}
                style={{
                  transition: skipTransitions ? 'none' : 'all 0.4s ease 0.1s'
                }}
              />
              <div
                className={`${styles.progressConnector} ${visibleColumns >= 3 ? styles.progressActive : ''}`}
                style={{
                  transition: skipTransitions ? 'none' : 'all 0.4s ease 0.15s'
                }}
              />
              <div
                className={`${styles.progressSegment} ${visibleColumns >= 3 ? styles.progressActive : ''}`}
                style={{
                  transition: skipTransitions ? 'none' : 'all 0.4s ease 0.2s'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
