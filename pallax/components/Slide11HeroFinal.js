"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const gamePauseImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/8.+game+pause.svg';

/**
 * Slide11HeroFinal - Eleventh slide component for the parallax experience
 * Displays the final hero message with closing thoughts and call to action
 * @returns {JSX.Element} Hero final slide component
 */
const Slide11HeroFinal = ({ onAllColumnsVisible, currentSection, isScrollEnabled = true }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 2);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const prevSectionRef = useRef(currentSection);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // No early returns; hooks above must run consistently across renders

  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 2);
    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [isScrollEnabled]);

  useEffect(() => {
    if (!isInitialized) return;
    if (currentSection !== 10) return;
    setSkipTransitions(true);
    if (!isScrollEnabled) {
      setVisibleColumns(2);
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

  useEffect(() => {
    if (!isInitialized) return;
    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;
    if (currentSection === 10 && prevSection !== 10 && isScrollEnabled) {
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
    if (!isScrollEnabled) return;
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
        // Reset processing flag after a short delay to allow next scroll
        setTimeout(() => {
          isProcessingScroll = false;
        }, 100);
        setTimeout(() => {
          setSkipTransitions(false);
        }, 50);
        if (step === 2 && onAllColumnsVisible) {
          onAllColumnsVisible();
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
        const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
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
          if (step === 2 && onAllColumnsVisible) {
            onAllColumnsVisible();
          }
          if (step >= 3 && currentSection === 10) {
            setTimeout(() => {
              if (window.gotoNextSlide && currentSection === 10) {
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
      e.stopPropagation();
      if (isScrollingRef.current) return;
      wheelDelta += e.deltaY;
      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }
      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 40 && !isProcessingScroll) {
          if (wheelDelta > 0) {
            const nextStep = Math.min(currentStep + 1, 3);
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
    };
  }, [isScrollEnabled, onAllColumnsVisible, currentSection]);

  return (
    isMobile ? (
      <div className={styles.scrollRevealMasterContainer}>
        {/* Fixed Grey Line Container */}
        <div className={styles.greyLineContainer} style={{ zIndex: 10 }}>
          <p className={styles.greyLineText} style={{ color: '#888888', opacity: 1 }}>
            See yourself clearly, without the noise.
          </p>
        </div>

        {/* Main Content Container */}
        <div className={styles.scrollRevealMainContent}>
          <div className={styles.heroLayoutMobile}>
            {/* Image at top */}
            <div className={styles.heroImageMobile}>
              <Image
                src={gamePauseImageUrl}
                width={200}
                height={200}
                alt="Life i Design Game"
                className={styles.heroImageContentMobile}
                unoptimized
              />
            </div>

            {/* Text content below */}
            <div className={styles.heroContentMobile}>
              <div className={styles.heroTextMobile}>
                <p className={styles.heroParagraphMobile}>
                  The mirror shows the self you&apos;ve masked,
                </p>

                <p className={styles.heroParagraphMobile}>
                  the fire you hid, the truth unasked.
                </p>

                <p className={styles.heroParagraphMobile}>
                  Where vision clears and motives rise,
                </p>

                <p className={styles.heroParagraphMobile}>
                  your old excuses lose their disguise.
                </p>

                <p className={styles.heroParagraphMobile}>
                  Meet the mind that&apos;s ready to break through,
                </p>

                <p className={styles.heroParagraphMobile} style={{ color: '#888888' }}>
                  and watch the next self start pointing at you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.greyLineContainer} style={{ zIndex: 10, paddingTop: '20px', paddingBottom: '100px' }}>
          <div style={{
            fontFamily: '"satoshi", sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            textAlign: 'center',
            margin: '40px auto 0',
            maxWidth: '380px',
            lineHeight: 1.3,
            background: '#000000',
            borderLeft: '2px solid #ffe61d',
            borderRight: '2px solid #ffe61d',
            borderBottom: '2px solid #ffe61d',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
            opacity: 1
          }}>
            <div style={{ background: '#ffe61d', padding: '4px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '16px', height: '16px', color: '#000000' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <span style={{ color: '#000000', fontWeight: '700', fontSize: '12px', letterSpacing: '1.2px' }}>WARNING</span>
            </div>
            <div style={{ padding: '6px 12px' }}>
              <div style={{ marginTop: '1px', color: '#ffffff', fontWeight: '400', fontSize: '11px' }}>
                Playing this game will make you
              </div>
              <div style={{ marginTop: '1px', color: '#ffffff', fontWeight: '600', fontSize: '11px', letterSpacing: '0.3px' }}>
                Present — Piercing — Precise.
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        ref={containerRef}
        className={styles.scrollRevealContainer}
        style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
      >
        <div style={{ height: '200vh', position: 'relative' }}>
          <div className={styles.scrollRevealMasterContainer} style={{ position: 'sticky', top: 0 }}>
            <div className={styles.greyLineContainer}>
              <p
                className={styles.greyLineText}
                style={{
                  opacity: visibleColumns >= 0 ? 1 : 0,
                  transform: visibleColumns >= 0 ? 'translateY(0)' : 'translateY(10px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                }}
              >
                See yourself clearly, without the noise.
              </p>
            </div>
            <div className={styles.scrollRevealMainContent}>
              <div
                className={styles.heroLayout}
                style={{
                  opacity: visibleColumns >= 1 ? 1 : 0,
                  transform: visibleColumns >= 1 ? 'translateY(0)' : 'translateY(20px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.6s ease 0.2s'
                }}
              >
                <div className={styles.heroContent}>
                  <div className={styles.heroText}>
                    <p className={styles.heroParagraph}>
                      The mirror shows the self you&apos;ve masked,
                    </p>

                    <p className={styles.heroParagraph}>
                      the fire you hid, the truth unasked.
                    </p>

                    <p className={styles.heroParagraph}>
                      Where vision clears and motives rise,
                    </p>

                    <p className={styles.heroParagraph}>
                      your old excuses lose their disguise.
                    </p>

                    <p className={styles.heroParagraph}>
                      Meet the mind that&apos;s ready to break through,
                    </p>

                    <p className={styles.heroParagraph} style={{ fontFamily: '"satoshi", sans-serif', color: '#888888' }}>
                      and watch the next self start pointing at you.
                    </p>
                  </div>
                </div>

                <div className={styles.heroImage}>
                  <Image
                    src={gamePauseImageUrl}
                    width={400}
                    height={400}
                    alt="Life i Design Game"
                    className={styles.heroImageContent}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            <div
              className={styles.greyLineContainer}
              style={{ zIndex: 10, paddingTop: '20px', paddingBottom: '100px' }}
            >
              <div
                style={{
                  fontFamily: '"satoshi", sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  textAlign: 'center',
                  margin: '20px auto 0',
                  maxWidth: '380px',
                  lineHeight: 1.3,
                  background: '#000000',
                  borderLeft: '2px solid #ffe61d',
                  borderRight: '2px solid #ffe61d',
                  borderBottom: '2px solid #ffe61d',
                  borderRadius: '4px',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: visibleColumns >= 2 ? 1 : 0,
                  transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(20px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.6s ease 0.3s'
                }}
              >
                <div style={{ background: '#ffe61d', padding: '4px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '16px', height: '16px', color: '#000000' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                  <span style={{ color: '#000000', fontWeight: '700', fontSize: '12px', letterSpacing: '1.2px' }}>WARNING</span>
                </div>
                <div style={{ padding: '6px 12px' }}>
                  <div style={{ marginTop: '1px', color: '#ffffff', fontWeight: '400', fontSize: '11px' }}>
                    Playing this game will make you
                  </div>
                  <div style={{ marginTop: '1px', color: '#ffffff', fontWeight: '600', fontSize: '11px', letterSpacing: '0.3px' }}>
                    Present — Piercing — Precise.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Slide11HeroFinal;
