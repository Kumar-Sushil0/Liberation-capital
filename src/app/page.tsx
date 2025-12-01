"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from '../styles/slides.module.css';
import { getSections } from '../constants/slides';
import { useScrollManager } from '../hooks/useScrollManager';
import { 
  HeroSlide, 
  ContentSlide1, 
  SubscrollSlide1,
  Slide03,
  Slide04,
  Slide05,
  Slide08,
  Slide12,
  Slide13,
  Slide14,
  Slide15,
  Slide16,
  Slide17,
  Slide18,
  Slide19,
  Slide20,
  Slide23,
  Slide26,
  PoemSlide,
  OperatingSystemSlide
} from '../components/slides';
import { ProgressIndicatorStandalone } from '../components/ProgressIndicatorStandalone';
import { FixedHeader } from '../components/fixedheader/FixedHeader';
import { VibeCheckButton } from '../components/VibecheckButton/VibeCheckButton';

export default function Home() {
  // Refs for sections and wrappers
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const imagesRef = useRef<(HTMLElement | null)[]>([]);
  const outerWrappersRef = useRef<(HTMLElement | null)[]>([]);
  const innerWrappersRef = useRef<(HTMLElement | null)[]>([]);
  
  // Refs for state management
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollPausedRef = useRef(false);
  const subscrollTransitionRef = useRef(false);
  const lastSubscrollSectionRef = useRef(-1);
  const gotoSectionRef = useRef<((index: number, direction: number) => void) | null>(null);
  
  // State
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Get sections array based on mobile/desktop
  const sections = getSections(isMobile);

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

  // Prevent pull-to-refresh and hide navbar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const navbar = document.querySelector('nav');
    if (navbar) {
      (navbar as HTMLElement).style.display = 'none';
    }

    // Prevent pull-to-refresh on mobile
    const originalOverscrollBehavior = document.body.style.overscrollBehavior;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overscrollBehavior = 'none';
    document.body.style.touchAction = 'pan-y';

    // Show navbar and restore styles when component unmounts
    return () => {
      if (navbar) {
        (navbar as HTMLElement).style.display = '';
      }
      document.body.style.overscrollBehavior = originalOverscrollBehavior;
      document.body.style.touchAction = originalTouchAction;
    };
  }, []);

  // Scroll to specific section function
  const scrollToSection = useCallback((sectionIndex: number) => {
    if (typeof window === 'undefined') return;

    const currentIndex = currentIndexRef.current;
    const direction = sectionIndex > currentIndex ? 1 : -1;

    console.log('scrollToSection called:', { sectionIndex, currentIndex, direction });

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
    outerWrappersRef,
    innerWrappersRef,
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
    let timer: NodeJS.Timeout | null = null;
    const checkReady = () => {
      if (gotoSectionRef.current) {
        setIsPageLoading(false);
        if (timer) clearInterval(timer);
      }
    };
    timer = setInterval(checkReady, 50);
    return () => { if (timer) clearInterval(timer); };
  }, []);

  // Render section content based on type
  const renderSectionContent = (section: any) => {
    switch (section.type) {
      case "hero":
        return <HeroSlide />;
      case "content1":
        return <ContentSlide1 />;
      case "subscroll1":
        return (
          <SubscrollSlide1
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "slide03":
        return (
          <Slide03
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "slide04":
        return (
          <Slide04
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "slide05":
        return (
          <Slide05
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "slide08":
        return (
          <Slide08
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "slide12":
        return (
          <Slide12
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "slide13":
        return <Slide13 />;
      case "slide14":
        return <Slide14 />;
      case "slide15":
        return <Slide15 />;
      case "slide16":
        return <Slide16 />;
      case "slide17":
        return <Slide17 />;
      case "slide18":
        return <Slide18 />;
      case "slide19":
        return (
          <Slide19
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "slide20":
        return (
          <Slide20
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "slide23":
        return (
          <Slide23
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "slide26":
        return (
          <Slide26
            currentSection={currentSection}
            isScrollEnabled={!isMobile && isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      case "poem":
        return <PoemSlide />;
      case "operatingSystem":
        return <OperatingSystemSlide />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {isPageLoading && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 9999, 
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.5rem'
        }}>
          Loading...
        </div>
      )}

      {/* Fixed Header */}
      <FixedHeader currentSection={currentSection} isMuted={isMuted} />

      {sections.map((section, index) => (
        <section
          key={index}
          ref={el => { sectionsRef.current[index] = el; }}
          className={`${styles.section} ${styles[section.className]}`}
        >
          <div
            ref={el => { outerWrappersRef.current[index] = el; }}
            className={styles.outer}
          >
            <div
              ref={el => { innerWrappersRef.current[index] = el; }}
              className={styles.inner}
            >
              <div
                ref={el => { imagesRef.current[index] = el; }}
                className={styles.bg}
              >
                {renderSectionContent(section)}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Progress Indicator */}
      <ProgressIndicatorStandalone
        totalSections={sections.length}
        currentSection={currentSection}
        isMuted={isMuted}
        showMuteButton={true}
        onSectionClick={scrollToSection}
      />

      {/* Vibe Check Button */}
      <VibeCheckButton
        currentSection={currentSection}
        inline={false}
        sections={sections as any}
        onClick={() => window.open('https://app.lifeidesign.games', '_blank')}
      />
    </div>
  );
}
