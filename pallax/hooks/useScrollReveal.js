import { useEffect, useRef } from 'react';

/**
 * Shared hook for scroll reveal sections with step-based scrolling
 * @param {Object} options
 * @param {React.RefObject} options.containerRef - Container element ref
 * @param {number} options.maxSteps - Maximum number of steps (0-indexed)
 * @param {number} options.currentSection - Current section index
 * @param {boolean} options.isScrollEnabled - Whether scroll is enabled
 * @param {function} options.onAllColumnsVisible - Callback when all columns are visible
 * @param {function} options.setVisibleColumns - State setter for visible columns
 * @param {function} options.setSkipTransitions - State setter for skip transitions
 * @param {React.RefObject} options.isScrollingRef - Ref to track if currently scrolling
 * @param {Array<number>} options.scrollPositions - Array of scroll position multipliers (0-1)
 * @param {number} options.completionStep - Step at which to call onAllColumnsVisible
 * @param {number} options.sectionIndex - Section index for auto-advance check
 * @param {number} options.wheelThreshold - Threshold for wheel delta (default: 30)
 * @param {number} options.wheelTimeout - Timeout for wheel events (default: 5)
 */
export const useScrollReveal = ({
  containerRef,
  maxSteps,
  currentSection,
  isScrollEnabled,
  onAllColumnsVisible,
  setVisibleColumns,
  setSkipTransitions,
  isScrollingRef,
  scrollPositions,
  completionStep,
  sectionIndex,
  wheelThreshold = 30,
  wheelTimeout = 5
}) => {
  const currentStepRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!isScrollEnabled) {
      return;
    }

    let wheelDelta = 0;
    let wheelTimer = null;

    const smoothScrollToStep = (step, skipAnimation = false) => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      const scrollHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;
      const maxScroll = scrollHeight - containerHeight;

      // Calculate scroll positions based on multipliers
      const calculatedPositions = scrollPositions.map(multiplier => maxScroll * multiplier);
      const targetScroll = calculatedPositions[step] || 0;

      if (skipAnimation || step === 0) {
        setSkipTransitions(true);
        container.scrollTop = targetScroll;
        setVisibleColumns(step);
        currentStepRef.current = step;
        isScrollingRef.current = false;

        setTimeout(() => {
          setSkipTransitions(false);
        }, 50);

        if (step === completionStep && onAllColumnsVisible) {
          onAllColumnsVisible();
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
          currentStepRef.current = step;

          if (step === completionStep && onAllColumnsVisible) {
            onAllColumnsVisible();
          }

          // Auto-advance to next slide when reaching max step
          if (step >= maxSteps && sectionIndex !== undefined && currentSection === sectionIndex) {
            setTimeout(() => {
              if (window.gotoNextSlide && currentSection === sectionIndex) {
                window.gotoNextSlide();
              }
            }, 300);
          }
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleWheel = (e) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      wheelDelta += e.deltaY;

      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }

      wheelTimer = setTimeout(() => {
        if (Math.abs(wheelDelta) > wheelThreshold) {
          if (wheelDelta > 0) {
            const nextStep = Math.min(currentStepRef.current + 1, maxSteps);
            smoothScrollToStep(nextStep);
          } else {
            if (currentStepRef.current === 0) {
              if (window.gotoPrevSlide) {
                window.gotoPrevSlide();
              }
            } else {
              const prevStep = Math.max(currentStepRef.current - 1, 0);
              smoothScrollToStep(prevStep);
            }
          }
        }
        wheelDelta = 0;
      }, wheelTimeout);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [
    containerRef,
    maxSteps,
    currentSection,
    isScrollEnabled,
    onAllColumnsVisible,
    setVisibleColumns,
    setSkipTransitions,
    isScrollingRef,
    scrollPositions,
    completionStep,
    sectionIndex,
    wheelThreshold,
    wheelTimeout
  ]);

  return {
    currentStep: currentStepRef.current,
    smoothScrollToStep: (step, skipAnimation) => {
      // This will be called internally by the hook
    }
  };
};

