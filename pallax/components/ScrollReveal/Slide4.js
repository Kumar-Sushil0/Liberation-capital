"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import styles from '../../Pallax.module.css';
import lifeidesignsvg from '../../../../assets/images/lifeidesignsvg.svg';

const psychologyImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+1.svg';
const philosophyImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+2.svg';
const playImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+3.svg';

export const ScrollRevealSectionSlide4 = ({ onAllColumnsVisible, currentSection, isScrollEnabled = true }) => {
  const containerRef = useRef(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 3);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const columnsRef = useRef([]);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Refs for controlling flipping words manually
  const psychologyFlipRef = useRef(null);
  const philosophyFlipRef = useRef(null);
  const playFlipRef = useRef(null);

  // Track which columns have been triggered to prevent re-triggering
  const [triggeredColumns, setTriggeredColumns] = useState(new Set());

  // Function to trigger flipping animations based on visible columns
  const triggerFlippingAnimations = (step) => {
    setTimeout(() => {
      if (step >= 2 && philosophyFlipRef.current) {
        philosophyFlipRef.current.triggerFlip();
      }
    }, 200);

    setTimeout(() => {
      if (step >= 3 && playFlipRef.current) {
        playFlipRef.current.triggerFlip();
      }
    }, 400);
  };

  // Trigger flipping animations when visibleColumns changes
  useEffect(() => {
    if (isInitialized && visibleColumns >= 1) {
      if (visibleColumns >= 1 && psychologyFlipRef.current && !triggeredColumns.has(1)) {
        setTimeout(() => {
          psychologyFlipRef.current.triggerFlip();
          setTriggeredColumns(prev => new Set(prev).add(1));
        }, 200);
      }

      if (visibleColumns >= 2 && philosophyFlipRef.current && !triggeredColumns.has(2)) {
        setTimeout(() => {
          philosophyFlipRef.current.triggerFlip();
          setTriggeredColumns(prev => new Set(prev).add(2));
        }, 400);
      }

      if (visibleColumns >= 3 && playFlipRef.current && !triggeredColumns.has(3)) {
        setTimeout(() => {
          playFlipRef.current.triggerFlip();
          setTriggeredColumns(prev => new Set(prev).add(3));
        }, 600);
      }
    }
  }, [visibleColumns, isInitialized, triggeredColumns]);

  // Reset triggered columns when entering slide 4
  useEffect(() => {
    if (isInitialized && currentSection === 5) {
      setTriggeredColumns(new Set());
    }
  }, [currentSection, isInitialized]);

  // Initialize component with proper state to prevent flash
  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 3);

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
    if (currentSection !== 5) return;

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
        container.scrollTop = 0;
      }
    }

    setTimeout(() => {
      setSkipTransitions(false);
    }, 50);
  }, [isScrollEnabled, onAllColumnsVisible, isInitialized, currentSection]);

  // Reset to initial state when entering slide 4 (currentSection === 5)
  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (!isInitialized) return;

    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;

    // Only reset when ENTERING this section (not when already on it or leaving it)
    if (currentSection === 5 && prevSection !== 5 && isScrollEnabled) {
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
        maxScroll * 0.2,
        maxScroll * 0.45,
        maxScroll * 0.7,
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
            detail: { section: 5, step: 1 } 
          }));
        }
        
        if (step === 2) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 5, step: 2 } 
          }));
        }
        
        if (step === 3) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 5, step: 3 } 
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
              detail: { section: 5, step: 1 } 
            }));
          }
          
          if (step === 2) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 5, step: 2 } 
            }));
          }
          
          if (step === 3) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 5, step: 3 } 
            }));
            if (onAllColumnsVisible) {
              onAllColumnsVisible();
            }
          }

          if (step >= 4 && currentSection === 5) {
            setTimeout(() => {
              if (window.gotoNextSlide && currentSection === 5) {
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
            const nextStep = Math.min(currentStep + 1, 4);
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
  }, [onAllColumnsVisible, isScrollEnabled]);

  // Mobile Layout
  if (isMobile) {
    return (
      <div className={styles.slide4MobileContainer}>
        {/* Grey Line Container */}
        <div className={styles.greyLineContainerMobile}>
          <p className={styles.greyLineTextMobile}>
            Together, they form the alchemy of becoming —where thought becomes design, then design becomes destiny.
          </p>
        </div>

        {/* Columns Stacked Vertically */}
        <div className={styles.mobileColumnsWrapper}>
          {/* Column 1: Psychology */}
          <div className={styles.mobileColumn}>
            <h3 className={styles.mobileColumnTitle}>PSYCHOLOGY</h3>
            <p className={styles.mobileColumnText}>
              Beyond reflection, truth bends and flows<br />
              The self you design is the self that grows.
            </p>
            <div className={styles.mobileColumnImage}>
              <Image
                src={psychologyImageUrl}
                width={120}
                height={120}
                alt="Life i Design Game"
                className={styles.mobileImageContent}
                unoptimized
              />
            </div>
          </div>

          {/* Column 2: Philosophy */}
          <div className={styles.mobileColumn}>
            <h3 className={styles.mobileColumnTitle}>PHILOSOPHY</h3>
            <p className={styles.mobileColumnText}>
              Know thy loops, break the chain,<br />
              Rewire the mind, redesign the game.
            </p>
            <div className={styles.mobileColumnImage}>
              <Image
                src={philosophyImageUrl}
                width={120}
                height={120}
                alt="Life i Design Game"
                className={styles.mobileImageContent}
                unoptimized
              />
            </div>
          </div>

          {/* Column 3: Play */}
          <div className={styles.mobileColumn}>
            <h3 className={styles.mobileColumnTitle}>PLAY</h3>
            <p className={styles.mobileColumnText}>
              Fall, rise, and play unbound,<br />
              Where curiosity leads, wonder&apos;s found.
            </p>
            <div className={styles.mobileColumnImage}>
              <Image
                src={playImageUrl}
                width={120}
                height={120}
                alt="Life i Design Game"
                className={styles.mobileImageContent}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
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
              <p className={styles.greyLineTextNoWrap}>
                Prime your psyche, the alignment before the weekend.
              </p>
              <p className={styles.greyLineTextNoWrap}>
                These codes tune your inner field, the alignment required before the weekend remakes you.
                </p>
                <p className={styles.greyLineTextNoWrap}>
                Install them, and the path ahead will answer to who you choose to become.              
              </p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className={styles.scrollRevealMainContent}>
            <div className={styles.threeColumnGrid} style={{ marginBottom: 0 }}>
            <div
              ref={el => columnsRef.current[0] = el}
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
                  margin: 0
                }}>
                  Design Future with Fiction
                </h3>
              </div>
              <div className={styles.textContent}>
                <p className={styles.heroParagraph} style={{
                  fontFamily: '"satoshi", sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  color: '#888888'
                }}>
                  Imagine beyond the limits you keep; futures start where you leap.
                </p>
              </div>
              <div className={styles.imageContent}>
                <Image
                  src={psychologyImageUrl}
                  width={200}
                  height={200}
                  alt="Life i Design Game"
                  className={styles.heroImageContent}
                  unoptimized
                />
              </div>
            </div>

            <div
              ref={el => columnsRef.current[1] = el}
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
                  margin: 0
                }}>
                  Step into Intentional Delusion
                </h3>
              </div>
              <div className={styles.textContent}>
                <p className={styles.heroParagraph} style={{
                  fontFamily: '"satoshi", sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  color: '#888888'
                }}>
                  Act as the person you intend to be; the act becomes the truth.
                </p>
              </div>
              <div className={styles.imageContent}>
                <Image
                  src={philosophyImageUrl}
                  width={200}
                  height={200}
                  alt="Life i Design Game"
                  className={styles.heroImageContent}
                  unoptimized
                />
              </div>
            </div>

            <div
              ref={el => columnsRef.current[2] = el}
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
                  margin: 0
                }}>
                  Self Obsession &gt; Collective Conformity
                </h3>
              </div>
              <div className={styles.textContent}>
                <p className={styles.heroParagraph} style={{
                  fontFamily: '"satoshi", sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  color: '#888888'
                }}>
                  Choose your pulse over applause; your self is the only authority.
                </p>
              </div>
              <div className={styles.imageContent}>
                <Image
                  src={playImageUrl}
                  width={200}
                  height={200}
                  alt="Life i Design Game"
                  className={styles.heroImageContent}
                  unoptimized
                />
              </div>
            </div>
          </div>

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

