import { useEffect, RefObject, MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { getSubscrollSections } from '../constants/slides';

interface UseScrollManagerProps {
  sectionsRef: MutableRefObject<(HTMLElement | null)[]>;
  imagesRef: MutableRefObject<(HTMLElement | null)[]>;
  outerWrappersRef: MutableRefObject<(HTMLElement | null)[]>;
  innerWrappersRef: MutableRefObject<(HTMLElement | null)[]>;
  currentIndexRef: MutableRefObject<number>;
  animatingRef: MutableRefObject<boolean>;
  wheelTimeoutRef: MutableRefObject<NodeJS.Timeout | null>;
  isScrollPausedRef: MutableRefObject<boolean>;
  subscrollTransitionRef: MutableRefObject<boolean>;
  lastSubscrollSectionRef: MutableRefObject<number>;
  gotoSectionRef: MutableRefObject<((index: number, direction: number) => void) | null>;
  setCurrentSection: (index: number) => void;
  sections: any[];
  isMobile?: boolean;
}

export const useScrollManager = ({
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
  isMobile = false
}: UseScrollManagerProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionElements = sectionsRef.current;
    const images = imagesRef.current;
    const outerWrappers = outerWrappersRef.current;
    const innerWrappers = innerWrappersRef.current;
    let currentIndex = currentIndexRef.current;
    let animating = animatingRef.current;

    // Initialize the animation
    const initAnimation = () => {
      // Set all sections hidden initially
      gsap.set(sectionElements, { autoAlpha: 0 });

      // Initialize all wrappers and images to default positions
      gsap.set(outerWrappers, { yPercent: 100, xPercent: 0 });
      gsap.set(innerWrappers, { yPercent: -100, xPercent: 0 });
      gsap.set(images, { yPercent: 0, xPercent: 0 });

      // Set first section visible and in position
      gsap.set(sectionElements[0], { autoAlpha: 1, zIndex: 1 });
      gsap.set([outerWrappers[0], innerWrappers[0]], { yPercent: 0, xPercent: 0 });
      gsap.set(images[0], { yPercent: 0, xPercent: 0 });

      // Set current index to 0
      currentIndex = 0;
      currentIndexRef.current = 0;

      const gotoSection = (index: number, direction: number) => {
        console.log('gotoSection called with:', { index, direction, currentIndex });
        // Prevent cyclic navigation - only allow valid indices
        if (index < 0 || index >= sectionElements.length) {
          console.log('Invalid index, preventing navigation:', index);
          return;
        }
        animating = true;
        animatingRef.current = true;

        // Reset wheel delta and clear timer when transitioning between sections
        wheelDelta = 0;
        if (wheelTimer) {
          clearTimeout(wheelTimer);
          wheelTimer = null;
        }

        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;

        const tl = gsap.timeline({
          defaults: { duration: 0.8, ease: "power2.inOut" },
          onComplete: () => {
            animating = false;
            animatingRef.current = false;
          }
        });

        if (currentIndex >= 0) {
          // The first time this function runs, current is -1
          gsap.set(sectionElements[currentIndex], { zIndex: 0 });

          // Vertical transition: slide up/down
          tl.to(images[currentIndex], { yPercent: -15 * dFactor })
            .set(sectionElements[currentIndex], { autoAlpha: 0 });
        }

        gsap.set(sectionElements[index], { autoAlpha: 1, zIndex: 1 });

        // Vertical transition: slide up/down

        // Reset any horizontal positioning first
        gsap.set([outerWrappers[index], innerWrappers[index]], { xPercent: 0 });
        gsap.set(images[index], { xPercent: 0 });

        tl.fromTo([outerWrappers[index], innerWrappers[index]], {
          yPercent: (i: number) => i ? -100 * dFactor : 100 * dFactor
        }, {
          yPercent: 0
        }, 0)
          .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

        currentIndex = index;
        currentIndexRef.current = index;

        // Get mobile-aware subscroll sections
        const SUBSCROLL_SECTIONS = getSubscrollSections(isMobile);

        // Check if this is a subscroll section and coming from forward direction - pause GSAP scrolling
        const isEnteringSubscroll = SUBSCROLL_SECTIONS.includes(index) && direction === 1;
        const wasInSubscroll = SUBSCROLL_SECTIONS.includes(lastSubscrollSectionRef.current);

        if (isEnteringSubscroll) {
          isScrollPausedRef.current = true;

          // Special handling for consecutive subscroll sections
          const isConsecutiveSubscroll = wasInSubscroll &&
            SUBSCROLL_SECTIONS.includes(index) &&
            Math.abs(index - lastSubscrollSectionRef.current) === 1;

          if (isConsecutiveSubscroll) {
            subscrollTransitionRef.current = true;
            // Longer delay for consecutive subscroll transitions
            setTimeout(() => {
              subscrollTransitionRef.current = false;
            }, 2000);
          }

          lastSubscrollSectionRef.current = index;
        } else {
          // Ensure scrolling is fully enabled for non-subscroll sections
          isScrollPausedRef.current = false;
          subscrollTransitionRef.current = false;
          if (!SUBSCROLL_SECTIONS.includes(index)) {
            lastSubscrollSectionRef.current = -1;
          }
        }

        setCurrentSection(index);
      };

      // Store the gotoSection function in the ref so it can be accessed by scrollToSection
      gotoSectionRef.current = gotoSection;

      // Get mobile-aware subscroll sections for global functions
      const SUBSCROLL_SECTIONS_FOR_GLOBALS = getSubscrollSections(isMobile);

      // Expose gotoSection globally for ScrollRevealSection
      (window as any).gotoNextSlide = () => {
        if (!animating && !animatingRef.current && !subscrollTransitionRef.current && SUBSCROLL_SECTIONS_FOR_GLOBALS.includes(currentIndex)) {
          // Only go to next slide if not at the last slide
          if (currentIndex < sectionElements.length - 1) {
            gotoSection(currentIndex + 1, 1);
          }
        }
      };

      (window as any).gotoPrevSlide = () => {
        if (!animating && !animatingRef.current && !subscrollTransitionRef.current && SUBSCROLL_SECTIONS_FOR_GLOBALS.includes(currentIndex)) {
          // Only go to previous slide if not at the first slide
          if (currentIndex > 0) {
            gotoSection(currentIndex - 1, -1);
          }
        }
      };

      // Expose subscroll transition state globally
      (window as any).isSubscrollTransitioning = () => subscrollTransitionRef.current;

      // Use native wheel event with delta accumulation
      let wheelDelta = 0;
      let wheelTimer: NodeJS.Timeout | null = null;

      const handleWheel = (e: WheelEvent) => {
        // If we're on a subscroll section and scrolling is paused, allow native scrolling
        if (isScrollPausedRef.current) {
          return; // Let browser handle native scroll
        }

        e.preventDefault();

        if (animating || animatingRef.current || subscrollTransitionRef.current) return;

        // Accumulate wheel delta
        wheelDelta += e.deltaY;

        // Clear existing timer
        if (wheelTimer) {
          clearTimeout(wheelTimer);
        }

        // Wait for wheel events to settle
        wheelTimer = setTimeout(() => {
          if (Math.abs(wheelDelta) > 50) { // Threshold to prevent accidental triggers
            if (wheelDelta > 0) {
              // Scroll down - go to next section
              gotoSection(currentIndex + 1, 1);
            } else {
              // Scroll up - go to previous section
              gotoSection(currentIndex - 1, -1);
            }
          }
          wheelDelta = 0; // Reset delta
        }, 10); // Very short delay to accumulate wheel events
      };

      // Touch event handling for mobile
      let touchStartY = 0;
      let touchStartX = 0;
      let touchEndY = 0;
      let touchEndX = 0;

      const handleTouchStart = (e: TouchEvent) => {
        // Check if touch started on an interactive element
        const target = e.target as HTMLElement;
        const isInteractiveElement = target.closest(`
          button, 
          [role="button"], 
          input, 
          select, 
          textarea, 
          a,
          video
        `);
        
        if (isInteractiveElement) {
          // Don't handle touch events for interactive elements
          touchStartY = -1;
          touchStartX = -1;
          return;
        }

        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      };

      const handleTouchMove = (e: TouchEvent) => {
        // If touch started on interactive element, don't handle
        if (touchStartY === -1 || touchStartX === -1) {
          return;
        }

        // If we're on a subscroll section and scrolling is paused, allow native scrolling
        if (isScrollPausedRef.current) {
          return; // Let browser handle native scroll
        }

        // Prevent pull-to-refresh on mobile
        e.preventDefault();

        touchEndY = e.touches[0].clientY;
        touchEndX = e.touches[0].clientX;
      };

      const handleTouchEnd = (e: TouchEvent) => {
        // If touch started on interactive element, don't handle
        if (touchStartY === -1 || touchStartX === -1) {
          return;
        }

        // If we're on a subscroll section and scrolling is paused, allow native scrolling
        if (isScrollPausedRef.current) {
          return; // Let browser handle native scroll
        }

        if (animating || animatingRef.current || subscrollTransitionRef.current) return;

        const deltaY = touchStartY - touchEndY;
        const deltaX = touchStartX - touchEndX;

        // Check if it's a vertical swipe (not horizontal)
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          // Minimum swipe distance threshold
          if (Math.abs(deltaY) > 50) {
            if (deltaY > 0) {
              // Swiped up - go to next section
              gotoSection(currentIndex + 1, 1);
            } else {
              // Swiped down - go to previous section
              gotoSection(currentIndex - 1, -1);
            }
          }
        }

        // Reset touch positions
        touchStartY = 0;
        touchStartX = 0;
        touchEndY = 0;
        touchEndX = 0;
      };

      document.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false }); // passive: false to allow preventDefault
      document.addEventListener('touchend', handleTouchEnd, { passive: true });

      // Cleanup function
      return () => {
        document.removeEventListener('wheel', handleWheel);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        if (wheelTimer) clearTimeout(wheelTimer);
        if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        // Clean up global functions
        if ((window as any).gotoNextSlide) {
          delete (window as any).gotoNextSlide;
        }
        if ((window as any).gotoPrevSlide) {
          delete (window as any).gotoPrevSlide;
        }
        if ((window as any).isSubscrollTransitioning) {
          delete (window as any).isSubscrollTransitioning;
        }
      };
    };

    const cleanup = initAnimation();

    return cleanup;
  }, [sectionsRef, imagesRef, outerWrappersRef, innerWrappersRef, currentIndexRef, animatingRef, wheelTimeoutRef, isScrollPausedRef, subscrollTransitionRef, lastSubscrollSectionRef, gotoSectionRef, setCurrentSection, sections, isMobile]);
};
