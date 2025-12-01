"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from "next/image";
import styles from '../../Pallax.module.css';

export const ScrollRevealSectionSlide10 = ({ onAllColumnsVisible, currentSection, isScrollEnabled = true }) => {
  const containerRef = useRef(null);
  const cardsStackRef = useRef(null);
  const boxRefs = useRef([]);
  const [activeCard, setActiveCard] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [boxPositions, setBoxPositions] = useState([]);

  const gameFlowCardsData = [
    {
      id: 0,
      title: "Hourly Games",
      subtitle: "Free",
      description: "Small missions that mirror your core; every tiny move reveals one truth more.",
      color: "#ff6b6b",
      imageUrl: "https://lidbucketnew.s3.ap-south-1.amazonaws.com/avatar/avatar1.svg"
    },
    {
      id: 1,
      title: "Weekend Games",
      subtitle: "Free",
      description: "One weekend rewrites your inner scheme, wake designed, not drifting.",
      color: "#4ecdc4",
      imageUrl: "https://lidbucketnew.s3.ap-south-1.amazonaws.com/avatar/avatar2.svg"
    },
    {
      id: 2,
      title: "Quarterly Games",
      subtitle: "Premium",
      description: "Each season you sculpt, rebuild, renew; discipline bends toward the self that&apos;s true.",
      color: "#f7b731",
      imageUrl: "https://lidbucketnew.s3.ap-south-1.amazonaws.com/avatar/avatar3.svg"
    },
    {
      id: 3,
      title: "Annual Games",
      subtitle: "Premium",
      description: "One year to play the game divine; you merge with god—your own design.",
      color: "#5f27cd",
      imageUrl: "https://lidbucketnew.s3.ap-south-1.amazonaws.com/avatar/avatar4.svg"
    }
  ];

  // Animate cards to show stacking effect
  const animateToCard = useCallback((targetIndex) => {
    // Fade out image before changing (only if cards are visible)
    if (targetIndex >= 0) {
      setImageOpacity(0);
      
      // After fade out, change card and fade in
      setTimeout(() => {
        setActiveCard(targetIndex);
        setImageOpacity(1);
      }, 200);
    } else {
      setActiveCard(targetIndex);
    }
    
    // Dispatch event for dot animation (cards are 1-based for steps)
    if (targetIndex > 0) {
      window.dispatchEvent(new CustomEvent('subscrollComplete', { 
        detail: { section: 19, step: targetIndex } 
      }));
    }

    // Animate each card based on its relationship to the active card
    const cardWrappers = cardsStackRef.current?.querySelectorAll(`.${styles.gameFlowCardWrapper}`);
    if (!cardWrappers) return;

    cardWrappers.forEach((wrapper, index) => {
      const card = wrapper.querySelector(`.${styles.gameFlowCard}`);
      if (!card) return;

      // If targetIndex is -1, hide all cards
      if (targetIndex === -1) {
        const yOffset = window.innerHeight;
        wrapper.style.transform = `translateY(${yOffset}px)`;
        card.style.transform = `rotateX(0deg) scale(1)`;
        card.style.opacity = '0';
        card.style.zIndex = index + 1;
        card.classList.remove(styles.gameFlowCardActive);
      } else if (index <= targetIndex) {
        // Cards that should be visible/active - no scaling, keep full size
        const rotationX = index === targetIndex ? 0 : 0; // No rotation for cleaner look
        const yOffset = index * 70; // Adjusted overlap distance

        wrapper.style.transform = `translateY(${yOffset}px)`;
        card.style.transform = `rotateX(${rotationX}deg) scale(1)`; // Always scale 1
        card.style.opacity = '1';
        card.style.zIndex = index + 1;

        // Add active class to current card
        if (index === targetIndex) {
          card.classList.add(styles.gameFlowCardActive);
        } else {
          card.classList.remove(styles.gameFlowCardActive);
        }
      } else {
        // Cards that should be hidden (slide down)
        const yOffset = window.innerHeight;
        wrapper.style.transform = `translateY(${yOffset}px)`;
        card.style.transform = `rotateX(0deg) scale(1)`; // Keep full size even when hidden
        card.style.opacity = '0.3';
        card.style.zIndex = index + 1;
        card.classList.remove(styles.gameFlowCardActive);
      }
    });
  }, []);

  // Calculate box positions from actual DOM
  useEffect(() => {
    if (!cardsStackRef.current || !isInitialized) return;
    
    // Small delay to ensure DOM has updated after animations
    const timer = setTimeout(() => {
      if (!cardsStackRef.current || boxRefs.current.length === 0) return;
      
      const stackRect = cardsStackRef.current.getBoundingClientRect();
      const positions = boxRefs.current.map((boxRef, index) => {
        if (!boxRef) return null;
        const boxRect = boxRef.getBoundingClientRect();
        // Calculate center position relative to cardsStack top
        return boxRect.top - stackRect.top + (boxRect.height / 2);
      });
      
      // Only update if we have all positions
      if (positions.every(pos => pos !== null && pos !== undefined)) {
        setBoxPositions(positions);
      }
    }, 150); // Delay to allow animations to complete
    
    return () => clearTimeout(timer);
  }, [isInitialized, activeCard]);

  // Initialize component
  useEffect(() => {
    setIsInitialized(true);
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      animateToCard(-1); // Start with no cards visible (only text)
    }, 100);

    return () => clearTimeout(timer);
  }, [animateToCard]);

  // Reset when entering slide 10 (currentSection === 19)
  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (!isInitialized) return;

    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;

    // Only reset when ENTERING this section (not when already on it or leaving it)
    if (currentSection === 19 && prevSection !== 19 && isScrollEnabled) {
      animateToCard(-1); // Reset to no cards visible
    }
  }, [currentSection, isScrollEnabled, isInitialized, animateToCard]);

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
        if (Math.abs(wheelDelta) > 100) {
          if (wheelDelta > 0 && activeCard < gameFlowCardsData.length - 1) {
            // Scroll down (next card)
            animateToCard(activeCard + 1);
          } else if (wheelDelta < 0 && activeCard > -1) {
            // Scroll up (previous card or hide all cards)
            animateToCard(activeCard - 1);
          } else if (wheelDelta < 0 && activeCard === -1) {
            // At text-only state, trigger previous section
            setTimeout(() => {
              if (window.gotoPrevSlide) {
                window.gotoPrevSlide();
              }
            }, 100);
          } else if (wheelDelta > 0 && activeCard === gameFlowCardsData.length - 1) {
            // At last card, trigger next section
            if (onAllColumnsVisible) {
              onAllColumnsVisible();
            }
            // Trigger main scroll to next section
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

    // Add event listener with capture to ensure it gets the event first
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
      clearTimeout(wheelTimer);
    };
  }, [isScrollEnabled, onAllColumnsVisible, isInitialized, gameFlowCardsData.length, activeCard, animateToCard]);

  return (
    <div className={styles.scrollRevealMasterContainer} ref={containerRef}>
      {/* Fixed Grey Line Container */}
      <div className={styles.greyLineContainer}>
        <p className={styles.greyLineText}>
        Play isn&apos;t escape; it&apos;s your return, <br/>and every level beyond the weekend deepens what you learn.
        </p>
      </div>

      {/* Main Content Container - restore original gameFlowNewContainer layout */}
      <div className={styles.scrollRevealMainContent}>
        <div className={styles.gameFlowNewContainer}>
          {/* Left Side - Overlapping Cards */}
          <div className={styles.gameFlowCardsSection}>
            <div className={styles.gameFlowCardsStack} ref={cardsStackRef} style={{ position: 'relative' }}>
              {/* Vertical connecting lines container - positioned absolutely to span all cards */}
              <div style={{
                position: 'absolute',
                left: 'calc(2rem + 10px)', // Card content padding (2rem) + half box width (10px) = box center
                top: '0',
                width: '2px',
                zIndex: 1000,
                pointerEvents: 'none',
                overflow: 'visible'
              }}>
                {/* Individual line segments connecting box centers */}
                {gameFlowCardsData.map((_, index) => {
                  if (index === gameFlowCardsData.length - 1) return null; // No line after last card
                  
                  // Calculate box positions - start from bottom edge of current box to top edge of next box
                  const currentBoxCenter = boxPositions[index] !== undefined && boxPositions[index] !== null
                    ? boxPositions[index] 
                    : (index * 70) + 24 + 10; // Fallback calculation
                  
                  const nextBoxCenter = boxPositions[index + 1] !== undefined && boxPositions[index + 1] !== null
                    ? boxPositions[index + 1]
                    : ((index + 1) * 70) + 24 + 10; // Fallback calculation
                  
                  // Line starts from bottom edge of current box and ends at top edge of next box
                  const boxSize = 20; // Box is 20px x 20px
                  const lineStartY = currentBoxCenter + (boxSize / 2); // Bottom edge of current box
                  const lineEndY = nextBoxCenter - (boxSize / 2); // Top edge of next box
                  const lineHeight = lineEndY - lineStartY;
                  const isVisible = activeCard >= 0 && activeCard > index;
                  
                  // Only render if we have valid positions and reasonable height
                  // Line height should be around 70px (overlap distance), allow 50-90px range
                  if (!isFinite(lineHeight) || lineHeight <= 0 || lineHeight < 50 || lineHeight > 90) {
                    // If measured positions seem wrong, use calculated fallback
                    const fallbackHeight = 70; // Exact overlap distance
                    return (
                      <div
                        key={`connector-${index}`}
                        style={{
                          position: 'absolute',
                          top: `${lineStartY}px`,
                          left: '0',
                          width: '2px',
                          height: `${fallbackHeight - 20}px`, // Reduced by box size
                          background: 'linear-gradient(to bottom, rgba(0, 232, 123, 0.8), rgba(0, 232, 123, 0.5), rgba(0, 232, 123, 0.3))',
                          transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                          transformOrigin: 'top',
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: isVisible ? '0 0 8px rgba(0, 232, 123, 0.4)' : 'none',
                          opacity: isVisible ? 1 : 0
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
                        left: '0',
                        width: '2px',
                        height: `${lineHeight}px`, // Height: distance from bottom of current box to top of next box
                        background: 'linear-gradient(to bottom, rgba(0, 232, 123, 0.8), rgba(0, 232, 123, 0.5), rgba(0, 232, 123, 0.3))',
                        transform: isVisible ? 'scaleY(1)' : 'scaleY(0)', // Animate from 0 to 1 like slide 4
                        transformOrigin: 'top',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isVisible ? '0 0 8px rgba(0, 232, 123, 0.4)' : 'none',
                        opacity: isVisible ? 1 : 0
                      }}
                    />
                  );
                })}
              </div>
              
              {gameFlowCardsData.map((card, index) => (
                <div
                  key={card.id}
                  className={styles.gameFlowCardWrapper}
                  style={{
                    transform: `translateY(${index * 70}px)`,
                    zIndex: index + 1
                  }}
                >
                  <div
                    className={`${styles.gameFlowCard} ${activeCard === index ? styles.gameFlowCardActive : ''}`}
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
                    <div className={styles.gameFlowCardContent} style={{ textAlign: 'left', alignItems: 'flex-start', padding: '0 2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div
                          ref={el => boxRefs.current[index] = el}
                          className={`${styles.progressNumber} ${activeCard === index ? styles.progressActive : ''}`}
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
                            zIndex: 1001 // Above the line
                          }}
                        >
                        </div>
                        <h3 className={styles.gameFlowCardTitle} style={{ textAlign: 'left', margin: 0 }}>
                          <span style={{
                            fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                            fontSize: '14px',
                            color: '#00e87b',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {card.title}
                          </span>
                        </h3>
                      </div>
                      <div className={styles.gameFlowCardTitleDivider} style={{ alignSelf: 'flex-start' }}></div>
                      <span className={styles.gameFlowCardSubtitle}>{card.subtitle}</span>
                      <p className={styles.gameFlowCardDescription}>{card.description}</p>
                      <div className={styles.gameFlowCardNumber}>{String(index + 1).padStart(2, '0')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Dynamic Image that changes with active card */}
          <div 
            className={styles.gameFlowImagesSection}
            style={{
              opacity: activeCard >= 0 ? 1 : 0,
              transform: activeCard >= 0 ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            <div className={styles.gameFlowImageContainer}>
              <div className={styles.gameFlowImage}>
                {activeCard >= 0 && (
                  <Image
                    src={`https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/7.+game+flow+${activeCard + 1}.svg`}
                    width={500}
                    height={500}
                    alt="Game Flow"
                    className={styles.gameFlowImageContent}
                    unoptimized
                    style={{
                      opacity: imageOpacity,
                      transition: 'opacity 0.4s ease-in-out'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

