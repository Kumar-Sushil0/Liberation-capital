"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from '../../Pallax.module.css';

export const Slide15GameModesCarousel = ({ onAllSlidesVisible, onNextSection, onPrevSection, currentSection, isScrollEnabled = true }) => {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const currentStepRef = useRef(0);

  const gameModesData = [
    {
      id: 0,
      title: "EPiCENTRE — The Retreat of Return",
      description: "A physical retreat centre, part monastery, part creative lab, and part war room, built for players who want to step beyond reflection and into embodiment. Here, distraction dies and discipline begins.",
      liberationMove: "Structured immersions for reflection, creation, and reprogramming.",
      launchDate: "Launching Q1 2026",
      color: "#00e87b",
      bgImage: "linear-gradient(135deg, #00e87b 0%, #00a86b 100%)"
    },
    {
      id: 1,
      title: "THEATRE OF THE INVERSE — Mask Meets Mirror",
      description: "A yearly and quarterly one act play event, part drama therapy, part mythic performance. Players turn their journey into performance art, scripting and performing their transformation before an audience.",
      liberationMove: "Serves as the final Demo Day for graduating cohorts.",
      launchDate: "Launching Q2 2026",
      color: "#ff6b6b",
      bgImage: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
    },
    {
      id: 2,
      title: "LIBERATION CAPITAL — The Fund of Becoming",
      description: "A venture fund for the inner economy, investing not in businesses but in beings. Scholarships fuel access to the game; funding empowers graduates to build projects born from their transformation.",
      liberationMove: "Investing in human growth, not business growth.",
      launchDate: "Launching Q3 2026",
      color: "#4ecdc4",
      bgImage: "linear-gradient(135deg, #4ecdc4 0%, #26d0ce 100%)"
    },
    {
      id: 3,
      title: "BIGI — Silent Tourism",
      description: "An NGO devoted to stillness-based tourism in Bhigwan, where solitude, stargazing, fishing, and bird-watching replace chatter and commerce. Silence becomes a collective language, and nature, the true spectacle.",
      liberationMove: "Building a stillness economy through mindful travel.",
      launchDate: "Launching Q3 2026",
      color: "#f7b731",
      bgImage: "linear-gradient(135deg, #f7b731 0%, #f39c12 100%)"
    },
    {
      id: 4,
      title: "SUGAR PUNK — The Living Neighborhood",
      description: "A gated, sustainable community for conscious living, where design meets ecology. Every home produces its own food, energy, and resources. A sandbox for those who choose self sufficiency as their alternate game.",
      liberationMove: "Residences & Plots offered to players seeking liberation from Matrix",
      launchDate: "Launching Q1 2026",
      color: "#5f27cd",
      bgImage: "linear-gradient(135deg, #5f27cd 0%, #341f97 100%)"
    }
  ];

  // Initialize component
  useEffect(() => {
    setSkipTransitions(true);
    setCurrentSlide(0);

    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Reset when entering slide 15 (currentSection === 21)
  useEffect(() => {
    if (!isInitialized) return;

    if (currentSection === 21 && isScrollEnabled) {
      setSkipTransitions(true);
      setCurrentSlide(0);
      currentStepRef.current = 0;

      const container = containerRef.current;
      if (container) {
        container.scrollLeft = 0;
      }

      setTimeout(() => {
        setSkipTransitions(false);
      }, 100);
    }
  }, [currentSection, isScrollEnabled, isInitialized]);

  // Navigation function to scroll to a specific slide
  const smoothScrollToSlide = useCallback((slideIndex, skipAnimation = false) => {
    const container = containerRef.current;
    if (!container || isScrollingRef.current) return;
    
    isScrollingRef.current = true;

    const wrapper = container.querySelector(`.${styles.carouselWrapper}`);
    if (!wrapper) {
      isScrollingRef.current = false;
      return;
    }

    const slideWidth = container.clientWidth;
    const targetTransform = -(slideIndex * slideWidth);

    // Update state immediately
    setCurrentSlide(slideIndex);
    currentStepRef.current = slideIndex;

    if (skipAnimation) {
      setSkipTransitions(true);
      wrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(${targetTransform}px)`;
      isScrollingRef.current = false;

      setTimeout(() => {
        setSkipTransitions(false);
        wrapper.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      }, 50);

      // Notify parent when all slides are visible
      if (slideIndex === gameModesData.length - 1 && onAllSlidesVisible) {
        onAllSlidesVisible();
      }
      return;
    }

    // Smooth scroll animation using requestAnimationFrame
    wrapper.style.transition = 'none'; // Disable CSS transitions during animation

    const currentTransform = wrapper.style.transform ?
      parseFloat(wrapper.style.transform.match(/translateX\(([^)]+)px\)/)?.[1] || 0) : 0;
    const distance = targetTransform - currentTransform;
    const duration = 800; // 800ms for smooth animation
    const startTime = performance.now();

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      const newTransform = currentTransform + (distance * easedProgress);
      wrapper.style.transform = `translateX(${newTransform}px)`;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        wrapper.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'; // Re-enable transitions
        isScrollingRef.current = false;

        // Notify parent when all slides are visible
        if (slideIndex === gameModesData.length - 1 && onAllSlidesVisible) {
          onAllSlidesVisible();
        }
      }
    };

    requestAnimationFrame(animateScroll);
  }, [onAllSlidesVisible, gameModesData.length]);

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
        if (Math.abs(wheelDelta) > 100) { // Increased threshold for better control
          if (wheelDelta > 0 && currentSlide < gameModesData.length - 1) {
            // Scroll right (next slide)
            smoothScrollToSlide(currentSlide + 1);
          } else if (wheelDelta < 0 && currentSlide > 0) {
            // Scroll left (previous slide)
            smoothScrollToSlide(currentSlide - 1);
          } else if (wheelDelta < 0 && currentSlide === 0) {
            // At first slide, trigger previous section
            if (onPrevSection) {
              setTimeout(() => {
                onPrevSection();
              }, 100);
            }
          } else if (wheelDelta > 0 && currentSlide === gameModesData.length - 1) {
            // At last slide, trigger next section
            if (onAllSlidesVisible) {
              onAllSlidesVisible();
            }
            // Trigger main scroll to next section
            if (onNextSection) {
              setTimeout(() => {
                onNextSection();
              }, 100);
            }
          }
        }
        wheelDelta = 0;
      }, 100); // Increased timeout for better control
    };

    // Add event listener with capture to ensure it gets the event first
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    // Initialize with first slide
    smoothScrollToSlide(0, true);

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
      clearTimeout(wheelTimer);
    };
  }, [isScrollEnabled, onAllSlidesVisible, onNextSection, onPrevSection, isInitialized, gameModesData.length, smoothScrollToSlide, currentSlide]);

  return (
    <div className={styles.gameEcosystemCarousel}>
      <div
        ref={containerRef}
        className={styles.carouselContainer}
      >
        <div className={styles.carouselWrapper}>
          {gameModesData.map((item, index) => (
            <div
              key={item.id}
              className={styles.carouselSlide}
              style={{
                background: '#000000',
                transition: skipTransitions ? 'none' : 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className={styles.slideContent}>
                <div className={styles.slideText}>
                  <h1 className={styles.slideTitle} style={{ color: item.color }}>
                    <span style={{
                      fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                      fontSize: '14px',
                      color: '#00e87b',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {item.title}
                    </span>
                  </h1>
                  <p className={styles.slideDescription} dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
                
                {/* Image between description and text container */}
                <div style={{ 
                  width: '100%', 
                  maxWidth: '600px', 
                  margin: '0 auto',
                  position: 'relative',
                  aspectRatio: '16/9'
                }}>
                  <Image
                    src={index === 4 
                      ? 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/17.1.svg'
                      : index === 3
                      ? 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/17.2.svg'
                      : index === 2
                      ? 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/17.6.svg'
                      : index === 1
                      ? 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/17.4.svg'
                      : index === 0
                      ? 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/epicenter.svg'
                      : `https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/11.+game+series+${index + 1}.svg`
                    }
                    alt={`${item.title} illustration`}
                    fill
                    style={{ 
                      objectFit: 'contain'
                    }}
                    unoptimized
                  />
                </div>
                
                {/* Launching and Liberation text container */}
                <div className={styles.slideTextContainer}>
                  {/* Launching text */}
                  <div className={styles.slideLaunchText}>
                    <div className={styles.textTableRow}>
                      <div className={styles.textPrefixCell}>
                        <span className={styles.launchTextPrefix}>Launching: </span>
                      </div>
                      <div className={styles.textValueCell}>
                        <span className={styles.launchTextDate}>{item.launchDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Liberation text */}
                  <div className={styles.slideGreenText}>
                    <span className={styles.liberationMoveText}>{item.liberationMove}</span>
                  </div>
                </div>
              </div>

              {/* Slide indicator */}
              <div className={styles.slideIndicator}>
                <span className={styles.slideNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.slideTotal}>/ {String(gameModesData.length).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grey text and navigation dots container */}
      <div className={styles.carouselBottomSection}>
      <div className={styles.carouselDots}>
        {gameModesData.map((_, index) => (
          <div
            key={index}
            className={`${styles.carouselDot} ${currentSlide === index ? styles.carouselDotActive : ''}`}
            onClick={() => {
              if (index !== currentSlide) {
                smoothScrollToSlide(index);
              }
            }}
            style={{ cursor: 'pointer' }}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

