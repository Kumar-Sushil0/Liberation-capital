"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/slides.module.css';

interface Slide12Props {
  currentSection?: number;
  isScrollEnabled?: boolean;
  onAllColumnsVisible?: () => void;
}

export const Slide12 = ({ 
  currentSection = 0, 
  isScrollEnabled = true,
  onAllColumnsVisible 
}: Slide12Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 4);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);

  // Initialize component
  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 0 : 4);

    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isScrollEnabled]);

  // Reset when isScrollEnabled changes
  useEffect(() => {
    if (!isInitialized) return;
    
    if (currentSection !== 7) return;

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

    if (currentSection === 7 && prevSection !== 7 && isScrollEnabled) {
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
        maxScroll * 0.25,
        maxScroll * 0.5,
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
                Liberation Day: Ceremony over pitch.
              </p>
              <p className={styles.greyLineText}>
                Where humans meet capital with dignity.
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
                    What You Bring
                  </span>
                </h3>
                <p
                  className={styles.heroParagraph}
                  style={{
                    opacity: visibleColumns >= 1 ? 1 : 0,
                    transform: visibleColumns >= 1 ? 'translateY(0)' : 'translateY(30px)',
                    transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s',
                    textAlign: 'center',
                    fontSize: '12px',
                    marginBottom: '0.5rem'
                  }}
                >
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Your receipts, blueprint,</span>
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>and liberation number.</span>
                </p>

                <div className={styles.powersGrid2x2}>
                  <div className={styles.cardWrapper}>
                    <div
                      className={styles.hoverCard}
                      style={{
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                      }}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                          <img 
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/reject1.svg" 
                            alt="No Sharks" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Logs, consistency, emotional architecture, upgrades.</p>
                        </div>
                      </div>
                    </div>
                    <h4
                      className={styles.cardTitleBelow}
                      style={{
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                      }}
                    >Discipline Receipts</h4>
                  </div>
                  <div className={styles.cardWrapper}>
                    <div
                      className={styles.hoverCard}
                      style={{
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                      }}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                          <img 
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/reject2.svg" 
                            alt="No Theatrics" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Game architecture, not aspiration.</p>
                        </div>
                      </div>
                    </div>
                    <h4
                      className={styles.cardTitleBelow}
                      style={{
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                      }}
                    >Life Blueprint</h4>
                  </div>
                  <div className={styles.cardWrapper}>
                    <div
                      className={styles.hoverCard}
                      style={{
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                          <img 
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/reject3.svg" 
                            alt="No TAM" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Exact capital requirement. Existential budgeting.</p>
                        </div>
                      </div>
                    </div>
                    <h4
                      className={styles.cardTitleBelow}
                      style={{
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}
                    >Liberation Number</h4>
                  </div>
                  <div className={styles.cardWrapper}>
                    <div
                      className={styles.hoverCard}
                      style={{
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                      }}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                          <img 
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/reject4.svg" 
                            alt="No Extraction" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Identity is the product. Coherence is collateral.</p>
                        </div>
                      </div>
                    </div>
                    <h4
                      className={styles.cardTitleBelow}
                      style={{
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                      }}
                    >Coherence Collateral</h4>
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
                    What We Provide
                  </span>
                </h3>
                <p
                  className={styles.heroParagraph}
                  style={{
                    opacity: visibleColumns >= 1 ? 1 : 0,
                    transform: visibleColumns >= 1 ? 'translateY(0)' : 'translateY(30px)',
                    transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s',
                    textAlign: 'center',
                    fontSize: '12px',
                    marginBottom: '0.5rem'
                  }}
                >
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Funding, structure, space,</span>
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>and controlled conditions.</span>
                </p>

                <div className={styles.forcesGrid2x2}>
                  <div className={styles.cardWrapper}>
                    <div
                      className={styles.hoverCard}
                      style={{
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                      }}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                          <img 
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/honor1.svg" 
                            alt="Human" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>We fund becoming, not scale.</p>
                        </div>
                      </div>
                    </div>
                    <h4
                      className={styles.cardTitleBelow}
                      style={{
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease'
                      }}
                    >Funding as Scaffolding</h4>
                  </div>
                  <div className={styles.cardWrapper}>
                    <div
                      className={styles.hoverCard}
                      style={{
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                      }}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                          <img 
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/honor2.svg" 
                            alt="Blueprint" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Space, tools, mentors, structure—not just cash.</p>
                        </div>
                      </div>
                    </div>
                    <h4
                      className={styles.cardTitleBelow}
                      style={{
                        opacity: visibleColumns >= 2 ? 1 : 0,
                        transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.05s'
                      }}
                    >Funding-In-Kind</h4>
                  </div>
                  <div className={styles.cardWrapper}>
                    <div
                      className={styles.hoverCard}
                      style={{
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                          <img 
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/honor3.svg" 
                            alt="Future Self" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Sealed environment for controlled identity hatching.</p>
                        </div>
                      </div>
                    </div>
                    <h4
                      className={styles.cardTitleBelow}
                      style={{
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.1s'
                      }}
                    >EPiCENTRE Residency</h4>
                  </div>
                  <div className={styles.cardWrapper}>
                    <div
                      className={styles.hoverCard}
                      style={{
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                      }}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardEmoji} style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', transform: 'none', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)' }}>
                          <img 
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/honor4.svg" 
                            alt="Dignity" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Where your future self becomes your actual self.</p>
                        </div>
                      </div>
                    </div>
                    <h4
                      className={styles.cardTitleBelow}
                      style={{
                        opacity: visibleColumns >= 3 ? 1 : 0,
                        transform: visibleColumns >= 3 ? 'translateY(0)' : 'translateY(30px)',
                        transition: skipTransitions || !isInitialized ? 'none' : 'all 0.4s ease 0.15s'
                      }}
                    >Identity Incubation</h4>
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
