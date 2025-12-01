"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../Pallax.module.css';

export const ScrollRevealSectionSlide8 = ({ onAllColumnsVisible, currentSection, isScrollEnabled = true }) => {
  const containerRef = useRef(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 6);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const columnsRef = useRef([]);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Refs for controlling flipping words manually
  const yourPowersFlipRef = useRef(null);
  const theForcesFlipRef = useRef(null);

  // Track which columns have been triggered to prevent re-triggering
  const [triggeredColumns, setTriggeredColumns] = useState(new Set());

  // Initialize component with proper state to prevent flash
  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 6);

    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Reset visible columns when isScrollEnabled changes
  useEffect(() => {
    if (!isInitialized) return;
    
    // Only respond to isScrollEnabled changes when we're actually on this section
    if (currentSection !== 8) return;

    setSkipTransitions(true);

    if (!isScrollEnabled) {
      setVisibleColumns(6);
      if (onAllColumnsVisible) {
        onAllColumnsVisible();
      }
    } else {
      setVisibleColumns(0);
      const container = containerRef.current;
      if (container) {
        const scrollHeight = container.scrollHeight;
        const containerHeight = container.clientHeight;
        const maxScroll = scrollHeight - containerHeight;
        container.scrollTop = 0;
      }
    }

    setTimeout(() => {
      setSkipTransitions(false);
    }, 50);
  }, [isScrollEnabled, onAllColumnsVisible, isInitialized, currentSection]);

  // Reset to initial state when entering slide 8 (currentSection === 8)
  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (!isInitialized) return;

    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;

    // Only reset when ENTERING this section (not when already on it or leaving it)
    if (currentSection === 8 && prevSection !== 8 && isScrollEnabled) {
      setSkipTransitions(true);
      setVisibleColumns(0);
      setTriggeredColumns(new Set());

      const container = containerRef.current;
      if (container) {
        const scrollHeight = container.scrollHeight;
        const containerHeight = container.clientHeight;
        const maxScroll = scrollHeight - containerHeight;
        container.scrollTop = 0;
      }

      setTimeout(() => {
        setSkipTransitions(false);
      }, 100);
    }
  }, [currentSection, isScrollEnabled, isInitialized]);

  // Trigger flipping animations when visibleColumns changes (for slide 8)
  useEffect(() => {
    if (isInitialized && visibleColumns >= 1) {
      if (visibleColumns >= 1 && yourPowersFlipRef.current && !triggeredColumns.has(1)) {
        setTimeout(() => {
          yourPowersFlipRef.current.triggerFlip();
          setTriggeredColumns(prev => new Set(prev).add(1));
        }, 200);
      }

      if (visibleColumns >= 2 && theForcesFlipRef.current && !triggeredColumns.has(2)) {
        setTimeout(() => {
          theForcesFlipRef.current.triggerFlip();
          setTriggeredColumns(prev => new Set(prev).add(2));
        }, 400);
      }
    }
  }, [visibleColumns, isInitialized, triggeredColumns]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!isScrollEnabled) {
      return;
    }

    let wheelDelta = 0;
    let wheelTimer = null;
    let currentStep = 0;
    let isProcessingScroll = false;

    const smoothScrollToStep = (step, skipAnimation = false) => {
      if (isScrollingRef.current || isProcessingScroll) return;
      isScrollingRef.current = true;
      isProcessingScroll = true;

      const scrollHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;
      const maxScroll = scrollHeight - containerHeight;

      const scrollPositions = [
        0,
        maxScroll * 0.125,
        maxScroll * 0.25,
        maxScroll * 0.375,
        maxScroll * 0.5,
        maxScroll * 0.625,
        maxScroll * 0.75,
        maxScroll * 0.875,
        maxScroll
      ];

      const targetScroll = scrollPositions[step] || 0;

      if (skipAnimation || step === 0) {
        setSkipTransitions(true);
        container.scrollTop = targetScroll;
        setVisibleColumns(step);
        currentStep = step;
        isScrollingRef.current = false;
        // Reset processing flag after a short delay to allow next scroll
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
        }
        
        if (step === 6) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 8, step: 6 } 
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

      const animateScroll = (currentTime) => {
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
          // Reset processing flag after a short delay to allow next scroll
          setTimeout(() => {
            isProcessingScroll = false;
          }, 100);

          if (step === 1) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 9, step: 1 } 
            }));
          }
          
          if (step === 2) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 9, step: 2 } 
            }));
          }
          
          if (step === 3) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 9, step: 3 } 
            }));
          }
          
          if (step === 4) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 9, step: 4 } 
            }));
          }
          
          if (step === 5) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 9, step: 5 } 
            }));
          }
          
          if (step === 6) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 9, step: 6 } 
            }));
            if (onAllColumnsVisible) {
              onAllColumnsVisible();
            }
          }

          if (step >= 8 && currentSection === 8) {
            setTimeout(() => {
              if (window.gotoNextSlide && currentSection === 8) {
                window.gotoNextSlide();
              }
            }, 300);
          }
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleWheel = (e) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      wheelDelta += e.deltaY;

      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }

      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 40 && !isProcessingScroll) {
          if (wheelDelta > 0) {
            const nextStep = Math.min(currentStep + 1, 8);
            smoothScrollToStep(nextStep);
          } else {
            if (currentStep === 0) {
              if (window.gotoPrevSlide) {
                window.gotoPrevSlide();
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
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [onAllColumnsVisible, isScrollEnabled, currentSection]);

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
                These laws shape your rise, break or keep, but choose awake.
              </p>
              <p className={styles.greyLineText}>
                Every rule you keep or break shapes your rise,
              </p>
               <p className={styles.greyLineText}>
                and one weekend carves those choices into the life you crystallize.
              </p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className={styles.scrollRevealMainContent}>
            <div className={styles.powersMainContent}>
            <div
              ref={el => columnsRef.current[0] = el}
              className={`${styles.powersSection} ${!isInitialized ? styles.gridColumnInitial : ''}`}
            >
              <h3
                className={styles.sectionTitle}
                style={{
                  opacity: visibleColumns >= 1 ? 1 : 0,
                  transform: visibleColumns >= 1 ? 'translateY(0)' : 'translateY(30px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
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
                  Laws you cannot break
                </span>
              </h3>
              <p
                className={styles.heroParagraph}
                style={{
                  opacity: visibleColumns >= 1 ? 1 : 0,
                  transform: visibleColumns >= 1 ? 'translateY(0)' : 'translateY(30px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s',
                  textAlign: 'center'
                }}
              >
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>There are truths this game won&apos;t let you fake,</span>
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>for the self you meet is the one you make.</span>
              </p>

              <div className={`${styles.powersGrid2x2}`}>
                <div className={styles.cardWrapper}>
                  <div
                    className={styles.hoverCard}
                    style={{
                      opacity: visibleColumns >= 3 ? 1 : 0,
                      transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                        <img 
                          src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.1.svg" 
                          alt="Intuition" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.cardHoverContent}>
                        <p className={styles.cardDescription}>Be real. The game knows.</p>
                      </div>
                    </div>
                  </div>
                  <h4
                    className={styles.cardTitleBelow}
                    style={{
                      opacity: visibleColumns >= 3 ? 1 : 0,
                      transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}
                  >Presence Over Pretending</h4>
                </div>
                <div className={styles.cardWrapper}>
                  <div
                    className={styles.hoverCard}
                    style={{
                      opacity: visibleColumns >= 4 ? 1 : 0,
                      transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                        <img 
                          src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.2.svg" 
                          alt="Inner Voice" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.cardHoverContent}>
                        <p className={styles.cardDescription}>Questions open what answers close.</p>
                      </div>
                    </div>
                  </div>
                  <h4
                    className={styles.cardTitleBelow}
                    style={{
                      opacity: visibleColumns >= 4 ? 1 : 0,
                      transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                    }}
                  >Curiosity Over Certainty</h4>
                </div>
                <div className={styles.cardWrapper}>
                  <div
                    className={styles.hoverCard}
                    style={{
                      opacity: visibleColumns >= 5 ? 1 : 0,
                      transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                        <img 
                          src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.3.svg" 
                          alt="Instinct" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.cardHoverContent}>
                        <p className={styles.cardDescription}>Move once. Shift everything.</p>
                      </div>
                    </div>
                  </div>
                  <h4
                    className={styles.cardTitleBelow}
                    style={{
                      opacity: visibleColumns >= 5 ? 1 : 0,
                      transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                    }}
                  >Action Over Avoidance</h4>
                </div>
                <div className={styles.cardWrapper}>
                  <div
                    className={styles.hoverCard}
                    style={{
                      opacity: visibleColumns >= 6 ? 1 : 0,
                      transform: visibleColumns >= 6 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                        <img 
                          src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.4.svg" 
                          alt="Risk" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.cardHoverContent}>
                        <p className={styles.cardDescription}>Your truth leads. Always.</p>
                      </div>
                    </div>
                  </div>
                  <h4
                    className={styles.cardTitleBelow}
                    style={{
                      opacity: visibleColumns >= 6 ? 1 : 0,
                      transform: visibleColumns >= 6 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                    }}
                  >Self Before Society</h4>
                </div>
              </div>
            </div>

            <div className={styles.separatorLine}></div>

            <div
              ref={el => columnsRef.current[1] = el}
              className={`${styles.forcesSection} ${!isInitialized && isScrollEnabled ? styles.gridColumnInitial : ''}`}
            >
              <h3
                className={styles.sectionTitle}
                style={{
                  opacity: visibleColumns >= 2 ? 1 : 0,
                  transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
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
                  Laws you can break
                </span>
              </h3>
              <p
                className={styles.heroParagraph}
                style={{
                  opacity: visibleColumns >= 2 ? 1 : 0,
                  transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s',
                  textAlign: 'center'
                }}
              >
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Their rules were built to quiet your fire,</span>
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>break them once and you rise higher.</span>
              </p>

              <div className={`${styles.forcesGrid2x2}`}>
                <div className={styles.cardWrapper}>
                  <div
                    className={styles.hoverCard}
                    style={{
                      opacity: visibleColumns >= 3 ? 1 : 0,
                      transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                        <img 
                          src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.5.svg" 
                          alt="Society" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.cardHoverContent}>
                        <p className={styles.cardDescription}>Reject the roles they wrote.</p>
                      </div>
                    </div>
                  </div>
                  <h4
                    className={styles.cardTitleBelow}
                    style={{
                      opacity: visibleColumns >= 3 ? 1 : 0,
                      transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                    }}
                  >Break Their Scripts</h4>
                </div>
                <div className={styles.cardWrapper}>
                  <div
                    className={styles.hoverCard}
                    style={{
                      opacity: visibleColumns >= 4 ? 1 : 0,
                      transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                        <img 
                          src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.6.svg" 
                          alt="Government" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.cardHoverContent}>
                        <p className={styles.cardDescription}>Their metrics don&apos;t mean truth.</p>
                      </div>
                    </div>
                  </div>
                  <h4
                    className={styles.cardTitleBelow}
                    style={{
                      opacity: visibleColumns >= 4 ? 1 : 0,
                      transform: visibleColumns >= 4 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                    }}
                  >Break Their Measures</h4>
                </div>
                <div className={styles.cardWrapper}>
                  <div
                    className={styles.hoverCard}
                    style={{
                      opacity: visibleColumns >= 5 ? 1 : 0,
                      transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                        <img 
                          src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.7.svg" 
                          alt="Religion" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.cardHoverContent}>
                        <p className={styles.cardDescription}>Borrowed fears deserve exile.</p>
                      </div>
                    </div>
                  </div>
                  <h4
                    className={styles.cardTitleBelow}
                    style={{
                      opacity: visibleColumns >= 5 ? 1 : 0,
                      transform: visibleColumns >= 5 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                    }}
                  >Break Their Fears</h4>
                </div>
                <div className={styles.cardWrapper}>
                  <div
                    className={styles.hoverCard}
                    style={{
                      opacity: visibleColumns >= 6 ? 1 : 0,
                      transform: visibleColumns >= 6 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                        <img 
                          src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.8.svg" 
                          alt="Media" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.cardHoverContent}>
                        <p className={styles.cardDescription}>One weekend rewires everything.</p>
                      </div>
                    </div>
                  </div>
                  <h4
                    className={styles.cardTitleBelow}
                    style={{
                      opacity: visibleColumns >= 6 ? 1 : 0,
                      transform: visibleColumns >= 6 ? 'translateY(0)' : 'translateY(30px)',
                      transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                    }}
                  >Break Their Timelines</h4>
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

