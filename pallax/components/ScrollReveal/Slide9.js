"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../Pallax.module.css';

export const ScrollRevealSectionSlide9 = ({ onAllColumnsVisible, currentSection, isScrollEnabled = true }) => {
  const containerRef = useRef(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 7);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Refs for controlling flipping words manually
  const youWillGainFlipRef = useRef(null);
  const youWillLoseFlipRef = useRef(null);

  // Track which columns have been triggered to prevent re-triggering
  const [triggeredColumns, setTriggeredColumns] = useState(new Set());

  // Initialize component with proper state to prevent flash
  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 7);

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
    if (currentSection !== 9) return;

    setSkipTransitions(true);
    setTriggeredColumns(new Set());

    if (!isScrollEnabled) {
      setVisibleColumns(7);
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

  // Reset to initial state when entering slide 9 (currentSection === 9)
  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (!isInitialized) return;

    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;

    // Only reset when ENTERING this section (not when already on it or leaving it)
    if (currentSection === 9 && prevSection !== 9 && isScrollEnabled) {
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

  // Trigger flipping animations when visibleColumns changes (for slide 9)
  useEffect(() => {
    if (isInitialized && visibleColumns >= 1) {
      if (visibleColumns >= 1 && youWillGainFlipRef.current && !triggeredColumns.has(1)) {
        setTimeout(() => {
          youWillGainFlipRef.current.triggerFlip();
          setTriggeredColumns(prev => new Set(prev).add(1));
        }, 200);
      }

      if (visibleColumns >= 2 && youWillLoseFlipRef.current && !triggeredColumns.has(2)) {
        setTimeout(() => {
          youWillLoseFlipRef.current.triggerFlip();
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
              detail: { section: 10, step: 1 } 
            }));
          }
          
          if (step === 2) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 10, step: 2 } 
            }));
          }
          
          if (step === 3) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 10, step: 3 } 
            }));
          }
          
          if (step === 4) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 10, step: 4 } 
            }));
          }
          
          if (step === 5) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 10, step: 5 } 
            }));
          }
          
          if (step === 6) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 10, step: 6 } 
            }));
            if (onAllColumnsVisible) {
              onAllColumnsVisible();
            }
          }

          if (step >= 8 && currentSection === 9) {
            setTimeout(() => {
              if (window.gotoNextSlide && currentSection === 9) {
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
      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }
    };
  }, [currentSection, isScrollEnabled, onAllColumnsVisible, isInitialized]);

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
                What you gain defines you. What you lose frees you.
              </p>
              <p className={styles.greyLineText}>
                Every shift demands a price, </p>
               <p className={styles.greyLineText}>
                one weekend is enough to change your life.
              </p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className={styles.scrollRevealMainContent}>
            <div className={styles.gainsMainContent}>
          <div className={styles.gainsSection}>
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
                YOU WILL GAIN
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
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>You&apos;ll gain the truth that can&apos;t be bought,</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>and lose the fear of what you&apos;re not.</span>
            </p>
            <div className={`${styles.gainsGrid2x2}`}>
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
                        src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.1.svg" 
                        alt="Selfishness" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardHoverContent}>
                      <p className={styles.cardDescription}>The fuel that frees your flame.</p>
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
                >Selfishness</h4>
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
                        src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.2.svg" 
                        alt="Sovereignty" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardHoverContent}>
                      <p className={styles.cardDescription}>The crown that bears your name.</p>
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
                >Sovereignty</h4>
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
                        src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.3.svg" 
                        alt="Obsession" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardHoverContent}>
                      <p className={styles.cardDescription}>The hunger that shapes your fire.</p>
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
                >Obsession</h4>
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
                        src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.4.svg" 
                        alt="Creation" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardHoverContent}>
                      <p className={styles.cardDescription}>The ground where you never tire.</p>
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
                >Creation</h4>
              </div>
            </div>
          </div>

          <div className={styles.separatorLine}></div>

          <div className={styles.lossesSection}>
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
                YOU WILL LOSE
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
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>To rise beyond the life you knew,</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>you&apos;ll shed the cage that once felt true.</span>
            </p>
            <div className={`${styles.lossesGrid2x2}`}>
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
                        src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.5.svg" 
                        alt="Approval" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardHoverContent}>
                      <p className={styles.cardDescription}>The mirror that bends your view.</p>
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
                >Approval</h4>
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
                        src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.6.svg" 
                        alt="Excuses" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardHoverContent}>
                      <p className={styles.cardDescription}>The fog that hides your cue..</p>
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
                >Excuses</h4>
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
                        src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.7.svg" 
                        alt="Comfort" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardHoverContent}>
                      <p className={styles.cardDescription}>The cage you called your peace.</p>
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
                >Comfort</h4>
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
                        src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.8.svg" 
                        alt="Fear" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardHoverContent}>
                      <p className={styles.cardDescription}>The clock that won&apos;t release.</p>
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
                >Fear</h4>
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

