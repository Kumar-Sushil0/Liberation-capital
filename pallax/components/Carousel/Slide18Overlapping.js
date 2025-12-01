"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../../Pallax.module.css';

export const Slide18OverlappingCarousel = ({ onAllCardsVisible, onNextSection, onPrevSection, currentSection, isScrollEnabled = true }) => {
  console.log('Slide18OverlappingCarousel rendered with:', { currentSection, isScrollEnabled });

  const containerRef = useRef(null);
  const cardsStackRef = useRef(null);
  const boxRefs = useRef([]);
  const [activeCard, setActiveCard] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const [boxPositions, setBoxPositions] = useState([]);
  const autoStageTimerRef = useRef(null);

  const slide18CardsData = [
    {
      id: 0,
      title: "Ava Li",
      description: "\"Mirror Mode destroyed every illusion I had about 'user experience.' Turns out, the real UX is life itself and LIFEiDESIGN is the interface.\"",
      designation: "Product Designer, Singapore",
      color: "#ff6b6b"
    },
    {
      id: 1,
      title: "Rafael Costa",
      description: "\"I thought I knew storytelling until Hero Mode. LIFEiDESIGN doesn't help you 'find your voice',it makes your voice find you.\"",
      designation: "Brand Director, São Paulo",
      color: "#4ecdc4"
    },
    {
      id: 2,
      title: "Leena Patel",
      description: "\"NPC Mode flipped my idea of wealth on its head. I realized I didn't want more money, I wanted more meaning. I'd invest in this before any startup.\"",
      designation: "Entrepreneur & Angel Investor, London",
      color: "#45b7d1"
    },
    {
      id: 3,
      title: "Noah Rivers",
      description: "\"Monk Mode was my ego's dojo. I've done ayahuasca, silent retreats, and endless meditation, none of them showed me my patterns this precisely. This is gamified shadow work.\"",
      designation: "Spiritual Coach, Sedona",
      color: "#f7b731"
    },
    {
      id: 4,
      title: "Dmitri Volkov",
      description: "\"The architecture is wild, like if Notion, Jung, and The Matrix had a child. Every decision changes your interface with reality. I didn't just play the game, the game played me back.\"",
      designation: "Product Manager, Berlin",
      color: "#5f27cd"
    },
    {
      id: 5,
      title: "Nia Calderón",
      description: "\"StoryiDesign taught me that fiction is the future. It's not about escaping reality, it's about designing it. I met my new self in Human Mode… and she's brilliant.\"",
      designation: "Actor & Writer, Los Angeles",
      color: "#00d2d3"
    },
    {
      id: 6,
      title: "Arjun Mehta",
      description: "\"LIFEiDESIGN is the MBA of consciousness. Strategy, story, psychology, all merged into a living system. It made my five-year plan feel one-dimensional.\"",
      designation: "Business Leader, Mumbai",
      color: "#ff9ff3"
    },
    {
      id: 7,
      title: "Dr. Helena Strauss",
      description: "\"For the first time, philosophy feels playable. God Mode is not a metaphor, it's a mirror. I no longer 'think about' purpose. I live it.\"",
      designation: "Philosopher & Scholar, Vienna",
      color: "#54a0ff"
    },
    {
      id: 8,
      title: "Elon Kai",
      description: "\"This isn't self-help, it's self-simulation. LIFEiDESIGN gives civilization what religion tried to: a framework for becoming. You have to play it to believe it, and once you do, there's no going back.\"",
      designation: "Futurist & Policy Advisor, Tokyo",
      color: "#5f27cd"
    }
  ];

  // Animate cards to show 3 columns with stacking effect - each column reveals cards independently
  const animateToStep = useCallback((step) => {
    setActiveCard(step);

    const stackEl = cardsStackRef.current;
    if (stackEl) {
      stackEl.style.opacity = step >= 1 ? '1' : '0';
      stackEl.style.pointerEvents = step >= 1 ? 'auto' : 'none';
      stackEl.style.transition = 'opacity 300ms ease';
    }

    const column1Cards = stackEl?.querySelectorAll(`.${styles.slide18Column1} .${styles.slide18CardWrapper}`);
    const column2Cards = stackEl?.querySelectorAll(`.${styles.slide18Column2} .${styles.slide18CardWrapper}`);
    const column3Cards = stackEl?.querySelectorAll(`.${styles.slide18Column3} .${styles.slide18CardWrapper}`);

    if (!column1Cards || !column2Cards || !column3Cards) return;

    const effectiveStep = step >= 1 ? Math.min(step - 1, 2) : -1;

    [column1Cards, column2Cards, column3Cards].forEach((columnCards) => {
      columnCards.forEach((wrapper, cardIndex) => {
        const card = wrapper.querySelector(`.${styles.slide18OverlappingCard}`);
        if (!card) return;

        if (effectiveStep >= 0 && cardIndex <= effectiveStep) {
          const stackOffset = cardIndex * 45;
          const baseOffset = -100;
          wrapper.style.transform = `translateY(${baseOffset + stackOffset}px)`;
          card.style.opacity = '1';
          card.style.zIndex = (3 - cardIndex);
          if (cardIndex === effectiveStep) {
            card.style.transform = 'none';
            card.classList.add(styles.slide18CardActive);
          } else {
            card.style.transform = 'none';
            card.classList.remove(styles.slide18CardActive);
          }
        } else {
          wrapper.style.transform = `translateY(${window.innerHeight}px)`;
          card.style.opacity = '0';
          card.style.zIndex = (3 - cardIndex);
          card.style.transform = 'none';
          card.classList.remove(styles.slide18CardActive);
        }
      });
    });

    if (autoStageTimerRef.current) {
      clearTimeout(autoStageTimerRef.current);
      autoStageTimerRef.current = null;
    }
  }, []);

  // Calculate box positions from actual DOM - using array indexing like other slides
  useEffect(() => {
    if (!cardsStackRef.current || !isInitialized || activeCard < 1) return;
    const timer = setTimeout(() => {
      if (!cardsStackRef.current || boxRefs.current.length === 0) return;
      const stackRect = cardsStackRef.current.getBoundingClientRect();
      const positions = [];
      slide18CardsData.forEach((card, index) => {
        const boxRef = boxRefs.current[card.id];
        if (!boxRef) {
          positions[index] = null;
          return;
        }
        const boxRect = boxRef.getBoundingClientRect();
        positions[index] = {
          top: boxRect.top - stackRect.top + (boxRect.height / 2),
          left: boxRect.left - stackRect.left + (boxRect.width / 2)
        };
      });
      setBoxPositions(positions);
    }, 150);
    return () => clearTimeout(timer);
  }, [isInitialized, activeCard]);

  // Initialize component
  useEffect(() => {
    setIsInitialized(true);
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      animateToStep(0); // Start with first step (no cards visible)
    }, 100);

    return () => clearTimeout(timer);
  }, [animateToStep]);

  // Reset when entering slide 18 (currentSection === 3)
  useEffect(() => {
    if (!isInitialized) return;

    if (currentSection === 3 && isScrollEnabled) {
      animateToStep(0);
    }
  }, [currentSection, isScrollEnabled, isInitialized, animateToStep]);

  // Handle subscroll functionality
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If scroll effect is disabled, don't add wheel listeners
    if (!isScrollEnabled) {
      return;
    }

    let wheelDelta = 0;
    let wheelTimer = null;

    const handleWheel = (e) => {
      if (isScrollingRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      wheelDelta += e.deltaY;

      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 60) {
          if (wheelDelta > 0 && activeCard < 3) {
            animateToStep(activeCard + 1);
          } else if (wheelDelta < 0 && activeCard > 0) {
            animateToStep(activeCard - 1);
          } else if (wheelDelta < 0 && activeCard === 0) {
            setTimeout(() => {
              if (window.gotoPrevSlide) {
                window.gotoPrevSlide();
              }
            }, 100);
          } else if (wheelDelta > 0 && activeCard === 3) {
            if (onAllCardsVisible) {
              onAllCardsVisible();
            }
            setTimeout(() => {
              if (window.gotoNextSlide) {
                window.gotoNextSlide();
              }
            }, 100);
          }
        }
        wheelDelta = 0;
      }, 80);
    };

    // Add event listener with capture to ensure it gets the event first
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
      clearTimeout(wheelTimer);
    };
  }, [isScrollEnabled, onAllCardsVisible, isInitialized, activeCard, animateToStep]);

  return (
    <div className={styles.scrollRevealMasterContainer}>
      <div className={styles.greyLineContainer} style={{ zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className={styles.mobileLine} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '1px', textAlign: 'center', margin: 0, maxWidth: '800px', padding: '0 1rem', lineHeight: 1.6, textTransform: 'none', color: '#888888', opacity: 1 }}>
            When seasoned eyes name what&apos;s true, the world remaps itself.
          </div>
          <div className={styles.mobileLine} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '1px', textAlign: 'center', margin: 0, maxWidth: '800px', padding: '0 1rem', lineHeight: 1.6, textTransform: 'none', color: '#888888', opacity: 1 }}>
            Listen close, their words aren&apos;t praise, but proof the game is real.
          </div>
          <div className={styles.mobileLine} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '1px', textAlign: 'center', margin: 0, maxWidth: '800px', padding: '0 1rem', lineHeight: 1.6, textTransform: 'none', color: '#888888', opacity: 1 }}>
            Their stamp is not advice, it&apos;s the cue that your old world is shifting.
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className={styles.scrollRevealMainContent}>
        <div className={styles.slide18OverlappingCardsContainer} ref={containerRef}>
          <div className={styles.slide18CardsStack} ref={cardsStackRef} style={{ position: 'relative', opacity: 0, pointerEvents: 'none' }}>
        {/* Connecting lines for each column - positioned independently */}
        {[0, 1, 2].map(columnIndex => {
          const columnStartIndex = columnIndex * 3;
          const firstBoxInColumn = boxPositions[columnStartIndex];
          
          return (
            <div
              key={`column-lines-${columnIndex}`}
              style={{
                position: 'absolute',
                left: firstBoxInColumn ? `${firstBoxInColumn.left}px` : 'calc(2rem + 10px)',
                top: '0',
                width: '2px',
                zIndex: 1000,
                pointerEvents: 'none',
                overflow: 'visible'
              }}
            >
              {/* Create 2 lines per column */}
              {[0, 1].map(lineIndex => {
                const currentIndex = columnStartIndex + lineIndex;
                const nextIndex = currentIndex + 1;
                
                // Use measured positions or fallback
                const currentBoxTop = boxPositions[currentIndex] !== undefined && boxPositions[currentIndex] !== null
                  ? boxPositions[currentIndex].top 
                  : (lineIndex * 45) + 24 + 10; // Fallback: 45px overlap for Slide 18
                
                const nextBoxTop = boxPositions[nextIndex] !== undefined && boxPositions[nextIndex] !== null
                  ? boxPositions[nextIndex].top
                  : ((lineIndex + 1) * 45) + 24 + 10; // Fallback calculation
                
                // Line starts from bottom edge of current box and ends at top edge of next box
                const boxSize = 20; // Box is 20px x 20px
                const lineStartY = currentBoxTop + (boxSize / 2); // Bottom edge of current box
                const lineEndY = nextBoxTop - (boxSize / 2); // Top edge of next box
                const lineHeight = lineEndY - lineStartY;
                const effectiveStepLocal = activeCard >= 1 ? Math.min(activeCard - 1, 2) : -1;
                const cardsVisibleCount = effectiveStepLocal >= 0 ? effectiveStepLocal + 1 : 0;
                const isVisible = cardsVisibleCount >= (lineIndex + 2);
                const delay = isVisible ? lineIndex * 120 : 0;
                
                // Only render if we have valid positions and reasonable height
                if (!isFinite(lineHeight) || lineHeight <= 0 || lineHeight < 30 || lineHeight > 65) {
                  // If measured positions seem wrong, use calculated fallback
                  const fallbackHeight = 45; // Exact overlap distance for Slide 18
                  return (
                    <div
                      key={`connector-${currentIndex}`}
                      style={{
                        position: 'absolute',
                        top: `${lineStartY}px`,
                        left: '0',
                        width: '2px',
                        height: `${fallbackHeight - 20}px`, // Reduced by box size
                        background: 'linear-gradient(to bottom, rgba(0, 232, 123, 0.8), rgba(0, 232, 123, 0.5), rgba(0, 232, 123, 0.3))',
                        transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                        transition: `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
                        boxShadow: isVisible ? '0 0 8px rgba(0, 232, 123, 0.4)' : 'none',
                        opacity: isVisible ? 1 : 0
                      }}
                    />
                  );
                }
                
                return (
                  <div
                    key={`connector-${currentIndex}`}
                    style={{
                      position: 'absolute',
                      top: `${lineStartY}px`, // Start from bottom edge of current box
                      left: '0',
                      width: '2px',
                      height: `${lineHeight}px`, // Height: distance from bottom of current box to top of next box
                      background: 'linear-gradient(to bottom, rgba(0, 232, 123, 0.8), rgba(0, 232, 123, 0.5), rgba(0, 232, 123, 0.3))',
                      transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'top',
                      transition: `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
                      boxShadow: isVisible ? '0 0 8px rgba(0, 232, 123, 0.4)' : 'none',
                      opacity: isVisible ? 1 : 0
                    }}
                  />
                );
              })}
            </div>
          );
        })}
        
        {/* Column 1 */}
        <div className={`${styles.slide18Column} ${styles.slide18Column1}`}>
          {slide18CardsData.slice(0, 3).map((card, index) => (
            <div
              key={card.id}
              className={styles.slide18CardWrapper}
              style={{
                zIndex: index + 1
              }}
            >
              <div
                className={`${styles.slide18OverlappingCard}`}
                style={{
                  '--card-color': card.color,
                  background: '#000000'
                }}
              >
                <div className={styles.slide12CardContent} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'fit-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', justifyContent: 'flex-start' }}>
                      <div
                        ref={el => boxRefs.current[card.id] = el}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: '#000000',
                          border: '1px solid #00e87b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: '"satoshi", sans-serif',
                          fontSize: '10px',
                          fontWeight: '600',
                          color: '#00e87b',
                          transition: 'all 0.6s ease',
                          flexShrink: 0,
                          position: 'relative',
                          zIndex: 1001
                        }}
                      >
                      </div>
                      <h3 className={styles.slide12CardTitle} style={{ margin: 0, textAlign: 'left' }}>
                        <span style={{
                          fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                          fontSize: '14px',
                          color: '#00e87b',
                          fontWeight: 'normal',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {card.title}
                        </span>
                      </h3>
                    </div>
                    <div className={styles.slide12CardTitleDivider} style={{ alignSelf: 'flex-start', width: '100%' }}></div>
                  </div>
                  <p className={styles.slide12CardDescription} style={{ textAlign: 'left' }}>
                    {card.description}
                    <br />
                    <strong style={{ fontWeight: 'bold', color: '#fff', display: 'block', marginTop: '1rem' }}>{card.designation}</strong>
                  </p>
                  <div className={styles.slide12CardNumber} style={{ textAlign: 'left', alignSelf: 'flex-start' }}>{String(index + 1).padStart(2, '0')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2 */}
        <div className={`${styles.slide18Column} ${styles.slide18Column2}`}>
          {slide18CardsData.slice(3, 6).map((card, index) => (
            <div
              key={card.id}
              className={styles.slide18CardWrapper}
              style={{
                zIndex: index + 1
              }}
            >
              <div
                className={`${styles.slide18OverlappingCard}`}
                style={{
                  '--card-color': card.color,
                  background: '#000000'
                }}
              >
                <div className={styles.slide12CardContent} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'fit-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', justifyContent: 'flex-start' }}>
                      <div
                        ref={el => boxRefs.current[card.id] = el}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: '#000000',
                          border: '1px solid #00e87b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: '"satoshi", sans-serif',
                          fontSize: '10px',
                          fontWeight: '600',
                          color: '#00e87b',
                          transition: 'all 0.6s ease',
                          flexShrink: 0,
                          position: 'relative',
                          zIndex: 1001
                        }}
                      >
                      </div>
                      <h3 className={styles.slide12CardTitle} style={{ margin: 0, textAlign: 'left' }}>
                        <span style={{
                          fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                          fontSize: '14px',
                          color: '#00e87b',
                          fontWeight: 'normal',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {card.title}
                        </span>
                      </h3>
                    </div>
                    <div className={styles.slide12CardTitleDivider} style={{ alignSelf: 'flex-start', width: '100%' }}></div>
                  </div>
                  <p className={styles.slide12CardDescription} style={{ textAlign: 'left' }}>
                    {card.description}
                    <br />
                    <strong style={{ fontWeight: 'bold', color: '#fff', display: 'block', marginTop: '1rem' }}>{card.designation}</strong>
                  </p>
                  <div className={styles.slide12CardNumber} style={{ textAlign: 'left', alignSelf: 'flex-start' }}>{String(index + 4).padStart(2, '0')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3 */}
        <div className={`${styles.slide18Column} ${styles.slide18Column3}`}>
          {slide18CardsData.slice(6, 9).map((card, index) => (
            <div
              key={card.id}
              className={styles.slide18CardWrapper}
              style={{
                zIndex: index + 1
              }}
            >
              <div
                className={`${styles.slide18OverlappingCard}`}
                style={{
                  '--card-color': card.color,
                  background: '#000000'
                }}
              >
                <div className={styles.slide12CardContent} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'fit-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', justifyContent: 'flex-start' }}>
                      <div
                        ref={el => boxRefs.current[card.id] = el}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: '#000000',
                          border: '1px solid #00e87b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: '"satoshi", sans-serif',
                          fontSize: '10px',
                          fontWeight: '600',
                          color: '#00e87b',
                          transition: 'all 0.6s ease',
                          flexShrink: 0,
                          position: 'relative',
                          zIndex: 1001
                        }}
                      >
                      </div>
                      <h3 className={styles.slide12CardTitle} style={{ margin: 0, textAlign: 'left' }}>
                        <span style={{
                          fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                          fontSize: '14px',
                          color: '#00e87b',
                          fontWeight: 'normal',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {card.title}
                        </span>
                      </h3>
                    </div>
                    <div className={styles.slide12CardTitleDivider} style={{ alignSelf: 'flex-start', width: '100%' }}></div>
                  </div>
                  <p className={styles.slide12CardDescription} style={{ textAlign: 'left' }}>
                    {card.description}
                    <br />
                    <strong style={{ fontWeight: 'bold', color: '#fff', display: 'block', marginTop: '1rem' }}>{card.designation}</strong>
                  </p>
                  <div className={styles.slide12CardNumber} style={{ textAlign: 'left', alignSelf: 'flex-start' }}>{String(index + 7).padStart(2, '0')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
          </div>

          {/* Progress indicator */}
          <div className={styles.slide18ProgressIndicator } style={{ display: 'none' }}>
            <div className={styles.slide18ProgressBar}>
              <div className={styles.slide18ProgressFill} style={{ width: `${(Math.min(activeCard, 3) / 3) * 100}%` }} />
            </div>
            <span className={styles.slide18ProgressText}>Step {Math.min(activeCard + 1, 4)} / 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

