"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from '../Pallax.module.css';

export const MobileVideoCarousel = ({ 
  currentVideoIndex, 
  setCurrentVideoIndex, 
  videoStates, 
  setVideoStates, 
  videoRefs, 
  togglePlayPause, 
  updateProgress, 
  updateDuration,
  seekVideo 
}) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  // Handle touch events for swipe navigation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left - next video
      setCurrentVideoIndex(prev => (prev + 1) % 9);
    }
    if (isRightSwipe) {
      // Swipe right - previous video
      setCurrentVideoIndex(prev => ((prev - 1) % 9 + 9) % 9);
    }
  };

  return (
    <div className={styles.mobileVideoCarousel}>
      {/* Video Display Area */}
      <div 
        className={styles.mobileVideoContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={carouselRef}
      >
        <div className={styles.mobileVideoWrapper}>
          <video
            ref={el => videoRefs.current[currentVideoIndex] = el}
            className={styles.mobileVideo}
            poster={`/api/placeholder/300/400?video=${currentVideoIndex + 1}`}
            onTimeUpdate={() => updateProgress(currentVideoIndex)}
            onLoadedMetadata={() => updateDuration(currentVideoIndex)}
            onClick={() => togglePlayPause(currentVideoIndex)}
            playsInline
            controls={false}
          >
            <source src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/reviews/audio3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause Button */}
          <button
            className={styles.mobilePlayButton}
            onClick={() => togglePlayPause(currentVideoIndex)}
            style={{
              opacity: (!videoStates[currentVideoIndex]?.isPlaying) ? 1 : 0.3,
            }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
              {videoStates[currentVideoIndex]?.isPlaying ? (
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

        {/* Progress Timeline */}
        <div 
          className={styles.mobileTimeline}
          onClick={(e) => seekVideo(currentVideoIndex, e)}
        >
          <div
            className={styles.mobileTimelineProgress}
            style={{ width: `${videoStates[currentVideoIndex]?.progress || 0}%` }}
          />
        </div>

        {/* Video Counter */}
        <div className={styles.mobileVideoCounter}>
          <span>{currentVideoIndex + 1} / 9</span>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className={styles.mobileVideoDots}>
        {Array.from({ length: 9 }, (_, index) => (
          <button
            key={index}
            className={`${styles.mobileVideoDot} ${index === currentVideoIndex ? styles.mobileVideoDotActive : ''}`}
            onClick={() => setCurrentVideoIndex(index)}
          />
        ))}
      </div>

      {/* Swipe Indicator */}
      <div className={styles.mobileSwipeIndicator}>
        <div className={styles.swipeText}>
          <span>← Swipe to navigate →</span>
        </div>
      </div>
    </div>
  );
};
