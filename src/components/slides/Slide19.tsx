"use client";
import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/slides.module.css';

interface Slide19Props {
  currentSection?: number;
  isScrollEnabled?: boolean;
  onAllColumnsVisible?: () => void;
}

export const Slide19 = ({ 
  currentSection = 0, 
  isScrollEnabled = true,
  onAllColumnsVisible 
}: Slide19Props) => {
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

  // Reset when isScrollEnabled changes
  useEffect(() => {
    if (!isInitialized) return;
    
    const slide19Index = 14;

    if (currentSection !== slide19Index) return;

    setSkipTransitions(true);

    if (!isScrollEnabled) {
      setVisibleColumns(3);
      if (onAllColumnsVisible) {
        onAllColumnsVisible();
      }
    } else {
      setVisibleColumns(0);
      const container = containerRef.current;
      if (container) {
        container.scrollTop = 0;
      }
    }

    setTimeout(() => {
      setSkipTransitions(false);
    }, 50);
  }, [isScrollEnabled, onAllColumnsVisible, isInitialized, currentSection]);

  // Reset to initial state when entering this slide
  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (!isInitialized) return;

    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;

    const slide19Index = 14;

    if (currentSection === slide19Index && prevSection !== slide19Index && isScrollEnabled) {
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInitialized) return;

    if (!isScrollEnabled) {
      return;
    }

    let wheelDelta = 0;
    let wheelTimer: NodeJS.Timeout | null = null;
    let currentStep = 0;
    let isProcessingScroll = false;

    const smoothScrollToStep = (step: number, skipAnimation = false) => {
      if (isScrollingRef.current || isProcessingScroll) return;
      isScrollingRef.current = true;
      isProcessingScroll = true;

      const scrollHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;
      const maxScroll = scrollHeight - containerHeight;

      const scrollPositions = [
        0,
        maxScroll * 0.33,
        maxScroll * 0.66,
        maxScroll
      ];

      const targetScroll = scrollPositions[step] || 0;

      if (skipAnimation || step === 0) {
        setSkipTransitions(true);
        container.scrollTop = targetScroll;
        setVisibleColumns(step);
        currentStep = step;
        isScrollingRef.current = false;
        
        setTimeout(() => {
          isProcessingScroll = false;
        }, 100);

        setTimeout(() => {
          setSkipTransitions(false);
        }, 50);

        if (step === 3 && onAllColumnsVisible) {
          onAllColumnsVisible();
        }

        return;
      }

      const startScroll = container.scrollTop;
      const distance = targetScroll - startScroll;
      const duration = 500;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

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

          if (step === 3 && onAllColumnsVisible) {
            onAllColumnsVisible();
          }
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      wheelDelta += e.deltaY;

      if (wheelTimer) clearTimeout(wheelTimer);

      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 40 && !isProcessingScroll) {
          if (wheelDelta > 0) {
            const nextStep = Math.min(currentStep + 1, 3);
            smoothScrollToStep(nextStep);
          } else {
            if (currentStep === 0) {
              if (typeof window !== 'undefined' && (window as any).gotoPrevSlide) {
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
  }, [isInitialized, isScrollEnabled, onAllColumnsVisible]);

  return (
    <div
      ref={containerRef}
      className={styles.scrollRevealContainer}
      style={{
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      <div style={{ height: '200vh', position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#ffffff', 
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', 
            fontWeight: 'bold', 
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            What Happens Once You're Eligible
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#ffffff', 
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', 
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            When the door opens, you will prepare:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '3rem',
            width: '100%',
            maxWidth: '1400px',
            position: 'relative',
            flex: '0 0 auto'
          }}>
            {/* Column 1 - Your Risk Declaration */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1.5rem',
              textAlign: 'center',
              opacity: visibleColumns >= 1 ? 1 : 0,
              transform: visibleColumns >= 1 ? 'translateX(0)' : 'translateX(100px)',
              transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
            }}>
              <h3 style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Your Risk Declaration
              </h3>
              <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.4, marginTop: '1rem' }}>
                What you are prepared to sacrifice.
              </p>
            </div>

            {/* Column 2 - Your Fear Statement */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1.5rem',
              textAlign: 'center',
              opacity: visibleColumns >= 2 ? 1 : 0,
              transform: visibleColumns >= 2 ? 'translateX(0)' : 'translateX(100px)',
              transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
            }}>
              <h3 style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Your Fear Statement
              </h3>
              <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.4, marginTop: '1rem' }}>
                What still holds power over you.
              </p>
            </div>

            {/* Column 3 - Your Life Spiral Map */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1.5rem',
              textAlign: 'center',
              opacity: visibleColumns >= 3 ? 1 : 0,
              transform: visibleColumns >= 3 ? 'translateX(0)' : 'translateX(100px)',
              transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s'
            }}>
              <h3 style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Your Life Spiral Map
              </h3>
              <p style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.4, marginTop: '1rem' }}>
                Where you have been, where you are, where you intend to stand.
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className={styles.columnProgressIndicator}>
            <div className={styles.progressLine}>
              <div
                className={styles.progressSegment}
                style={{
                  opacity: visibleColumns >= 1 ? 1 : 0,
                  transform: visibleColumns >= 1 ? 'scale(1)' : 'scale(0)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                }}
              >
                <div
                  className={`${styles.progressNumber} ${visibleColumns >= 1 ? styles.progressActive : ''}`}
                  style={{
                    transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                  }}
                >
                </div>
              </div>
              <div
                className={`${styles.progressConnector} ${visibleColumns >= 2 ? styles.progressActive : ''}`}
                style={{
                  opacity: visibleColumns >= 2 ? 1 : 0,
                  transform: visibleColumns >= 2 ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                }}
              ></div>
              <div
                className={styles.progressSegment}
                style={{
                  opacity: visibleColumns >= 2 ? 1 : 0,
                  transform: visibleColumns >= 2 ? 'scale(1)' : 'scale(0)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                }}
              >
                <div
                  className={`${styles.progressNumber} ${visibleColumns >= 2 ? styles.progressActive : ''}`}
                  style={{
                    transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                  }}
                >
                </div>
              </div>
              <div
                className={`${styles.progressConnector} ${visibleColumns >= 3 ? styles.progressActive : ''}`}
                style={{
                  opacity: visibleColumns >= 3 ? 1 : 0,
                  transform: visibleColumns >= 3 ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                }}
              ></div>
              <div
                className={styles.progressSegment}
                style={{
                  opacity: visibleColumns >= 3 ? 1 : 0,
                  transform: visibleColumns >= 3 ? 'scale(1)' : 'scale(0)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s'
                }}
              >
                <div
                  className={`${styles.progressNumber} ${visibleColumns >= 3 ? styles.progressActive : ''}`}
                  style={{
                    transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s'
                  }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
