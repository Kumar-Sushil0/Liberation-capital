"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/slides.module.css';

export const Slide03 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleColumns, setVisibleColumns] = useState(0);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);

  // Initialize component
  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(0);

    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInitialized) return;

    let wheelDelta = 0;
    let wheelTimer: NodeJS.Timeout | null = null;
    let currentStep = 0;

    const smoothScrollToStep = (step: number) => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

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
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      wheelDelta += e.deltaY;

      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }

      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 40) {
          if (wheelDelta > 0) {
            const nextStep = Math.min(currentStep + 1, 4);
            smoothScrollToStep(nextStep);
          } else {
            const prevStep = Math.max(currentStep - 1, 0);
            smoothScrollToStep(prevStep);
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
  }, [isInitialized]);

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
                Two tribes. Same ecosystem. Different missions.
              </p>
              <p className={styles.greyLineText}>
                Same game: human evolution.
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
                    Investors
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
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Wealthy, restless, allergic to hype,</span>
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>craving meaning.</span>
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
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/investor1.svg" 
                            alt="Capital" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Capital seeking purpose.</p>
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
                    >Capital Abundance</h4>
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
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/investor2.svg" 
                            alt="Meaning" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Beyond returns.</p>
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
                    >Meaning Hunger</h4>
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
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/investor3.svg" 
                            alt="Restless" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Tired of empty wins.</p>
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
                    >Restless Energy</h4>
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
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/investor4.svg" 
                            alt="Hype" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Allergic to fake.</p>
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
                    >Anti-Hype</h4>
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
                    Players
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
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Disciplined, devoted,</span>
                  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>oxygen-starved for capital.</span>
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
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/player1.svg" 
                            alt="Discipline" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Relentless execution.</p>
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
                    >Pure Discipline</h4>
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
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/player2.svg" 
                            alt="Devotion" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>All in, always.</p>
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
                    >Total Devotion</h4>
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
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/player3.svg" 
                            alt="Capital Need" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Starving for fuel.</p>
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
                    >Capital Scarcity</h4>
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
                            src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/player4.svg" 
                            alt="Oxygen" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.cardHoverContent}>
                          <p className={styles.cardDescription}>Need air to breathe.</p>
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
                    >Oxygen-Starved</h4>
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
