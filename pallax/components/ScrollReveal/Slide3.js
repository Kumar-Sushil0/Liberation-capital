"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../Pallax.module.css';
import { MobileVideoCarousel } from '../MobileVideoCarousel';

export const ScrollRevealSectionSlide3 = ({ onAllColumnsVisible, currentSection, isScrollEnabled = true, currentVideoIndex, setCurrentVideoIndex, videoStates, setVideoStates, videoRefs, togglePlayPause, updateProgress, updateDuration, seekVideo }) => {
  const containerRef = useRef(null);
  const [visibleColumns, setVisibleColumns] = useState(isScrollEnabled ? 0 : 2);
  const [skipTransitions, setSkipTransitions] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setSkipTransitions(true);
    setVisibleColumns(isScrollEnabled ? 1 : 2);

    const timer = setTimeout(() => {
      setSkipTransitions(false);
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isScrollEnabled]);

  useEffect(() => {
    if (!isInitialized) return;
    
    // Only respond to isScrollEnabled changes when we're actually on this section
    if (currentSection !== 4) return;

    setSkipTransitions(true);

    if (!isScrollEnabled) {
      setVisibleColumns(2);
      if (onAllColumnsVisible) {
        onAllColumnsVisible();
      }
    } else {
      setVisibleColumns(1);
      const container = containerRef.current;
      if (container) {
        container.scrollTop = 0;
      }
    }

    setTimeout(() => {
      setSkipTransitions(false);
    }, 50);
  }, [isScrollEnabled, onAllColumnsVisible, isInitialized, currentSection]);

  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (!isInitialized) return;

    const prevSection = prevSectionRef.current;
    prevSectionRef.current = currentSection;

    // Only reset when ENTERING this section (not when already on it or leaving it)
    if (currentSection === 4 && prevSection !== 4 && isScrollEnabled) {
      setSkipTransitions(true);
      setVisibleColumns(1);
      setCurrentVideoIndex(0);
      setVideoStates({});

      const container = containerRef.current;
      if (container) {
        container.scrollTop = 0;
      }

      setTimeout(() => {
        setSkipTransitions(false);
      }, 100);
    }
  }, [currentSection, isScrollEnabled, isInitialized, setCurrentVideoIndex, setVideoStates]);

  useEffect(() => {
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
    let currentStep = 1;

    const smoothScrollToStep = (step, skipAnimation = false) => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

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

      if (skipAnimation || step === 1) {
        setSkipTransitions(true);
        container.scrollTop = targetScroll;
        setVisibleColumns(step);
        currentStep = step;
        isScrollingRef.current = false;

        setTimeout(() => {
          setSkipTransitions(false);
        }, 50);

        if (step === 2 && onAllColumnsVisible) {
          onAllColumnsVisible();
          // Dispatch event to trigger dot animation (skip animation case)
          window.dispatchEvent(new CustomEvent('subscrollComplete', { 
            detail: { section: 4, step: 1 } 
          }));
        }
        return;
      }

      const startScroll = container.scrollTop;
      const distance = targetScroll - startScroll;
      const duration = 800;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
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

          if (step === 2 && onAllColumnsVisible) {
            onAllColumnsVisible();
            // Dispatch event to trigger dot animation
            window.dispatchEvent(new CustomEvent('subscrollComplete', { 
              detail: { section: 4, step: 1 } 
            }));
          }

          if (step >= 3 && currentSection === 4) {
            setTimeout(() => {
              if (window.gotoNextSlide && currentSection === 4) {
                window.gotoNextSlide();
              }
            }, 300);
          }
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleWheel = (e) => {
      if (isScrollingRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      wheelDelta += e.deltaY;

      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }

      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > 30) {
          if (wheelDelta > 0) {
            const nextStep = Math.min(currentStep + 1, 3);
            smoothScrollToStep(nextStep);
          } else {
            if (currentStep === 1) {
              if (window.gotoPrevSlide) {
                window.gotoPrevSlide();
              }
            } else {
              const prevStep = Math.max(currentStep - 1, 1);
              smoothScrollToStep(prevStep);
            }
          }
        }
        wheelDelta = 0;
      }, 5);
    };

    // Attach event listener to the full section area, not just the container
    sectionElement.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      sectionElement.removeEventListener('wheel', handleWheel, { capture: true });
      if (wheelTimer) clearTimeout(wheelTimer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [onAllColumnsVisible, isScrollEnabled]);

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
              <p className={styles.greyLineText} style={{ maxWidth: '900px',  }}>
                These are confessions, not reviews.
              </p>
              <p className={styles.greyLineText} style={{ maxWidth: '900px' }}>
                When identity hides, honesty speaks; their stories reveal the selves they never expected to meet.
              </p>
              <p className={styles.greyLineText} style={{ maxWidth: '900px' }}>
                These are confessions from the ones who dared to look within.
              </p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className={styles.scrollRevealMainContent}>
            {/* Conditional rendering for mobile vs desktop */}
            {isMobile ? (
              <div
                style={{
                  position: 'relative',
                  opacity: visibleColumns >= 2 ? 1 : 0,
                  transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(50px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.8s ease 0.2s'
                }}
              >
                <MobileVideoCarousel
                  currentVideoIndex={currentVideoIndex}
                  setCurrentVideoIndex={setCurrentVideoIndex}
                  videoStates={videoStates}
                  setVideoStates={setVideoStates}
                  videoRefs={videoRefs}
                  togglePlayPause={togglePlayPause}
                  updateProgress={updateProgress}
                  updateDuration={updateDuration}
                  seekVideo={seekVideo}
                />
              </div>
            ) : (
              <div
                className={styles.videoCarouselSection}
                style={{
                  position: 'relative',
                  opacity: visibleColumns >= 2 ? 1 : 0,
                  transform: visibleColumns >= 2 ? 'translateY(0)' : 'translateY(50px)',
                  transition: skipTransitions || !isInitialized ? 'none' : 'all 0.8s ease 0.2s'
                }}
              >
                <button
                  className={styles.carouselNavButton}
                  onClick={() => setCurrentVideoIndex(prev => ((prev - 1) % 9 + 9) % 9)}
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <div className={styles.videoCarousel}>
                  <div className={styles.videoCarouselWrapper}>
                    {Array.from({ length: 9 }, (_, index) => {
                      let offsetFromMiddle = index - currentVideoIndex;

                      if (offsetFromMiddle > 4) {
                        offsetFromMiddle -= 9;
                      } else if (offsetFromMiddle < -4) {
                        offsetFromMiddle += 9;
                      }

                      const distanceFactor = 1 - Math.abs(offsetFromMiddle / 3);
                      const translateX = offsetFromMiddle * 80;
                      const scale = Math.max(0.75, distanceFactor);
                      const opacity = Math.max(0.4, distanceFactor);
                      const zIndex = Math.abs(Math.abs(offsetFromMiddle) - 2);

                      return (
                        <div
                          key={index}
                          className={styles.videoCarouselSlide}
                          style={{
                            transform: `translateX(${translateX}%) scale(${scale})`,
                            opacity: opacity,
                            zIndex: zIndex,
                            visibility: Math.abs(offsetFromMiddle) > 0 ? 'hidden' : 'visible'
                          }}
                        >
                          <div className={styles.videoContainer}>
                            <div
                              className={styles.videoWrapper}
                              onMouseEnter={() => setVideoStates(prev => ({
                                ...prev,
                                [index]: { ...prev[index], isHovering: true }
                              }))}
                              onMouseLeave={() => setVideoStates(prev => ({
                                ...prev,
                                [index]: { ...prev[index], isHovering: false }
                              }))}
                            >
                              <video
                                ref={el => videoRefs.current[index] = el}
                                className={styles.demoVideo}
                                poster={`/api/placeholder/300/500?video=${index + 1}`}
                                onTimeUpdate={() => updateProgress(index)}
                                onLoadedMetadata={() => updateDuration(index)}
                                onClick={() => togglePlayPause(index)}
                              >
                                <source src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/reviews/audio3.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>

                              <button
                                className={styles.centerPlayBtn}
                                onClick={() => togglePlayPause(index)}
                                style={{
                                  opacity: (!videoStates[index]?.isPlaying || videoStates[index]?.isHovering) ? 1 : 0,
                                  visibility: (!videoStates[index]?.isPlaying || videoStates[index]?.isHovering) ? 'visible' : 'hidden'
                                }}
                              >
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                  {videoStates[index]?.isPlaying ? (
                                    <>
                                      <rect x="8" y="5" width="3" height="14" rx="1" fill="#00e87b" />
                                      <rect x="13" y="5" width="3" height="14" rx="1" fill="#00e87b" />
                                    </>
                                  ) : (
                                    <polygon points="9,5 9,19 19,12" fill="#00e87b" />
                                  )}
                                </svg>
                              </button>
                            </div>

                            <div className={styles.customVideoControls}>
                              <div
                                className={styles.timelineContainer}
                                onClick={(e) => seekVideo(index, e)}
                              >
                                <div
                                  className={styles.timelineProgress}
                                  style={{ width: `${videoStates[index]?.progress || 0}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }).filter(Boolean)}
                  </div>
                </div>

                <button
                  className={styles.carouselNavButton}
                  onClick={() => setCurrentVideoIndex(prev => (prev + 1) % 9)}
                  style={{
                    position: 'absolute',
                    right: '0px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

