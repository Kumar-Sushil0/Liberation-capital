"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import styles from '../../Pallax.module.css';

const boldArtistImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/6.+game+crowd+1.svg';
const valueCreatorImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/6.+game+crowd+2.svg';
const creativeEntrepreneurImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/6.+game+crowd+3.svg';

export const ScrollRevealSectionSlide13New = ({ onAllColumnsVisible, currentSection, isScrollEnabled = true }) => {
  const containerRef = useRef(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 3);
  const [skipTransitions, setSkipTransitions] = useState(true); // Start with transitions disabled
  const [isInitialized, setIsInitialized] = useState(false);
  const columnsRef = useRef([]);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Refs for controlling flipping words manually
  const boldArtistFlipRef = useRef(null);
  const valueCreatorFlipRef = useRef(null);
  const creativeEntrepreneurFlipRef = useRef(null);

  // Track which columns have been triggered to prevent re-triggering
  const [triggeredColumns, setTriggeredColumns] = useState(new Set());

  // Initialize component with proper state to prevent flash
  useEffect(() => {
    // Set initial state immediately without transitions
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 3);

    // Enable transitions after a brief delay to prevent flash
    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Reset visible columns when isScrollEnabled changes
  useEffect(() => {
    if (!isInitialized) return; // Don't run until initialized
    
    // Only respond to isScrollEnabled changes when we're actually on this section
    if (currentSection !== 16) return;

    setSkipTransitions(true); // Disable transitions during state change

    if (!isScrollEnabled) {
      setVisibleColumns(6);
      if (onAllColumnsVisible) {
        onAllColumnsVisible();
      }
    } else {
      setVisibleColumns(0); // Start with no columns when scroll effect is enabled
      // Set initial scroll position to match step 0
      const container = containerRef.current;
      if (container) {
        container.scrollTop = 0; // Step 0 position
      }
    }

    // Re-enable transitions after state change
    setTimeout(() => {
      setSkipTransitions(false);
    }, 50);
  }, [isScrollEnabled, onAllColumnsVisible, isInitialized, currentSection]);

  // Reset to initial state when entering slide (currentSection === 16)
  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (!isInitialized) return;

    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;

    // Only reset when ENTERING this section (not when already on it or leaving it)
    if (currentSection === 16 && prevSection !== 16 && isScrollEnabled) {
      // Reset to initial state when entering slide
      setSkipTransitions(true);
      setVisibleColumns(0);
      setTriggeredColumns(new Set()); // Reset triggered columns

      // Set initial scroll position
      const container = containerRef.current;
      if (container) {
        container.scrollTop = 0; // Step 0 position
      }

      // Re-enable transitions after reset
      setTimeout(() => {
        setSkipTransitions(false);
      }, 100);
    }
  }, [currentSection, isScrollEnabled, isInitialized]);

  // Trigger flipping animations when visibleColumns changes
  useEffect(() => {
    if (isInitialized && visibleColumns >= 1) {
      // Trigger BOLD ARTIST (column 1) when it becomes visible (step 1)
      if (visibleColumns >= 1 && boldArtistFlipRef.current && !triggeredColumns.has(1)) {
        setTimeout(() => {
          boldArtistFlipRef.current.triggerFlip();
          setTriggeredColumns(prev => new Set(prev).add(1));
        }, 200);
      }

      // Trigger VALUE CREATOR (column 2) when it becomes visible (step 2)
      if (visibleColumns >= 2 && valueCreatorFlipRef.current && !triggeredColumns.has(2)) {
        setTimeout(() => {
          valueCreatorFlipRef.current.triggerFlip();
          setTriggeredColumns(prev => new Set(prev).add(2));
        }, 400);
      }

      // Trigger CREATIVE ENTREPRENEUR (column 3) when it becomes visible (step 3)
      if (visibleColumns >= 3 && creativeEntrepreneurFlipRef.current && !triggeredColumns.has(3)) {
        setTimeout(() => {
          creativeEntrepreneurFlipRef.current.triggerFlip();
          setTriggeredColumns(prev => new Set(prev).add(3));
        }, 600);
      }
    }
  }, [visibleColumns, isInitialized, triggeredColumns]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If scroll effect is disabled, don't add wheel listeners
    if (!isScrollEnabled) {
      return;
    }

    let wheelDelta = 0;
    let wheelTimer = null;
    let currentStep = 0; // 0, 1, 2, 3 for each column reveal step (start from 0)
    let isProcessingScroll = false;

    const smoothScrollToStep = (step, skipAnimation = false) => {
      if (isScrollingRef.current || isProcessingScroll) return;
      isScrollingRef.current = true;
      isProcessingScroll = true;

      const scrollHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;
      const maxScroll = scrollHeight - containerHeight;

      // Define precise scroll positions for each step
      const scrollPositions = [
        0,                    // Step 0: No columns visible
        maxScroll * 0.2,      // Step 1: First column
        maxScroll * 0.45,     // Step 2: Second column  
        maxScroll * 0.7,      // Step 3: Third column
        maxScroll             // Step 4: Complete (triggers next slide)
      ];

      const targetScroll = scrollPositions[step] || 0;

      // Update state immediately and skip animation if requested
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

        // Re-enable transitions after a brief moment
        setTimeout(() => {
          setSkipTransitions(false);
        }, 50);

        if (step === 1) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 16, step: 1 } 
          }));
        }
        
        if (step === 2) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 16, step: 2 } 
          }));
        }
        
        if (step === 3) {
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 16, step: 3 } 
          }));
          if (onAllColumnsVisible) {
            onAllColumnsVisible();
          }
        }

        return;
      }

      // Smooth scroll animation using requestAnimationFrame
      const startScroll = container.scrollTop;
      const distance = targetScroll - startScroll;
      const duration = 500;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation (easeInOutCubic)
        const easeProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        container.scrollTop = startScroll + (distance * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          isScrollingRef.current = false;

          // Update visible columns based on step
          setVisibleColumns(step);
          currentStep = step;
          // Reset processing flag after a short delay to allow next scroll
          setTimeout(() => {
            isProcessingScroll = false;
          }, 100);

          if (step === 1) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 16, step: 1 } 
            }));
          }
          
          if (step === 2) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 16, step: 2 } 
            }));
          }
          
          if (step === 3) {
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 16, step: 3 } 
            }));
            if (onAllColumnsVisible) {
              onAllColumnsVisible();
            }
          }

          // Auto-advance to next slide when reaching step 4
          if (step >= 4 && currentSection === 16) {
            setTimeout(() => {
              // Double check we're still on slide before advancing
              if (window.gotoNextSlide && currentSection === 16) {
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

      // Accumulate wheel delta
      wheelDelta += e.deltaY;

      // Clear existing timer
      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }

      // Wait for wheel events to settle
      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 40 && !isProcessingScroll) {
          if (wheelDelta > 0) {
            // Scroll down - next step
            const nextStep = Math.min(currentStep + 1, 4);
            smoothScrollToStep(nextStep);
          } else {
            // Scroll up - previous step or go to previous slide
            if (currentStep === 0) {
              // At the beginning (step 0), go to previous slide
              if (window.gotoPrevSlide) {
                window.gotoPrevSlide();
              }
            } else {
              const prevStep = Math.max(currentStep - 1, 0);
              smoothScrollToStep(prevStep);
            }
          }
        }
        wheelDelta = 0; // Reset delta
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
                Before the weekend begins, your psyche must align.
              </p>
            
              <p className={styles.greyLineText}>
                Every beginning needs a moment to align.</p>
               <p className={styles.greyLineText}>
                This sequence prepares your mind for the hour with the highest return on your life&apos;s design.
              </p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className={styles.scrollRevealMainContent}>
            <div className={styles.threeColumnGrid}>
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
                  Test Your Game Vibe
                </h3>
              </div>
              <div className={styles.textContent} style={{ flexDirection: 'column' }}>
                <p className={styles.heroParagraph} style={{
                  fontFamily: '"satoshi", sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  color: '#888888'
                }}>
                  Face nine mirrors and see how your psyche stands today.
                  <br />
                  Your score doesn&apos;t judge you — it simply shows where you should start the play.
                </p>
              </div>
              <div className={styles.imageContent}>
                <Image
                  src={boldArtistImageUrl}
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
                  Unlock Your Alignment Reward
                </h3>
              </div>
              <div className={styles.textContent} style={{ flexDirection: 'column' }}>
                <p className={styles.heroParagraph} style={{
                  fontFamily: '"satoshi", sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  color: '#888888'
                }}>
                  Your resonance opens the gate: a $20 Alignment Reward to claim your climb.
                  <br />
                  Use it for Pre-Game — the first hour that bends your timeline.
                </p>
              </div>
              <div className={styles.imageContent}>
                <Image
                  src={valueCreatorImageUrl}
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
                  Anchor Yourself for the Hour
                </h3>
              </div>
              <div className={styles.textContent} style={{ flexDirection: 'column' }}>
                <p className={styles.heroParagraph} style={{
                  fontFamily: '"satoshi", sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  color: '#888888'
                }}>
                  Turn off the world and make the space —
                  <br />
                  one focused hour can reshape your entire inner place. Prepare before. Reflect after.
                </p>
              </div>
              <div className={styles.imageContent}>
                <Image
                  src={creativeEntrepreneurImageUrl}
                  width={200}
                  height={200}
                  alt="Life i Design Game"
                  className={styles.heroImageContent}
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Progress Indicator Line */}
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

