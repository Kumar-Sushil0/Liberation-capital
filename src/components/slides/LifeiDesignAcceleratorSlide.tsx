"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/slides.module.css';

interface LifeiDesignAcceleratorSlideProps {
  currentSection?: number;
  isScrollEnabled?: boolean;
  onAllColumnsVisible?: () => void;
}

export const LifeiDesignAcceleratorSlide = ({ 
  currentSection = 0, 
  isScrollEnabled = true,
  onAllColumnsVisible 
}: LifeiDesignAcceleratorSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 5);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const [triggeredColumns, setTriggeredColumns] = useState(new Set<number>());

  // Initialize component
  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 5);

    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Reset when isScrollEnabled changes
  useEffect(() => {
    if (!isInitialized) return;
    
    if (currentSection !== 8) return;

    setSkipTransitions(true);

    if (!isScrollEnabled) {
      setVisibleColumns(5);
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

    if (currentSection === 8 && prevSection !== 8 && isScrollEnabled) {
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

      if (visibleColumns >= 5 && !triggeredColumns.has(5)) {
        setTimeout(() => {
          setTriggeredColumns(prev => new Set(prev).add(5));
        }, 1000);
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
            detail: { section: 8, step: 1 } 
          }));
        }
        
        if (step === 2) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 8, step: 2 } 
          }));
        }
        
        if (step === 3) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 8, step: 3 } 
          }));
        }
        
        if (step === 4) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 8, step: 4 } 
          }));
        }
        
        if (step === 5) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 8, step: 5 } 
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
              detail: { section: 8, step: 1 } 
            }));
          }
          
          if (step === 2) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 8, step: 2 } 
            }));
          }
          
          if (step === 3) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 8, step: 3 } 
            }));
          }
          
          if (step === 4) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 8, step: 4 } 
            }));
          }
          
          if (step === 5) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 8, step: 5 } 
            }));
            if (onAllColumnsVisible) {
              onAllColumnsVisible();
            }
          }

          if (step >= 6 && currentSection === 8) {
            setTimeout(() => {
              if (typeof window !== 'undefined' && (window as any).gotoNextSlide && currentSection === 8) {
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
              <p className={styles.greyLineText}>
                Identity isn't discovered, it's engineered through structure, pressure, and design
              </p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className={styles.scrollRevealMainContent}>
            <div className={styles.powersMainContent}>
              <div className={styles.powersSection}>
                <div
                  style={{
                    opacity: visibleColumns >= 1 ? 1 : 0,
                    transform: visibleColumns >= 1 ? 'translateY(0)' : 'translateY(30px)',
                    transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s',
                    textAlign: 'center',
                    marginBottom: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <h3 className={styles.sectionTitle} style={{
                    fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                    fontSize: '14px',
                    color: '#00e87b',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0
                  }}>
                    LIFEiDESIGN Acceleration
                  </h3>
                  <p style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: '400',
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    margin: 0
                  }}>
                  The Engine for Your Becoming
                  </p>
                </div>

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
                      >Knowing your game gives you your edge.</h4>
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
                        }}>Most people play blindly. You'll design the game you intend to win.</p>
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
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 3 ? 1 : 0,
                          transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >Understanding your core in isolation sets your boundaries.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>Without noise, you finally see what is "you" and what is programming.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 4 ? 1 : 0,
                      transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 4 ? 1 : 0,
                          transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >Evaluating the scoreboard of your life is a different high.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 4 ? 1 : 0,
                        transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>When progress is measurable, becoming becomes addictive.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 5 ? 1 : 0,
                      transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 5 ? 1 : 0,
                          transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >Intersecting your character arc with your life story creates direction.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 5 ? 1 : 0,
                        transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>You're not surviving a plot, you're authoring a saga.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.separatorLine}></div>

              <div className={styles.forcesSection}>
                <div
                  style={{
                    opacity: visibleColumns >= 1 ? 1 : 0,
                    transform: visibleColumns >= 1 ? 'translateY(0)' : 'translateY(30px)',
                    transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s',
                    textAlign: 'center',
                    marginBottom: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <h3 className={styles.sectionTitle} style={{
                    fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                    fontSize: '14px',
                    color: '#00e87b',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0
                  }}>
                    EPiCENTRE Incubation
                  </h3>
                  <p style={{
                    fontFamily: '"satoshi", sans-serif',
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: '400',
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    margin: 0
                  }}>
                  Where Designed Identity Becomes Lived Reality
                  </p>
                </div>

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
                      >Your existential needs are handled, so friction disappears.</h4>
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
                        }}>With survival solved, evolution has space to happen.</p>
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
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 3 ? 1 : 0,
                          transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >A performance-free environment reveals your real work.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>No audience, no applause, just the truth of your discipline.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 4 ? 1 : 0,
                      transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 4 ? 1 : 0,
                          transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >Stillness and solitude give you access to deeper clarity.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 4 ? 1 : 0,
                        transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>Silence becomes a tool, not a threat.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', width: '100%', minHeight: '80px' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#00e87b',
                      flexShrink: 0,
                      opacity: visibleColumns >= 5 ? 1 : 0,
                      transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                    }}>▼</div>
                    <div style={{ flex: 1 }}>
                      <h4
                        className={styles.cardTitleBelow}
                        style={{
                          opacity: visibleColumns >= 5 ? 1 : 0,
                          transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                          transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s',
                          marginBottom: '0.5rem',
                          textAlign: 'left'
                        }}
                      >A place where visions form without needing to make sense.</h4>
                      <div style={{ 
                        borderLeft: '2px solid #333', 
                        paddingLeft: '1rem',
                        opacity: visibleColumns >= 5 ? 1 : 0,
                        transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.25s'
                      }}>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#999',
                          textAlign: 'left',
                          margin: 0
                        }}>Here, imagination isn't judged, it's cultivated.</p>
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
