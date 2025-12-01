"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from '../styles/slides.module.css';
import { getSections, getSubscrollSections } from '../constants/slides';
import { useScrollManager } from '../hooks/useScrollManager';
import { 
  HeroSlide, 
  ContentSlide1, 
  SubscrollSlide1, 
  ContentSlide2, 
  ContentSlide3, 
  FinalSlide 
} from '../components/slides';
import { FloatingArrow } from '../components/FloatingArrow';

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
  const renderSectionContent = (section: any, index: number) => {
    switch (section.type) {
      case "hero":
        return <HeroSlide />;
      
      case "content1":
        return <ContentSlide1 />;
      
      case "subscroll1":
        return (
          <SubscrollSlide1
            currentSection={currentSection}
            isScrollEnabled={isMobile ? false : isScrollPausedRef.current}
            onAllColumnsVisible={() => {
              setTimeout(() => {
                isScrollPausedRef.current = false;
              }, 500);
            }}
          />
        );
      
      case "content2":
        return <ContentSlide2 />;
      
      case "content3":
        return <ContentSlide3 />;
      
      case "final":
        return <FinalSlide />;
      
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
                {renderSectionContent(section, index)}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Floating Arrow */}
      <FloatingArrow
        currentSection={currentSection}
        sections={sections}
        scrollToSection={scrollToSection}
      />

      {/* Progress Indicator - Simple dots */}
      <div style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {sections.map((_, index) => (
          <div
            key={index}
            onClick={() => scrollToSection(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: currentSection === index ? '#00e87b' : '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: currentSection === index ? 'scale(1.3)' : 'scale(1)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
