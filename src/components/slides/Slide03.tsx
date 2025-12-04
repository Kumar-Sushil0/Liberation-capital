"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/slides.module.css';

interface Slide03Props {
  currentSection?: number;
  isScrollEnabled?: boolean;
  onAllColumnsVisible?: () => void;
}

export const Slide03 = ({ 
  currentSection = 0, 
  isScrollEnabled = true,
  onAllColumnsVisible 
}: Slide03Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 4);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const [triggeredColumns, setTriggeredColumns] = useState(new Set<number>());

  // Initialize component
  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 4);

    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Reset when isScrollEnabled changes
  useEffect(() => {
    if (!isInitialized) return;
    
    if (currentSection !== 4) return;

    setSkipTransitions(true);

    if (!isScrollEnabled) {
      setVisibleColumns(4);
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

    if (currentSection === 4 && prevSection !== 4 && isScrollEnabled) {
      setSkipTransitions(true);
      setVisibleColumns(0);
      setTriggeredColumns(new Set());

      const container = containerRef.current;
      if (container) {
        container.scrollTop = 0;
      }

      setTimeout(() => {
        setSkipTransitions(false);
      }, 100);
    }
  }, [currentSection, isScrollEnabled, isInitialized]);

  // Trigger animations when visibleColumns changes
  useEffect(() => {
    if (isInitialized && visibleColumns >= 1) {
      if (visibleColumns >= 1 && !triggeredColumns.has(1)) {
        setTimeout(() => {
          setTriggeredColumns(prev => new Set(prev).add(1));
        }, 200);
      }

      if (visibleColumns >= 2 && !triggeredColumns.has(2)) {
        setTimeout(() => {
          setTriggeredColumns(prev => new Set(prev).add(2));
        }, 400);
      }

      if (visibleColumns >= 3 && !triggeredColumns.has(3)) {
        setTimeout(() => {
          setTriggeredColumns(prev => new Set(prev).add(3));
        }, 600);
      }

      if (visibleColumns >= 4 && !triggeredColumns.has(4)) {
        setTimeout(() => {
          setTriggeredColumns(prev => new Set(prev).add(4));
        }, 800);
      }
    }
  }, [visibleColumns, isInitialized, triggeredColumns]);

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
        maxScroll * 0.15,
        maxScroll * 0.35,
        maxScroll * 0.55,
        maxScroll * 0.75,
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

        if (step === 1) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 4, step: 1 } 
          }));
        }
        
        if (step === 2) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 4, step: 2 } 
          }));
        }
        
        if (step === 3) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 4, step: 3 } 
          }));
        }
        
        if (step === 4) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 4, step: 4 } 
          }));
          if (onAllColumnsVisible) {
            onAllColumnsVisible();
          }
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

          if (step === 1) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 4, step: 1 } 
            }));
          }
          
          if (step === 2) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 4, step: 2 } 
            }));
          }
          
          if (step === 3) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 4, step: 3 } 
            }));
          }
          
          if (step === 4) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 4, step: 4 } 
            }));
            if (onAllColumnsVisible) {
              onAllColumnsVisible();
            }
          }

          if (step >= 5 && currentSection === 4) {
            setTimeout(() => {
              if (typeof window !== 'undefined' && (window as any).gotoNextSlide && currentSection === 4) {
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

      if (wheelTimer) clearTimeout(wheelTimer);

      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 40 && !isProcessingScroll) {
          if (wheelDelta > 0) {
            const nextStep = Math.min(currentStep + 1, 5);
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
              <p className={styles.greyLineText} style={{ marginBottom: '2rem' }}>
                Two roles. One evolution system.
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
                    textAlign: 'center',
                    marginBottom: '3rem'
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
                    Players
                  </span>
                  <span style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: '400',
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    margin: '0 0 0 8px'
                  }}>
                    — Signs You Belong Here
                  </span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 2 ? 1 : 0,
                      transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 2 ? 1 : 0,
                          transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >You've outgrown your old self and you know it.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>The identity you're living can't carry the life you want.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 2 ? 1 : 0,
                      transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 2 ? 1 : 0,
                          transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >You're disciplined but underfunded.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>Your effort is real — your capital isn't.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 3 ? 1 : 0,
                      transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 3 ? 1 : 0,
                          transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >You want structure, not slogans.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>You're done with motivation. You need a system.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 3 ? 1 : 0,
                      transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 3 ? 1 : 0,
                          transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >You're ready to prove yourself through behavior, not talk.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.25s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>Coherence over charisma — that's your advantage.</p>
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
                    textAlign: 'center',
                    marginBottom: '3rem'
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
                    Patrons
                  </span>
                  <span style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: '400',
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    margin: '0 0 0 8px'
                  }}>
                    — Signs You're Meant for This
                  </span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 2 ? 1 : 0,
                      transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 2 ? 1 : 0,
                          transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >You're wealthy, but not fulfilled.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>Money solved comfort, not meaning.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 2 ? 1 : 0,
                      transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 2 ? 1 : 0,
                          transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >You're tired of investing in noise.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>Decks, founders, hype cycles — none of it feels real anymore.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 3 ? 1 : 0,
                      transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 3 ? 1 : 0,
                          transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >You want to fund humans who can actually follow through.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>Coherent people outperform every market trend.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 3 ? 1 : 0,
                      transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 3 ? 1 : 0,
                          transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >You want your capital to change lives, not chase valuations.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.25s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>Funding becoming &gt; funding branding.</p>
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
