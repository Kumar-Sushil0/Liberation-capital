"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from '../../Pallax.module.css';
import SimpleFlippingWords from '../../../../components/Flipping_words/SimpleFlippingWords';

export const GameEcosystemCarousel = ({ onAllSlidesVisible, onNextSection, onPrevSection, currentSection, isScrollEnabled = true }) => {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const titleFlipRefs = useRef([]);

  const ecosystemData = [
    {
      id: 0,
      title: "Design Thyself",
      description: "Your initiation into self authorship.<br />Learn to design your habits, emotions, and choices as creative acts, turning daily existence into a living artwork.",
      liberationMove: "Awareness → Alignment",
      launchDate: "December 2025",
      color: "#00e87b",
      bgImage: "linear-gradient(135deg, #00e87b 0%, #00a86b 100%)"
    },
    {
      id: 1,
      title: "Hero's Drift",
      description: "Step into archetypes, rewrite your myth, and balance chaos with creation.<br />This is where your personas collide, and you learn to dance in the drift.",
      liberationMove: "Identity → Integration",
      launchDate: "December 2026",
      color: "#ff6b6b",
      bgImage: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
    },
    {
      id: 2,
      title: "LIFEoGRAPHY",
      description: "Turn memory into mythology. Chronicle your evolution through storyboards, visuals, and journals.<br />Transform chaos into narrative coherence, your life, written by you.",
      liberationMove: "Reflection → Meaning",
      launchDate: "December 2027",
      color: "#4ecdc4",
      bgImage: "linear-gradient(135deg, #4ecdc4 0%, #26d0ce 100%)"
    },
    {
      id: 3,
      title: "Eat • Pray • Rizz",
      description: "The final act, embodiment.<br />Where wisdom meets flavor, devotion meets mischief, and your energy becomes transmission.",
      liberationMove: "Mastery → Freedom",
      launchDate: "December 2028",
      color: "#f7b731",
      bgImage: "linear-gradient(135deg, #f7b731 0%, #f39c12 100%)"
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

  // Reset when entering slide 14 (currentSection === 20)
  useEffect(() => {
    if (!isInitialized) return;

    if (currentSection === 20 && isScrollEnabled) {
      setSkipTransitions(true);
      setCurrentSlide(0);

      const container = containerRef.current;
      if (container) {
        container.scrollLeft = 0;
      }

      setTimeout(() => {
        setSkipTransitions(false);
      }, 100);
    }
  }, [currentSection, isScrollEnabled, isInitialized]);

  // Trigger flip animation when slide changes
  useEffect(() => {
    if (isInitialized && currentSection === 20) {
      const activeRef = titleFlipRefs.current[currentSlide];
      if (activeRef && activeRef.triggerFlip) {
        setTimeout(() => {
          activeRef.triggerFlip();
        }, 300);
      }
    }
  }, [currentSlide, isInitialized, currentSection]);

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
      if (slideIndex === ecosystemData.length - 1 && onAllSlidesVisible) {
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
        if (slideIndex === ecosystemData.length - 1 && onAllSlidesVisible) {
          onAllSlidesVisible();
        }
      }
    };

    requestAnimationFrame(animateScroll);
  }, [onAllSlidesVisible, ecosystemData.length]);

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
          if (wheelDelta > 0 && currentSlide < ecosystemData.length - 1) {
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
          } else if (wheelDelta > 0 && currentSlide === ecosystemData.length - 1) {
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
  }, [isScrollEnabled, onAllSlidesVisible, onNextSection, onPrevSection, isInitialized, ecosystemData.length, smoothScrollToSlide, currentSlide]);

  return (
    <div className={styles.gameEcosystemCarousel}>
      <div
        ref={containerRef}
        className={styles.carouselContainer}
      >
        <div className={styles.carouselWrapper}>
          {ecosystemData.map((item, index) => (
            <div
              key={item.id}
              className={styles.carouselSlide}
              style={{
                background: '#000000',
                transition: skipTransitions ? 'none' : 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className={styles.slideContent}>
                <div className={styles.slideText} style={{ position: 'relative', zIndex: 10 }}>
                  <h1 className={styles.slideTitle} style={{ color: item.color }}>
                    <SimpleFlippingWords
                      ref={(el) => { titleFlipRefs.current[index] = el; }}
                      currentWord={item.title}
                      fontSize="48px"
                      mute={true}
                      textColor="#ffffff"
                    />
                  </h1>
                  <p className={styles.slideDescription} dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
                
                {/* Image between description and text container */}
                <div style={{ 
                  width: '100%', 
                  maxWidth: '600px', 
                  margin: '0 auto',
                  position: 'relative',
                  aspectRatio: '16/9',
                  transform: index === 1 ? 'scale(1.6)' : 'scale(1)',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  zIndex: 1
                }}>
                  <Image
                    src={`https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/11.+game+series+${index + 1}.svg`}
                    alt={`${item.title} illustration`}
                    fill
                    style={{ 
                      objectFit: 'contain'
                    }}
                    unoptimized
                  />
                </div>
                
                {/* Launching and Liberation text container */}
                <div className={styles.slideTextContainer} style={{ position: 'relative', zIndex: 10 }}>
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
                    <div className={styles.textTableRow}>
                      <div className={styles.textPrefixCell}>
                        <span className={styles.liberationMovePrefix}>Liberation Move: </span>
                      </div>
                      <div className={styles.textValueCell}>
                        <span className={styles.liberationMoveText}>{item.liberationMove}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide indicator */}
              <div className={styles.slideIndicator}>
                <span className={styles.slideNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.slideTotal}>/ {String(ecosystemData.length).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grey text and navigation dots container */}
      <div className={styles.carouselBottomSection}>
      <div className={styles.carouselDots}>
        {ecosystemData.map((_, index) => (
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

