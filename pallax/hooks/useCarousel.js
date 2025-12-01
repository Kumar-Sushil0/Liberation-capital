"use client";
import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Shared hook for carousel components with wheel-based navigation
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.totalItems - Total number of items in the carousel
 * @param {boolean} options.isScrollEnabled - Whether scrolling is enabled
 * @param {number} options.currentSection - Current section index (for reset logic)
 * @param {number} options.targetSection - Section index that triggers reset (e.g., 11 for slide 12)
 * @param {Function} options.onAnimateToItem - Callback when navigating to an item (receives index)
 * @param {Function} options.onAllItemsVisible - Callback when all items are viewed
 * @param {Function} options.onNextSection - Callback to move to next section
 * @param {Function} options.onPrevSection - Callback to move to previous section
 * @param {React.RefObject} options.containerRef - Ref to the carousel container element
 * @param {number} options.wheelThreshold - Minimum wheel delta to trigger navigation (default: 100)
 * @param {number} options.wheelTimeout - Timeout for wheel event debouncing in ms (default: 100)
 * 
 * @returns {Object} Carousel state and methods
 * @returns {number} activeIndex - Current active item index
 * @returns {Function} setActiveIndex - Function to set active index
 * @returns {boolean} isInitialized - Whether carousel is initialized
 * @returns {React.RefObject} isScrollingRef - Ref to track if scrolling is in progress
 */
export const useCarousel = ({
  totalItems,
  isScrollEnabled = true,
  currentSection,
  targetSection,
  onAnimateToItem,
  onAllItemsVisible,
  onNextSection,
  onPrevSection,
  containerRef,
  wheelThreshold = 100,
  wheelTimeout = 100
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);
  const activeIndexRef = useRef(0);

  // Sync ref with state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Initialize component
  useEffect(() => {
    setIsInitialized(true);
    const timer = setTimeout(() => {
      if (onAnimateToItem) {
        onAnimateToItem(0);
      } else {
        setActiveIndex(0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [onAnimateToItem]);

  // Reset when entering target section
  useEffect(() => {
    if (!isInitialized) return;

    if (currentSection === targetSection && isScrollEnabled) {
      if (onAnimateToItem) {
        onAnimateToItem(0);
      } else {
        setActiveIndex(0);
      }
    }
  }, [currentSection, isScrollEnabled, isInitialized, targetSection, onAnimateToItem]);

  // Handle wheel-based navigation
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

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
        if (Math.abs(wheelDelta) > wheelThreshold) {
          const currentIndex = activeIndexRef.current;

          if (wheelDelta > 0 && currentIndex < totalItems - 1) {
            // Scroll down (next item)
            const nextIndex = currentIndex + 1;
            if (onAnimateToItem) {
              onAnimateToItem(nextIndex);
            } else {
              setActiveIndex(nextIndex);
            }
          } else if (wheelDelta < 0 && currentIndex > 0) {
            // Scroll up (previous item)
            const prevIndex = currentIndex - 1;
            if (onAnimateToItem) {
              onAnimateToItem(prevIndex);
            } else {
              setActiveIndex(prevIndex);
            }
          } else if (wheelDelta < 0 && currentIndex === 0) {
            // At first item, trigger previous section
            setTimeout(() => {
              if (window.gotoPrevSlide) {
                window.gotoPrevSlide();
              } else if (onPrevSection) {
                onPrevSection();
              }
            }, 100);
          } else if (wheelDelta > 0 && currentIndex === totalItems - 1) {
            // At last item, trigger next section
            if (onAllItemsVisible) {
              onAllItemsVisible();
            }
            setTimeout(() => {
              if (window.gotoNextSlide) {
                window.gotoNextSlide();
              } else if (onNextSection) {
                onNextSection();
              }
            }, 100);
          }
        }
        wheelDelta = 0;
      }, wheelTimeout);
    };

    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }
    };
  }, [
    isScrollEnabled,
    onAllItemsVisible,
    onNextSection,
    onPrevSection,
    isInitialized,
    totalItems,
    onAnimateToItem,
    containerRef,
    wheelThreshold,
    wheelTimeout
  ]);

  // Update activeIndex when onAnimateToItem is called externally
  const handleAnimateToItem = useCallback((index) => {
    setActiveIndex(index);
    if (onAnimateToItem) {
      onAnimateToItem(index);
    }
  }, [onAnimateToItem]);

  return {
    activeIndex,
    setActiveIndex: handleAnimateToItem,
    isInitialized,
    isScrollingRef
  };
};

