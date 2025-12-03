"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/slides.module.css';

interface PlayiDesignSlideProps {
  currentSection?: number;
  isScrollEnabled?: boolean;
  onAllColumnsVisible?: () => void;
}

export const PlayiDesignSlide = ({ 
  currentSection = 0, 
  isScrollEnabled = true,
  onAllColumnsVisible 
}: PlayiDesignSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 3);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 3);
    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [isScrollEnabled]);

  useEffect(() => {
    if (!isInitialized || currentSection !== 11) return;
    setSkipTransitions(true);
    if (!isScrollEnabled) {
      setVisibleColumns(3);
      if (onAllColumnsVisible) onAllColumnsVisible();
    } else {
      setVisibleColumns(0);
      const container = containerRef.current;
      if (container) container.scrollTop = 0;
    }
    setTimeout(() => setSkipTransitions(false), 50);
  }, [isScrollEnabled, onAllColumnsVisible, isInitialized, currentSection]);

  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (!isInitialized) return;
    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;
    if (currentSection === 11 && prevSection !== 11 && isScrollEnabled) {
      setSkipTransitions(true);
      setVisibleColumns(0);
      const container = containerRef.current;
      if (container) container.scrollTop = 0;
      setTimeout(() => setSkipTransitions(false), 100);
    }
  }, [currentSection, isScrollEnabled, isInitialized]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInitialized || !isScrollEnabled) return;

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
      const scrollPositions = [0, maxScroll * 0.33, maxScroll * 0.66, maxScroll];
      const targetScroll = scrollPositions[step] || 0;

      if (skipAnimation || step === 0) {
        setSkipTransitions(true);
        container.scrollTop = targetScroll;
        setVisibleColumns(step);
        currentStep = step;
        isScrollingRef.current = false;
        setTimeout(() => isProcessingScroll = false, 100);
        setTimeout(() => setSkipTransitions(false), 50);
        if (step === 3 && onAllColumnsVisible) onAllColumnsVisible();
        return;
      }

      const startScroll = container.scrollTop;
      const distance = targetScroll - startScroll;
      const duration = 500;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
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
          setTimeout(() => isProcessingScroll = false, 100);
          if (step === 3 && onAllColumnsVisible) onAllColumnsVisible();
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
    <div ref={containerRef} className={styles.scrollRevealContainer} style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
      <div style={{ height: '200vh', position: 'relative' }}>
        <div className={styles.scrollRevealMasterContainer} style={{ position: 'sticky', top: 0 }}>
          <div className={styles.greyLineContainer}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p className={styles.greyLineText}>A future self is only real when your daily behavior begins to match it.</p>
            </div>
          </div>

          <div className={styles.scrollRevealMainContent}>
            <div className={styles.threeColumnGrid} style={{ marginBottom: 0 }}>
              <div className={`${styles.gridColumn} ${!isInitialized ? styles.gridColumnInitial : ''}`} style={{ opacity: visibleColumns >= 1 ? 1 : 0, transform: visibleColumns >= 1 ? 'translateX(0)' : 'translateX(100px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease' }}>
                <div className={styles.columnTitle}>
                  <h3 style={{ fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', fontSize: '14px', color: '#00e87b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', margin: 0, textAlign: 'center' }}>EVERYDAY MODE — Align Behavior With Intent</h3>
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '14px', fontWeight: '500', letterSpacing: '1px', color: '#888888', textAlign: 'center' }}>Your future self is built one day at a time.</p>
                </div>
                <div className={styles.imageContent}>
                  <img src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+1.svg" width={200} height={200} alt="Everyday Mode" className={styles.heroImageContent} style={{ width: '200px', height: '200px' }} />
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '12px', fontWeight: '400', letterSpacing: '0.5px', color: '#666666', textAlign: 'center', fontStyle: 'italic' }}>Everyday Mode shows whether your actions match the life you claim to want.</p>
                </div>
              </div>

              <div className={`${styles.gridColumn} ${!isInitialized && isScrollEnabled ? styles.gridColumnInitial : ''}`} style={{ opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'translateX(0)' : 'translateX(100px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s' }}>
                <div className={styles.columnTitle}>
                  <h3 style={{ fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', fontSize: '14px', color: '#00e87b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', margin: 0, textAlign: 'center' }}>GHOST MODE — Track Your Coherence</h3>
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '14px', fontWeight: '500', letterSpacing: '1px', color: '#888888', textAlign: 'center' }}>What you do consistently is who you are.</p>
                </div>
                <div className={styles.imageContent}>
                  <img src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+2.svg" width={200} height={200} alt="Ghost Mode" className={styles.heroImageContent} style={{ width: '200px', height: '200px' }} />
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '12px', fontWeight: '400', letterSpacing: '0.5px', color: '#666666', textAlign: 'center', fontStyle: 'italic' }}>Ghost Mode records the discipline receipts you can't fake.</p>
                </div>
              </div>

              <div className={`${styles.gridColumn} ${!isInitialized && isScrollEnabled ? styles.gridColumnInitial : ''}`} style={{ opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'translateX(0)' : 'translateX(100px)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s' }}>
                <div className={styles.columnTitle}>
                  <h3 style={{ fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', fontSize: '14px', color: '#00e87b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', margin: 0, textAlign: 'center' }}>UNDERGROUND MODE — See Your Internal Metrics</h3>
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '14px', fontWeight: '500', letterSpacing: '1px', color: '#888888', textAlign: 'center' }}>Your patterns are data — and data tells the truth.</p>
                </div>
                <div className={styles.imageContent}>
                  <img src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+3.svg" width={200} height={200} alt="Underground Mode" className={styles.heroImageContent} style={{ width: '200px', height: '200px' }} />
                </div>
                <div className={styles.textContent}>
                  <p className={styles.heroParagraph} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '12px', fontWeight: '400', letterSpacing: '0.5px', color: '#666666', textAlign: 'center', fontStyle: 'italic' }}>Underground Mode exposes the behaviors, loops, and micro-decisions shaping your identity.</p>
                </div>
              </div>
            </div>

            <div className={styles.columnProgressIndicator}>
              <div className={styles.progressLine}>
                <div className={styles.progressSegment} style={{ opacity: visibleColumns >= 1 ? 1 : 0, transform: visibleColumns >= 1 ? 'scale(1)' : 'scale(0)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease' }}>
                  <div className={`${styles.progressNumber} ${visibleColumns >= 1 ? styles.progressActive : ''}`} style={{ transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease' }}></div>
                </div>
                <div className={`${styles.progressConnector} ${visibleColumns >= 2 ? styles.progressActive : ''}`} style={{ opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s' }}></div>
                <div className={styles.progressSegment} style={{ opacity: visibleColumns >= 2 ? 1 : 0, transform: visibleColumns >= 2 ? 'scale(1)' : 'scale(0)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s' }}>
                  <div className={`${styles.progressNumber} ${visibleColumns >= 2 ? styles.progressActive : ''}`} style={{ transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s' }}></div>
                </div>
                <div className={`${styles.progressConnector} ${visibleColumns >= 3 ? styles.progressActive : ''}`} style={{ opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s' }}></div>
                <div className={styles.progressSegment} style={{ opacity: visibleColumns >= 3 ? 1 : 0, transform: visibleColumns >= 3 ? 'scale(1)' : 'scale(0)', transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s' }}>
                  <div className={`${styles.progressNumber} ${visibleColumns >= 3 ? styles.progressActive : ''}`} style={{ transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
