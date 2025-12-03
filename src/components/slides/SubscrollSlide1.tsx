"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/slides.module.css';

interface SubscrollSlide1Props {
  currentSection?: number;
  isScrollEnabled?: boolean;
  onAllColumnsVisible?: () => void;
}

export const SubscrollSlide1 = ({ 
  currentSection = 0, 
  isScrollEnabled = true,
  onAllColumnsVisible 
}: SubscrollSlide1Props) => {
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
    
    if (currentSection !== 9) return;

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

    if (currentSection === 9 && prevSection !== 9 && isScrollEnabled) {
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
        <div className={styles.scrollRevealMasterContainer} style={{
          position: 'sticky',
          top: 0
        }}>
          {/* Fixed Grey Line Container */}
          <div className={styles.greyLineContainer}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p className={styles.greyLineText}>
                You can't design who you'll become until you confront who you are now.
              </p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className={styles.scrollRevealMainContent}>
            <div className={styles.threeColumnGrid} style={{ marginBottom: 0 }}>
              {/* Column 1 - PRE-GAME */}
              <div
                className={`${styles.gridColumn} ${!isInitialized ? styles.gridColumnInitial : ''}`}
                style={{
                  opacity: visibleColumns >= 1 ? 1 : 0,
                  transform: visibleColumns >= 1 ? 'translateX(0)' : 'translateX(100px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                }}
              >
                <div className={styles.columnTitle}>
                  <h3 style={{
                    fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                    fontSize: '14px',
                    color: '#00e87b',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    PRE-GAME — Map Your Possibilities
                  </h3>
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    color: '#888888',
                    textAlign: 'center'
                  }}>
                    You don't have one future — you have many.
                  </p>
                </div>
                <div className={styles.imageContent}>
                  <img
                    src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+1.svg"
                    width={200}
                    height={200}
                    alt="Pre-Game"
                    className={styles.heroImageContent}
                    style={{ width: '200px', height: '200px' }}
                  />
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '12px',
                    fontWeight: '400',
                    letterSpacing: '0.5px',
                    color: '#666666',
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>
                    Pre-Game reveals every trajectory your life can take.
                  </p>
                </div>
              </div>

              {/* Column 2 - END-GAME */}
              <div
                className={`${styles.gridColumn} ${!isInitialized && isScrollEnabled ? styles.gridColumnInitial : ''}`}
                style={{
                  opacity: visibleColumns >= 2 ? 1 : 0,
                  transform: visibleColumns >= 2 ? 'translateX(0)' : 'translateX(100px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                }}
              >
                <div className={styles.columnTitle}>
                  <h3 style={{
                    fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                    fontSize: '14px',
                    color: '#00e87b',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    END-GAME — Face Your Extremes
                  </h3>
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    color: '#888888',
                    textAlign: 'center'
                  }}>
                    Your best and worst selves run more of your life than you admit.
                  </p>
                </div>
                <div className={styles.imageContent}>
                  <img
                    src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+2.svg"
                    width={200}
                    height={200}
                    alt="End-Game"
                    className={styles.heroImageContent}
                    style={{ width: '200px', height: '200px' }}
                  />
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '12px',
                    fontWeight: '400',
                    letterSpacing: '0.5px',
                    color: '#666666',
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>
                    End-Game consolidates the extremes that secretly control you.
                  </p>
                </div>
              </div>

              {/* Column 3 - ME-GAME */}
              <div
                className={`${styles.gridColumn} ${!isInitialized && isScrollEnabled ? styles.gridColumnInitial : ''}`}
                style={{
                  opacity: visibleColumns >= 3 ? 1 : 0,
                  transform: visibleColumns >= 3 ? 'translateX(0)' : 'translateX(100px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s'
                }}
              >
                <div className={styles.columnTitle}>
                  <h3 style={{
                    fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                    fontSize: '14px',
                    color: '#00e87b',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    ME-GAME — Choose Your Identity
                  </h3>
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    color: '#888888',
                    textAlign: 'center'
                  }}>
                    Identity is a decision, not an accident.
                  </p>
                </div>
                <div className={styles.imageContent}>
                  <img
                    src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+3.svg"
                    width={200}
                    height={200}
                    alt="Me-Game"
                    className={styles.heroImageContent}
                    style={{ width: '200px', height: '200px' }}
                  />
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '12px',
                    fontWeight: '400',
                    letterSpacing: '0.5px',
                    color: '#666666',
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>
                    Me-Game forces you to choose the version of yourself you will become.
                  </p>
                </div>
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
    </div>
  );
};
