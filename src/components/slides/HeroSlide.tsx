"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from '../../styles/slides.module.css';
import SimpleFlippingWords from '../Flipping_words/Flipping_words/SimpleFlippingWords';

interface HeroSlideProps {
  currentSection?: number;
  isScrollEnabled?: boolean;
  onAllColumnsVisible?: () => void;
}

export const HeroSlide = ({
  currentSection = 0,
  isScrollEnabled = true,
  onAllColumnsVisible,
}: HeroSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleStep, setVisibleStep] = useState(isScrollEnabled ? 0 : 4);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const [triggeredSteps, setTriggeredSteps] = useState(new Set<number>());

  // Initialize component
  useEffect(() => {
    setSkipTransitions(true);
    setVisibleStep(isScrollEnabled ? 0 : 4);

    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Reset when isScrollEnabled changes
  useEffect(() => {
    if (!isInitialized) return;
    if (currentSection !== 0) return;

    setSkipTransitions(true);

    if (!isScrollEnabled) {
      setVisibleStep(4);
      if (onAllColumnsVisible) {
        onAllColumnsVisible();
      }
    } else {
      setVisibleStep(0);
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

    if (currentSection === 0 && prevSection !== 0 && isScrollEnabled) {
      setSkipTransitions(true);
      setVisibleStep(0);
      setTriggeredSteps(new Set());

      const container = containerRef.current;
      if (container) {
        container.scrollTop = 0;
      }

      setTimeout(() => {
        setSkipTransitions(false);
      }, 100);
    }
  }, [currentSection, isScrollEnabled, isInitialized]);

  // Track previous step to detect actual changes
  const prevStepRef = useRef(0);
  
  // Trigger animations only when step actually changes (not on init)
  useEffect(() => {
    if (!isInitialized) return;
    
    const prevStep = prevStepRef.current;
    
    // Only trigger if step actually increased
    if (visibleStep > prevStep) {
      // Trigger animation immediately for the new step
      setTriggeredSteps(prev => new Set(prev).add(visibleStep));
    }
    
    prevStepRef.current = visibleStep;
  }, [visibleStep, isInitialized]);

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

      const scrollPositions = [0, maxScroll * 0.15, maxScroll * 0.35, maxScroll * 0.55, maxScroll * 0.75, maxScroll];

      const targetScroll = scrollPositions[step] || 0;

      if (skipAnimation || step === 0) {
        setSkipTransitions(true);
        container.scrollTop = targetScroll;
        setVisibleStep(step);
        currentStep = step;
        isScrollingRef.current = false;

        setTimeout(() => {
          isProcessingScroll = false;
        }, 100);

        setTimeout(() => {
          setSkipTransitions(false);
        }, 50);

        if (step === 4 && onAllColumnsVisible) {
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

        const easeProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        container.scrollTop = startScroll + distance * easeProgress;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          isScrollingRef.current = false;
          setVisibleStep(step);
          currentStep = step;

          setTimeout(() => {
            isProcessingScroll = false;
          }, 100);

          if (step === 4 && onAllColumnsVisible) {
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
            const nextStep = Math.min(currentStep + 1, 4);
            smoothScrollToStep(nextStep);
          } else {
            if (currentStep === 0) {
              if (
                typeof window !== "undefined" &&
                (window as any).gotoPrevSlide
              ) {
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

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [isInitialized, isScrollEnabled, onAllColumnsVisible]);

  return (
    <div
      ref={containerRef}
      className={styles.scrollRevealContainer}
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div style={{ height: "200vh", position: "relative" }}>
        <div
          className={styles.scrollRevealMasterContainer}
          style={{
            position: "sticky",
            top: 0,
          }}
        >
          <div className={styles.slideContent}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              maxWidth: '1200px',
              width: '100%',
              padding: '0 3rem',
              textAlign: 'center'
            }}>
              {/* Step 1: Main headline with flipping animation */}
              <div style={{
                marginBottom: '1rem',
                opacity: visibleStep >= 1 ? 1 : 0,
                transform: visibleStep >= 1 ? 'translateY(0)' : 'translateY(30px)',
                transition: skipTransitions || !isInitialized ? 'none' : 'all 0.6s ease'
              }}>
                <SimpleFlippingWords
                  currentWord="WANT A NEW LIFE?"
                  fontSize="clamp(2rem, 4vw, 3.5rem)"
                  animationTrigger={triggeredSteps.has(1) ? 1 : 0}
                  backgroundColor="#000000"
                  textColor="#ffffff"
                  mute={false}
                  eyePosition="up"
                />
              </div>

              {/* Step 2: 3-column grid for Design/Play/Pitch with flipping animations */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                width: '100%',
                maxWidth: '900px',
                marginBottom: '1rem',
                opacity: visibleStep >= 2 ? 1 : 0,
                transform: visibleStep >= 2 ? 'translateY(0)' : 'translateY(30px)',
                transition: skipTransitions || !isInitialized ? 'none' : 'all 0.6s ease 0.1s'
              }}>
                <div>
                  <SimpleFlippingWords
                    currentWord="DESIGN IT"
                    fontSize="clamp(2rem, 4vw, 3.5rem)"
                    animationTrigger={triggeredSteps.has(2) ? 1 : 0}
                    backgroundColor="#000000"
                    textColor="#ffffff"
                    mute={false}
                    eyePosition="up"
                  />
                </div>
                <div>
                  <SimpleFlippingWords
                    currentWord="PLAY IT"
                    fontSize="clamp(2rem, 4vw, 3.5rem)"
                    animationTrigger={triggeredSteps.has(2) ? 1 : 0}
                    backgroundColor="#000000"
                    textColor="#ffffff"
                    mute={false}
                    eyePosition="up"
                  />
                </div>
                <div>
                  <SimpleFlippingWords
                    currentWord="PITCH IT"
                    fontSize="clamp(2rem, 4vw, 3.5rem)"
                    animationTrigger={triggeredSteps.has(2) ? 1 : 0}
                    backgroundColor="#000000"
                    textColor="#ffffff"
                    mute={false}
                    eyePosition="up"
                  />
                </div>
              </div>

              {/* Step 3: Get funded with flipping animation */}
              <div style={{
                marginBottom: '2rem',
                opacity: visibleStep >= 3 ? 1 : 0,
                transform: visibleStep >= 3 ? 'translateY(0)' : 'translateY(30px)',
                transition: skipTransitions || !isInitialized ? 'none' : 'all 0.6s ease 0.2s'
              }}>
                <SimpleFlippingWords
                  currentWord="GET FUNDED FOR IT"
                  fontSize="clamp(2rem, 4vw, 3.5rem)"
                  animationTrigger={triggeredSteps.has(3) ? 1 : 0}
                  backgroundColor="#000000"
                  textColor="#ffffff"
                  mute={false}
                  eyePosition="up"
                />
              </div>

              {/* Always visible: Tagline */}
              <p style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                margin: 0,
                lineHeight: 1.5,
                color: '#00e87b',
                fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                fontWeight: '500',
                textTransform:"uppercase",
                marginBottom: '1rem'
              }}>
                <span style={{color: '#ffffff'}}> We don't fund startups.</span> We fund humans redesigning themselves.
              </p>

              {/* Step 4: Funding details */}
              <div style={{ 
                opacity: visibleStep >= 4 ? 1 : 0,
                transform: visibleStep >= 4 ? 'translateY(0)' : 'translateY(30px)',
                transition: skipTransitions || !isInitialized ? 'none' : 'all 0.6s ease 0.3s'
              }}>
                <p style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                  margin: 0,
                  lineHeight: 1.5,
                  color: '#b8b8b8'
                }}>
                  Up to <span style={{ color: '#00e87b', fontWeight: '600' }}>$100,000</span> to redesign your identity and pitch your <span style={{ fontStyle: 'italic', color: '#ffffff' }}>future self</span> — not another idea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
