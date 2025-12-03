"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/slides.module.css';

interface LiberationDaySlideProps {
  currentSection?: number;
  isScrollEnabled?: boolean;
  onAllColumnsVisible?: () => void;
}

export const LiberationDaySlide = ({ 
  currentSection = 0, 
  isScrollEnabled = true,
  onAllColumnsVisible 
}: LiberationDaySlideProps) => {
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
    
    if (currentSection !== 16) return;

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

    if (currentSection === 16 && prevSection !== 16 && isScrollEnabled) {
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
                Where talk dies and data lives.
              </p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className={styles.scrollRevealMainContent}>
            <div className={styles.powersMainContent}>
              <div className={styles.powersSection}>
                <h3
                  className={styles.sectionTitle}
                  style={{
                    opacity: visibleColumns >= 1 ? 1 : 0,
                    transform: visibleColumns >= 1 ? 'translateY(0)' : 'translateY(30px)',
                    transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s',
                    textAlign: 'left',
                    marginBottom: '2rem'
                  }}
                >
                  <span style={{
                    fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                    fontSize: '14px',
                    color: '#00e87b',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0
                  }}>
                    The Receipts You Bring
                  </span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px', margin: '0 auto', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ fontSize: '16px', color: '#00e87b', flexShrink: 0, opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease' }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4 className={styles.cardTitleBelow} style={{ opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease', marginBottom: '0.5rem', textAlign: 'left' }}>Discipline Logs</h4>
                      <div style={{ borderLeft: '2px solid #333', paddingLeft: '1rem', opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#999', textAlign: 'left', margin: 0 }}>Your daily consistency — not your intentions.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ fontSize: '16px', color: '#00e87b', flexShrink: 0, opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s' }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4 className={styles.cardTitleBelow} style={{ opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s', marginBottom: '0.5rem', textAlign: 'left' }}>Coherence Graphs</h4>
                      <div style={{ borderLeft: '2px solid #333', paddingLeft: '1rem', opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#999', textAlign: 'left', margin: 0 }}>Patterns that show whether your identity holds under pressure.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ fontSize: '16px', color: '#00e87b', flexShrink: 0, opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s' }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4 className={styles.cardTitleBelow} style={{ opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s', marginBottom: '0.5rem', textAlign: 'left' }}>Behavioral Metrics</h4>
                      <div style={{ borderLeft: '2px solid #333', paddingLeft: '1rem', opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#999', textAlign: 'left', margin: 0 }}>Evidence of design-driven decisions, not mood-driven reactions.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ fontSize: '16px', color: '#00e87b', flexShrink: 0, opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s' }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4 className={styles.cardTitleBelow} style={{ opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s', marginBottom: '0.5rem', textAlign: 'left' }}>Emotional Upgrades</h4>
                      <div style={{ borderLeft: '2px solid #333', paddingLeft: '1rem', opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.25s' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#999', textAlign: 'left', margin: 0 }}>Where your internal architecture evolved — visibly, measurably.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.separatorLine}></div>

              <div className={styles.forcesSection}>
                <h3
                  className={styles.sectionTitle}
                  style={{
                    opacity: visibleColumns >= 1 ? 1 : 0,
                    transform: visibleColumns >= 1 ? 'translateY(0)' : 'translateY(30px)',
                    transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s',
                    textAlign: 'left',
                    marginBottom: '2rem'
                  }}
                >
                  <span style={{
                    fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                    fontSize: '14px',
                    color: '#00e87b',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0
                  }}>
                    The Signals Patrons See
                  </span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px', margin: '0 auto', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ fontSize: '16px', color: '#00e87b', flexShrink: 0, opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease' }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4 className={styles.cardTitleBelow} style={{ opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease', marginBottom: '0.5rem', textAlign: 'left' }}>Trajectory Stability</h4>
                      <div style={{ borderLeft: '2px solid #333', paddingLeft: '1rem', opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#999', textAlign: 'left', margin: 0 }}>Do your patterns predict growth or collapse?</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ fontSize: '16px', color: '#00e87b', flexShrink: 0, opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s' }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4 className={styles.cardTitleBelow} style={{ opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s', marginBottom: '0.5rem', textAlign: 'left' }}>Identity Reliability</h4>
                      <div style={{ borderLeft: '2px solid #333', paddingLeft: '1rem', opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#999', textAlign: 'left', margin: 0 }}>Does your design stay intact across environments?</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ fontSize: '16px', color: '#00e87b', flexShrink: 0, opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s' }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4 className={styles.cardTitleBelow} style={{ opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s', marginBottom: '0.5rem', textAlign: 'left' }}>Impulse Regulation</h4>
                      <div style={{ borderLeft: '2px solid #333', paddingLeft: '1rem', opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#999', textAlign: 'left', margin: 0 }}>Are you governed by intention or craving?</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ fontSize: '16px', color: '#00e87b', flexShrink: 0, opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s' }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4 className={styles.cardTitleBelow} style={{ opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s', marginBottom: '0.5rem', textAlign: 'left' }}>Execution Credibility</h4>
                      <div style={{ borderLeft: '2px solid #333', paddingLeft: '1rem', opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.25s' }}>
                        <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#999', textAlign: 'left', margin: 0 }}>Can you act like the person you claim you're becoming?</p>
                      </div>
                    </div>
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
