"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Pallax.module.css';
import { Slide1Reviews, Slide1New, Slide2Hero, Slide2HeroNew, Slide15HeroFlippedNew, Slide3Demo, Slide4MobileFiction, Slide4MobileDelusion, Slide4MobileObsession, Slide5MobileSpeculate, Slide5MobileEvaluate, Slide5MobileIntegrate, Slide7NewMobileMainQuest, Slide7NewMobileSideQuest, Slide8MobileDesigner, Slide8MobileDesign, Slide9MobileGain, Slide9MobileLose, Slide6HeroFlipped, Slide11HeroFinal, Slide16DDIntroduction, Slide19FAQ, Slide20GamePass, Slide21MobileBrochure, Slide21MobileGetInTouch, Slide21Contact } from './components';
import SimpleFlippingWords from '../../components/Flipping_words/SimpleFlippingWords';

// Import extracted constants and hooks
import { getSections, slideWords, dummyTexts, memberData } from './constants';
import { useVideoControls } from './hooks/useVideoControls';
import { useScrollManager } from './hooks/useScrollManager';

// Import extracted UI components
import { FloatingArrow, VibeCheckButton, ProgressIndicator, ProgressIndicatorGrid, FixedHeader } from './components/UI';

// Import extracted ScrollReveal components
import { ScrollRevealSectionSlide3, ScrollRevealSectionSlide4, ScrollRevealSectionSlide4New, ScrollRevealSectionSlide5, ScrollRevealSectionSlide7, ScrollRevealSectionSlide7New, ScrollRevealSectionSlide8, ScrollRevealSectionSlide9, ScrollRevealSectionSlide10, ScrollRevealSectionSlideBlank, ScrollRevealSectionSlide13New, ScrollRevealSectionSlide14New } from './components/ScrollReveal';

// Import extracted Carousel components
import { Slide12DesignModesCarousel, Slide13DesignModesCarousel, Slide15GameModesCarousel, GameEcosystemCarousel, Slide17OverlappingCarousel, Slide18OverlappingCarousel, Slide18MobileOverlappingCarousel } from './components/Carousel';
import Loading from '../../components/Loading/Loading';

const PallaxPage = () => {
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const headingsRef = useRef([]);
  const outerWrappersRef = useRef([]);
  const innerWrappersRef = useRef([]);
  const splitHeadingsRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const wheelTimeoutRef = useRef(null);
  const isScrollPausedRef = useRef(false);
  const scrollContainerRef = useRef(null);
  const subscrollTransitionRef = useRef(false);
  const lastSubscrollSectionRef = useRef(-1);
  const [selectedMember, setSelectedMember] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);
  const [isHoveringCube, setIsHoveringCube] = useState(false);
  const [selectedMode, setSelectedMode] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const progressTimeoutRef = useRef(null);
  const gotoSectionRef = useRef(null);
  const slide12CarouselRef = useRef(null);
  const slide13CarouselRef = useRef(null);
  const slide12FlippingWordsRefs = useRef([null, null, null, null]);
  const [isMobile, setIsMobile] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const slide1ReviewsRef = useRef(null);
  const slide1NewRef = useRef(null);

  // Get sections array based on mobile/desktop
  const sections = getSections(isMobile);

  // Pause videos when leaving video slides
  useEffect(() => {
    // Pause Slide1Reviews main video if we're not on section 0
    if (currentSection !== 0 && slide1ReviewsRef.current) {
      const videoElements = slide1ReviewsRef.current.querySelectorAll('video');
      // The main video is the second video element (index 1)
      if (videoElements.length > 1 && videoElements[1] && !videoElements[1].paused) {
        videoElements[1].pause();
      }
    }

    // Pause Slide1New video if we're not on section 1
    if (currentSection !== 1 && slide1NewRef.current) {
      const videoElement = slide1NewRef.current.querySelector('video');
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    }
  }, [currentSection]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent)
        || (window.innerWidth <= 768);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use extracted video controls hook
  const {
    videoStates,
    setVideoStates,
    videoRefs,
    togglePlayPause,
    updateProgress,
    updateDuration,
    seekVideo,
    formatTime
  } = useVideoControls();

  // Note: designModes was replaced with blank slide, so flip animation logic removed
  // Trigger flip animation for slide 12 buttons when selectedMode changes
  // useEffect(() => {
  //   if (currentSection === 15) { // Section 15 is blank now
  //     const activeRef = slide12FlippingWordsRefs.current[selectedMode];
  //     if (activeRef && activeRef.triggerFlip) {
  //       // Small delay to ensure the color change happens first
  //       setTimeout(() => {
  //         activeRef.triggerFlip();
  //       }, 50);
  //     }
  //   }
  // }, [selectedMode, currentSection]);

  // Hide navbar on this page and prevent pull-to-refresh
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }

    // Prevent pull-to-refresh on mobile
    const originalOverscrollBehavior = document.body.style.overscrollBehavior;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overscrollBehavior = 'none';
    document.body.style.touchAction = 'pan-y';

    // Show navbar and restore styles when component unmounts
    return () => {
      if (navbar) {
        navbar.style.display = '';
      }
      document.body.style.overscrollBehavior = originalOverscrollBehavior;
      document.body.style.touchAction = originalTouchAction;
    };
  }, []);

  // Cleanup progress timeout on unmount
  useEffect(() => {
    return () => {
      if (progressTimeoutRef.current) {
        clearTimeout(progressTimeoutRef.current);
      }
    };
  }, []);

  // Toggle mute function
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFAQ = useCallback((index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  }, [expandedFAQ]);

  // Scroll to specific section function
  const scrollToSection = useCallback((sectionIndex) => {
    if (typeof window === 'undefined') return;

    const currentIndex = currentIndexRef.current;
    const direction = sectionIndex > currentIndex ? 1 : -1;

    console.log('scrollToSection called:', { sectionIndex, currentIndex, direction });
    console.log('gotoSectionRef.current:', gotoSectionRef.current);

    // Update current section
    setCurrentSection(sectionIndex);

    // Use the gotoSection function from the ref
    if (gotoSectionRef.current) {
      console.log('Calling gotoSection with:', sectionIndex, direction);
      gotoSectionRef.current(sectionIndex, direction);
    } else {
      console.error('gotoSection function not available');
    }
  }, []);

  // Use scroll manager hook
  useScrollManager({
    sectionsRef,
    imagesRef,
    headingsRef,
    outerWrappersRef,
    innerWrappersRef,
    splitHeadingsRef,
    currentIndexRef,
    animatingRef,
    wheelTimeoutRef,
    isScrollPausedRef,
    subscrollTransitionRef,
    lastSubscrollSectionRef,
    gotoSectionRef,
    setCurrentSection,
    sections,
    isMobile
  });

  // Hide loader when scroll manager exposes gotoSection
  useEffect(() => {
    let timer = null;
    const checkReady = () => {
      if (gotoSectionRef.current) {
        setIsPageLoading(false);
        if (timer) clearInterval(timer);
      }
    };
    timer = setInterval(checkReady, 50);
    return () => { if (timer) clearInterval(timer); };
  }, []);

  const renderSectionContent = (section, index) => {
    switch (section.type) {
      case "hero":
        return (
          <Slide2Hero
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );

      case "reviews":
        return <Slide1Reviews ref={slide1ReviewsRef} onNextSlide={() => scrollToSection(currentSection + 1)} />;

      case "newSlide":
        return <Slide1New ref={slide1NewRef} onNextSlide={() => scrollToSection(currentSection + 1)} />;

      case "gameGang2":
        if (isMobile) {
          return <Slide18MobileOverlappingCarousel />;
        }
        return (
          <Slide18OverlappingCarousel
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            onAllCardsVisible={() => {
              // Resume GSAP scrolling when all cards are viewed
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
            onNextSection={() => {
              // Move to next section
              const currentIndex = currentIndexRef.current;
              if (gotoSectionRef.current && currentIndex < sections.length - 1) {
                gotoSectionRef.current(currentIndex + 1, 1);
              }
            }}
            onPrevSection={() => {
              // Move to previous section
              const currentIndex = currentIndexRef.current;
              if (gotoSectionRef.current && currentIndex > 0) {
                gotoSectionRef.current(currentIndex - 1, -1);
              }
            }}
          />
        );

      case "demo":
        return (
          <ScrollRevealSectionSlide3
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all content is visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
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
        );

      case "features":
        // Hide desktop Slide4 on mobile - replaced with 3 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlide4
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "fictionMobile":
        return <Slide4MobileFiction />;

      case "delusionMobile":
        return <Slide4MobileDelusion />;

      case "obsessionMobile":
        return <Slide4MobileObsession />;

      case "cta":
        // Hide desktop Slide5 on mobile - replaced with 3 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlide5
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "cta2":
        // Hide desktop Slide7 on mobile - replaced with 3 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlide7
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "heroNew":
        return (
          <Slide2HeroNew
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );

      case "speculateMobile":
        return <Slide5MobileSpeculate />;

      case "evaluateMobile":
        return <Slide5MobileEvaluate />;

      case "integrateMobile":
        return <Slide5MobileIntegrate />;

      case "heroFlipped":
        return (
          <Slide6HeroFlipped
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );

      case "mainQuestMobile":
        return <Slide7NewMobileMainQuest />;

      case "sideQuestMobile":
        return <Slide7NewMobileSideQuest />;

      case "powersNew":
        // Hide desktop Slide7New on mobile - replaced with 3 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlide7New
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "powers":
        // Hide desktop Slide8 on mobile - replaced with 2 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlide8
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "designerMobile":
        return <Slide8MobileDesigner />;

      case "designMobile":
        return <Slide8MobileDesign />;

      case "gains":
        // Hide desktop Slide9 on mobile - replaced with 2 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlide9
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "gainMobile":
        return <Slide9MobileGain />;

      case "loseMobile":
        return <Slide9MobileLose />;

      case "gameFlow":
        return (
          <ScrollRevealSectionSlide10
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "heroFinal":
        return (
          <Slide11HeroFinal
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );

      case "featuresNew":
        // Hide desktop Slide4New on mobile - replaced with 3 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlide4New
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "blank":
        // Hide desktop SlideBlank on mobile - replaced with 3 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlideBlank
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "slide13New":
        // Hide desktop Slide13New on mobile - replaced with 3 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlide13New
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "slide14New":
        // Hide desktop Slide14New on mobile - replaced with 3 separate mobile slides
        if (isMobile) {
          return null;
        }
        return (
          <ScrollRevealSectionSlide14New
            currentSection={currentSection}
            isScrollEnabled={isScrollPausedRef.current}
            isTransitioning={subscrollTransitionRef.current}
            onAllColumnsVisible={() => {
              // Resume GSAP scrolling when all columns are visible
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500); // Small delay to ensure smooth transition
            }}
          />
        );

      case "heroFlippedNew":
        return (
          <Slide15HeroFlippedNew
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );

      case "gameModes":
        return (
          <Slide15GameModesCarousel
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllSlidesVisible={() => {
              // Resume GSAP scrolling when all slides are viewed
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
            onNextSection={() => {
              // Move to next section
              const currentIndex = currentIndexRef.current;
              if (gotoSectionRef.current && currentIndex < sections.length - 1) {
                gotoSectionRef.current(currentIndex + 1, 1);
              }
            }}
            onPrevSection={() => {
              // Move to previous section
              const currentIndex = currentIndexRef.current;
              if (gotoSectionRef.current && currentIndex > 0) {
                gotoSectionRef.current(currentIndex - 1, -1);
              }
            }}
          />
        );

      case "gameEcosystem":
        return (
          <GameEcosystemCarousel
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllSlidesVisible={() => {
              // Resume GSAP scrolling when all slides are viewed
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
            onNextSection={() => {
              // Move to next section
              const currentIndex = currentIndexRef.current;
              if (gotoSectionRef.current && currentIndex < sections.length - 1) {
                gotoSectionRef.current(currentIndex + 1, 1);
              }
            }}
            onPrevSection={() => {
              // Move to previous section
              const currentIndex = currentIndexRef.current;
              if (gotoSectionRef.current && currentIndex > 0) {
                gotoSectionRef.current(currentIndex - 1, -1);
              }
            }}
          />
        );

      case "ddIntroduction":
        return <Slide16DDIntroduction />;

      case "gameGang2":
        return (
          <Slide18OverlappingCarousel
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllCardsVisible={() => {
              // Resume GSAP scrolling when all cards are viewed
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
            onNextSection={() => {
              // Move to next section
              const currentIndex = currentIndexRef.current;
              if (gotoSectionRef.current && currentIndex < sections.length - 1) {
                gotoSectionRef.current(currentIndex + 1, 1);
              }
            }}
            onPrevSection={() => {
              // Move to previous section
              const currentIndex = currentIndexRef.current;
              if (gotoSectionRef.current && currentIndex > 0) {
                gotoSectionRef.current(currentIndex - 1, -1);
              }
            }}
          />
        );

      case "faq":
        return (
          <Slide19FAQ
            expandedFAQ={expandedFAQ}
            toggleFAQ={toggleFAQ}
          />
        );

      case "gamePass":
        return <Slide20GamePass currentSection={currentSection} />;

      case "contact":
        // Hide desktop Slide21Contact on mobile - replaced with 2 separate mobile slides
        if (isMobile) {
          return null;
        }
        return <Slide21Contact />;

      case "brochureMobile":
        return <Slide21MobileBrochure />;

      case "getInTouchMobile":
        return <Slide21MobileGetInTouch />;

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {isPageLoading && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000' }}>
          <Loading StateName="Initializing..." />
        </div>
      )}
      {/* Fixed Header Component */}
      <FixedHeader
        currentSection={currentSection}
        isMuted={isMuted}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        isHoveringCube={isHoveringCube}
        setIsHoveringCube={setIsHoveringCube}
        scrollToSection={scrollToSection}
      />

      {sections.map((section, index) => (
        <section
          key={index}
          ref={el => sectionsRef.current[index] = el}
          className={`${styles.section} ${styles[section.className]}`}
        >
          <div
            ref={el => outerWrappersRef.current[index] = el}
            className={styles.outer}
          >
            <div
              ref={el => innerWrappersRef.current[index] = el}
              className={styles.inner}
            >
              <div
                ref={el => imagesRef.current[index] = el}
                className={styles.bg}
              >
                {renderSectionContent(section, index)}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Progress Indicator Grid (2x2 grid layout) */}
      {!isMobile && (
        <ProgressIndicatorGrid
          currentSection={currentSection}
          sections={sections}
          scrollToSection={scrollToSection}
          isMuted={isMuted}
          toggleMute={toggleMute}
          isHoveringProgress={isHoveringProgress}
          setIsHoveringProgress={setIsHoveringProgress}
          progressTimeoutRef={progressTimeoutRef}
          isMobile={isMobile}
        />
      )}

      {/* Floating Arrow */}
      <FloatingArrow
        currentSection={currentSection}
        sections={sections}
        scrollToSection={scrollToSection}
      />

      {/* Vibe Check Button */}
      <VibeCheckButton currentSection={currentSection} sections={sections} />
    </div>
  );
};

export default PallaxPage;
