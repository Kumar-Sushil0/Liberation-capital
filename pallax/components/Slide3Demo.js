"use client";
import React from 'react';
import styles from '../Pallax.module.css';

/**
 * Slide3Demo - Third slide component for the parallax experience
 * Displays an interactive video carousel with testimonials
 * @param {Object} props - Component props
 * @param {number} props.currentVideoIndex - Current active video index
 * @param {Function} props.setCurrentVideoIndex - Function to update video index
 * @param {Object} props.videoStates - Video states object
 * @param {Function} props.setVideoStates - Function to update video states
 * @param {React.RefObject} props.videoRefs - Ref object for video elements
 * @param {Function} props.togglePlayPause - Function to toggle video play/pause
 * @param {Function} props.updateProgress - Function to update video progress
 * @param {Function} props.updateDuration - Function to update video duration
 * @param {Function} props.seekVideo - Function to seek video to specific time
 * @returns {JSX.Element} Demo slide component
 */
const Slide3Demo = ({
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
  return (
    <div className={styles.scrollRevealMasterContainer}>
      {/* Fixed Grey Line Container */}
      <div className={styles.greyLineContainer}>
        <p className={styles.greyLineText}>
          When identity hides, honesty speaks. They came for answers—left with selves they never meant to meet.
          <br />
          Confessions, not reviews.
        </p>
      </div>

      {/* Main Content Container */}
      <div className={styles.scrollRevealMainContent}>
        <div className={styles.videoCarouselSection} style={{ position: 'relative' }}>
            {/* Left Arrow */}
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
                  // Calculate offset from current video
                  let offsetFromMiddle = index - currentVideoIndex;

                  // Handle wrapping for seamless infinite scroll
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
                          
                          {/* Center Play/Pause Button */}
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
                                // Pause icon (two rectangles) - centered and symmetrical
                                <>
                                  <rect x="8" y="5" width="3" height="14" rx="1" fill="#00e87b" />
                                  <rect x="13" y="5" width="3" height="14" rx="1" fill="#00e87b" />
                                </>
                              ) : (
                                // Play icon (triangle) - centered and symmetrical
                                <polygon points="9,5 9,19 19,12" fill="#00e87b" />
                              )}
                            </svg>
                          </button>

                          {/* Timeline positioned at bottom of video tag */}
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

            {/* Right Arrow */}
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
      </div>
    </div>
  );
};

export default Slide3Demo;
