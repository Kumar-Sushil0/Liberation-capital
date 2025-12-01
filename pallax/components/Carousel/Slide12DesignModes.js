"use client";
import React, { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import styles from '../../Pallax.module.css';

export const Slide12DesignModesCarousel = forwardRef(({ onAllCardsVisible, onNextSection, onPrevSection, onGroupChange, onCardChange, currentSection, isScrollEnabled = true }, ref) => {
  const containerRef = useRef(null);
  const cardsStackRef = useRef(null);
  const boxRefs = useRef([]);
  const [activeCard, setActiveCard] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const [boxPositions, setBoxPositions] = useState([]);

  const slide12CardsData = [
    {
      id: 0,
      title: "Pre-Game",
      description: "You map your life from start to end,<br />to see what broke — and what will bend.",
      color: "#ff6b6b"
    },
    {
      id: 1,
      title: "End-Game",
      description: "You lose, you learn, you burn, you mend,<br />your loss becomes your spark again.",
      color: "#4ecdc4"
    },
    {
      id: 2,
      title: "Me-game",
      description: "Be the engine of your dawn,<br />and the anchor through the storm.",
      color: "#45b7d1"
    },
    {
      id: 3,
      title: "Mirror Mode",
      description: "You face your truth, your flaws, your gleam,<br />to see which self still runs the dream.",
      color: "#f7b731"
    },
    {
      id: 4,
      title: "NPC Mode",
      description: "You spend your wants, your masks unmade,<br />to find the worth that won&apos;t degrade.",
      color: "#5f27cd"
    },
    {
      id: 5,
      title: "Monk Mode",
      description: "You strip it all, till nothing&apos;s left,<br />and find your power in what&apos;s bereft.",
      color: "#00d2d3"
    },
    {
      id: 6,
      title: "Everyday Mode",
      description: "You track your flow, refine your way,<br />each small design becomes your day.",
      color: "#ff9ff3"
    },
    {
      id: 7,
      title: "Ghost Mode",
      description: "You turn off light, the noise, the feed,<br />to hear the pulse your spirit leads.",
      color: "#54a0ff"
    },
    {
      id: 8,
      title: "Underground Mode",
      description: "You break the mold, confront the clay,<br />the self remade begins to stay.",
      color: "#5f27cd"
    },
    {
      id: 9,
      title: "Human Mode",
      description: "You face the dark, accept the scar,<br />the broken makes you who you Human are.",
      color: "#ff6348"
    },
    {
      id: 10,
      title: "Hero Mode",
      description: "Through many masks, one flame you stoke,<br />the myth becomes your Hero cloak.",
      color: "#2ed573"
    },
    {
      id: 11,
      title: "God Mode",
      description: "Beyond all form, beyond facade,<br />you breathe as light, you live as God.",
      color: "#ffa502"
    }
  ];

  const animateToCard = useCallback((targetIndex) => {
    setActiveCard(targetIndex);

    const currentGroup = Math.floor(targetIndex / 3);
    const positionInGroup = targetIndex % 3;

    if (onGroupChange) {
      onGroupChange(currentGroup);
    }

    if (onCardChange) {
      onCardChange(targetIndex);
    }

    // Dispatch subscrollComplete events for each card in the group
    // 3 lines appear at the start of each group and disappear as we progress
    // Group 0: cards 0,1,2 -> dispatch step 1,2,3
    // Group 1: cards 3,4,5 -> dispatch step 1,2,3 (resets)
    // Group 2: cards 6,7,8 -> dispatch step 1,2,3 (resets)
    // Group 3: cards 9,10,11 -> dispatch step 1,2,3 (resets)
    
    // Reset lines when entering a new group (first card of group)
    if (positionInGroup === 0) {
      // Reset by dispatching step 0 to clear previous group's progress
      window.dispatchEvent(new CustomEvent('subscrollComplete', { 
        detail: { section: 15, step: 0 } 
      }));
    }
    
    // Dispatch step based on position in group (1-based)
    const stepNumber = positionInGroup + 1; // 0->1, 1->2, 2->3
    window.dispatchEvent(new CustomEvent('subscrollComplete', { 
      detail: { section: 11, step: stepNumber } 
    }));

    const cardWrappers = cardsStackRef.current?.querySelectorAll(`.${styles.slide12CardWrapper}`);
    if (!cardWrappers) return;

    cardWrappers.forEach((wrapper, index) => {
      const card = wrapper.querySelector(`.${styles.slide12OverlappingCard}`);
      if (!card) return;

      const cardGroup = Math.floor(index / 3);
      const cardPositionInGroup = index % 3;

      if (cardGroup < currentGroup) {
        const yOffset = -window.innerHeight;
        wrapper.style.transform = `translateY(${yOffset}px)`;
        card.style.transform = `rotateX(0deg) scale(0.8)`;
        card.style.opacity = '0';
        card.style.zIndex = index + 1;
        card.classList.remove(styles.slide12CardActive);
      } else if (cardGroup === currentGroup) {
        if (cardPositionInGroup <= positionInGroup) {
          const rotationX = cardPositionInGroup === positionInGroup ? 0 : 0;
          const yOffset = cardPositionInGroup * 50;

          wrapper.style.transform = `translateY(${yOffset}px)`;
          card.style.transform = `rotateX(${rotationX}deg) scale(1)`;
          card.style.opacity = '1';
          card.style.zIndex = index + 1;

          if (index === targetIndex) {
            card.classList.add(styles.slide12CardActive);
          } else {
            card.classList.remove(styles.slide12CardActive);
          }
        } else {
          const yOffset = window.innerHeight;
          wrapper.style.transform = `translateY(${yOffset}px)`;
          card.style.transform = `rotateX(0deg) scale(1)`;
          card.style.opacity = '0.3';
          card.style.zIndex = index + 1;
          card.classList.remove(styles.slide12CardActive);
        }
      } else {
        const yOffset = window.innerHeight;
        wrapper.style.transform = `translateY(${yOffset}px)`;
        card.style.transform = `rotateX(0deg) scale(0.8)`;
        card.style.opacity = '0';
        card.style.zIndex = index + 1;
        card.classList.remove(styles.slide12CardActive);
      }
    });
  }, [onGroupChange, onCardChange]);

  // Calculate box positions from actual DOM (both vertical and horizontal)
  useEffect(() => {
    if (!cardsStackRef.current || !isInitialized) return;
    
    // Small delay to ensure DOM has updated after animations
    const timer = setTimeout(() => {
      if (!cardsStackRef.current || boxRefs.current.length === 0) return;
      
      const stackRect = cardsStackRef.current.getBoundingClientRect();
      const positions = boxRefs.current.map((boxRef, index) => {
        if (!boxRef) return null;
        const boxRect = boxRef.getBoundingClientRect();
        return {
          // Calculate center position relative to cardsStack
          top: boxRect.top - stackRect.top + (boxRect.height / 2),
          left: boxRect.left - stackRect.left + (boxRect.width / 2)
        };
      });
      
      // Only update if we have all positions
      if (positions.every(pos => pos !== null && pos !== undefined)) {
        setBoxPositions(positions);
      }
    }, 150); // Delay to allow animations to complete
    
    return () => clearTimeout(timer);
  }, [isInitialized, activeCard]);

  // Expose goToGroup method to parent via ref
  useImperativeHandle(ref, () => ({
    goToGroup: (groupIndex) => {
      const firstCardIndex = groupIndex * 3;
      if (firstCardIndex >= 0 && firstCardIndex < slide12CardsData.length) {
        animateToCard(firstCardIndex);
      }
    }
  }), [animateToCard]);

  useEffect(() => {
    setIsInitialized(true);
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      animateToCard(0); // Start with first card active
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Reset when entering slide 12 (currentSection === 15)
  useEffect(() => {
    if (!isInitialized) return;

    if (currentSection === 15 && isScrollEnabled) {
      animateToCard(0);
    }
  }, [currentSection, isScrollEnabled, isInitialized]);

  useEffect(() => {
    // Find the parent section container (the full slide area)
    const container = containerRef.current;
    if (!container) return;
    
    // Look for the parent section element that covers the full slide area
    const sectionElement = container.closest('section');
    if (!sectionElement) return;

    if (!isScrollEnabled) {
      return;
    }

    let wheelDelta = 0;
    let wheelTimer = null;
    let wheelHandler = null;

    const handleWheel = (e) => {
      if (isScrollingRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      wheelDelta += e.deltaY;

      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 100) {
          if (wheelDelta > 0 && activeCard < slide12CardsData.length - 1) {
            animateToCard(activeCard + 1);
          } else if (wheelDelta < 0 && activeCard > 0) {
            animateToCard(activeCard - 1);
          } else if (wheelDelta < 0 && activeCard === 0) {
            setTimeout(() => {
              if (window.gotoPrevSlide) {
                window.gotoPrevSlide();
              }
            }, 100);
          } else if (wheelDelta > 0 && activeCard === slide12CardsData.length - 1) {
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
      }, 100);
    };

    wheelHandler = handleWheel;

    // Delay wheel event attachment to avoid capturing GSAP transition momentum
    const wheelAttachDelay = setTimeout(() => {
      // Attach event listener to the full section area, not just the cards container
      sectionElement.addEventListener('wheel', wheelHandler, { passive: false, capture: true });
    }, 1000); // Wait 1 second after GSAP transition (0.8s) completes

    return () => {
      clearTimeout(wheelAttachDelay);
      if (wheelHandler) {
        sectionElement.removeEventListener('wheel', wheelHandler, { capture: true });
      }
    };
  }, [isScrollEnabled, onAllCardsVisible, onNextSection, onPrevSection, isInitialized, slide12CardsData.length, activeCard, animateToCard]);

  return (
    <div className={styles.slide12OverlappingCardsContainer} ref={containerRef} style={{ width: '100%', padding: 0, alignItems: 'flex-start', height: 'auto' }}>
      <div className={styles.slide12CardsStack} ref={cardsStackRef} style={{ position: 'relative' }}>
        {/* Individual connecting lines - each positioned independently */}
        {slide12CardsData.map((_, index) => {
          if (index === slide12CardsData.length - 1) return null; // No line after last card
          
          // Skip lines between groups (every 3rd card connects to next group, not within same group)
          // Cards are grouped as: [0,1,2], [3,4,5], [6,7,8], [9,10,11]
          // So skip lines: 2->3, 5->6, 8->9 (these are between groups)
          if ((index + 1) % 3 === 0) return null;
          
          // Calculate box positions - start from bottom edge of current box to top edge of next box
          const currentBox = boxPositions[index];
          const nextBox = boxPositions[index + 1];
          
          // Use actual measured positions or fallback
          const currentBoxTop = currentBox ? currentBox.top : (index * 50) + 24 + 10;
          const currentBoxLeft = currentBox ? currentBox.left : 0;
          const nextBoxTop = nextBox ? nextBox.top : ((index + 1) * 50) + 24 + 10;
          
          // Line starts from bottom edge of current box and ends at top edge of next box
          const boxSize = 20; // Box is 20px x 20px
          const lineStartY = currentBoxTop + (boxSize / 2); // Bottom edge of current box
          const lineEndY = nextBoxTop - (boxSize / 2); // Top edge of next box
          const lineHeight = lineEndY - lineStartY;
          const isVisible = activeCard > index;
          
          // Calculate card animation states to match line movement with cards
          const currentGroup = Math.floor(activeCard / 3);
          const cardGroup = Math.floor(index / 3);
          
          let lineTransform = 'translateY(0px)';
          let lineOpacity = 1;
          
          if (cardGroup < currentGroup) {
            // Line should move up with cards that have moved up
            lineTransform = 'translateY(-100vh)';
            lineOpacity = 0;
          } else if (cardGroup > currentGroup) {
            // Line should move down with cards that are below
            lineTransform = 'translateY(100vh)';
            lineOpacity = 0;
          }
          
          // Only render if we have valid positions and reasonable height
          if (!isFinite(lineHeight) || lineHeight <= 0 || lineHeight < 30 || lineHeight > 70) {
            // If measured positions seem wrong, use calculated fallback
            const fallbackHeight = 50; // Exact overlap distance for Slide 12
            const fallbackLeft = currentBoxLeft || 'calc(100% - 2rem - 10px)';
            
            return (
              <div
                key={`connector-${index}`}
                style={{
                  position: 'absolute',
                  top: `${lineStartY}px`,
                  left: typeof fallbackLeft === 'number' ? `${fallbackLeft}px` : fallbackLeft,
                  width: '2px',
                  height: `${fallbackHeight - 20}px`, // Reduced by box size
                  background: 'linear-gradient(to bottom, rgba(0, 232, 123, 0.8), rgba(0, 232, 123, 0.5), rgba(0, 232, 123, 0.3))',
                  transform: `${lineTransform} ${isVisible ? 'scaleY(1)' : 'scaleY(0)'}`,
                  transformOrigin: 'top',
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease',
                  boxShadow: isVisible ? '0 0 8px rgba(0, 232, 123, 0.4)' : 'none',
                  opacity: isVisible ? lineOpacity : 0,
                  zIndex: 1000,
                  pointerEvents: 'none'
                }}
              />
            );
          }
          
          return (
            <div
              key={`connector-${index}`}
              style={{
                position: 'absolute',
                top: `${lineStartY}px`, // Start from bottom edge of current box
                left: `${currentBoxLeft}px`, // Use actual measured horizontal position
                width: '2px',
                height: `${lineHeight}px`, // Height: distance from bottom of current box to top of next box
                background: 'linear-gradient(to bottom, rgba(0, 232, 123, 0.8), rgba(0, 232, 123, 0.5), rgba(0, 232, 123, 0.3))',
                transform: `${lineTransform} ${isVisible ? 'scaleY(1)' : 'scaleY(0)'}`,
                transformOrigin: 'top',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease',
                boxShadow: isVisible ? '0 0 8px rgba(0, 232, 123, 0.4)' : 'none',
                opacity: isVisible ? lineOpacity : 0,
                zIndex: 1000,
                pointerEvents: 'none'
              }}
            />
          );
        })}
        
        {slide12CardsData.map((card, index) => (
          <div
            key={card.id}
            className={styles.slide12CardWrapper}
            style={{
              transform: `translateY(${index * 50}px)`,
              zIndex: index + 1
            }}
          >
            <div
              className={`${styles.slide12OverlappingCard} ${activeCard === index ? styles.slide12CardActive : ''}`}
              style={{
                '--card-color': card.color,
                background: '#000000',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Card clicked:', index, card.title);
                if (index !== activeCard) {
                  animateToCard(index);
                }
              }}
            >
              <div className={styles.slide12CardContent} style={{ textAlign: 'right', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: 'fit-content', marginLeft: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', justifyContent: 'flex-end' }}>
                    <h3 className={styles.slide12CardTitle} style={{ margin: 0 }}>
                      <span style={{
                        fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                        fontSize: '26px',
                        color: '#00e87b',
                        fontWeight: 'normal',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {card.title}
                      </span>
                    </h3>
                    <div
                      ref={el => boxRefs.current[index] = el}
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
                        fontWeight: activeCard === index ? '700' : '600',
                        color: '#00e87b',
                        transition: 'all 0.6s ease',
                        flexShrink: 0,
                        position: 'relative',
                        zIndex: 1001
                      }}
                    >
                    </div>
                  </div>
                  <div className={styles.slide12CardTitleDivider} style={{ alignSelf: 'flex-end', width: '100%' }}></div>
                </div>
                <p className={styles.slide12CardDescription} style={{ textAlign: 'right' }} dangerouslySetInnerHTML={{ __html: card.description }} />
                <div className={styles.slide12CardNumber} style={{ textAlign: 'right', alignSelf: 'flex-end' }}>{String(index + 1).padStart(2, '0')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.slide12ProgressIndicator} style={{ display: 'none' }}>
        <div className={styles.slide12ProgressBar}>
          <div
            className={styles.slide12ProgressFill}
            style={{
              width: `${((activeCard + 1) / slide12CardsData.length) * 100}%`
            }}
          />
        </div>
        <span className={styles.slide12ProgressText}>
          {activeCard + 1} / {slide12CardsData.length}
        </span>
      </div>
    </div>
  );
});

Slide12DesignModesCarousel.displayName = 'Slide12DesignModesCarousel';

