"use client";
import React, { useState, useRef, useEffect } from 'react';
import SimpleFlippingWords from '../../../components/Flipping_words/SimpleFlippingWords';
import styles from '../Pallax.module.css';

const thumbnailVideoUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/gamifytext.mp4';

/**
 * Slide1Reviews - First slide component for the parallax experience
 * Displays a video placeholder that transitions to main video when clicked
 * @param {Function} onNextSlide - Function to navigate to next slide
 * @returns {JSX.Element} Video slide component
 */
const Slide1Reviews = React.forwardRef(({ onNextSlide }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const thumbnailVideoRef = useRef(null);
  const videoRef = useRef(null);
  const flippingWordsRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowControls(true);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setShowControls(false);
      }
    }
  };

  const handleBeginTransmission = () => {
    setHasStarted(true);
    
    // Trigger flipping words animation
    setTimeout(() => {
      if (flippingWordsRef.current) {
        flippingWordsRef.current.triggerFlip();
      }
    }, 100);
    
    // Hide thumbnail and show main video, start from beginning
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0; // Always start from beginning
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
        setShowControls(false);
      }
    }, 100);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
    // Navigate to next slide after video ends
    setTimeout(() => {
      if (onNextSlide) {
        onNextSlide();
      }
    }, 500);
  };

  // Auto-play thumbnail video on mount
  useEffect(() => {
    if (thumbnailVideoRef.current && !hasStarted) {
      thumbnailVideoRef.current.play().catch(console.error);
    }
  }, [hasStarted]);

  // Listen for pause events on the main video to sync state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowControls(false);
    };

    video.addEventListener('pause', handlePause);
    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <div ref={ref} className={styles.slide1Container}>
      {/* Title - appears when button is clicked */}
      

      {/* Video Container */}
      <div className={styles.videoPlaceholder}>
        {/* Thumbnail video - shown initially, hidden when started */}
        <video
          ref={thumbnailVideoRef}
          className={styles.placeholderVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{ 
            objectFit: 'cover', 
            width: '100%', 
            height: '100%', 
            opacity: hasStarted ? 0 : 1, 
            position: 'absolute', 
            top: 0, 
            left: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            cursor: 'default'
          }}
        >
          <source src={thumbnailVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Main video - shown when started */}
        <video
          ref={videoRef}
          className={styles.placeholderVideo}
          onClick={hasStarted ? togglePlayPause : undefined}
          onEnded={handleVideoEnded}
          style={{ 
            objectFit: 'cover', 
            width: '100%', 
            height: '100%', 
            opacity: hasStarted ? 1 : 0, 
            position: 'absolute', 
            top: 0, 
            left: 0,
            transition: 'opacity 0.3s ease',
            cursor: hasStarted ? 'pointer' : 'default',
            pointerEvents: hasStarted ? 'auto' : 'none'
          }}
        >
          <source src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slide1video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Custom Play Button - shown when paused */}
        {hasStarted && showControls && (
          <div className={styles.videoPlayButton} onClick={togglePlayPause}>
            <svg 
              width="80" 
              height="80" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="#00E87B"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          </div>
        )}

        {/* Close button - shown when video has started */}
        {hasStarted && (
          <button className={styles.closeButton} onClick={() => {
            if (onNextSlide) {
              onNextSlide();
            }
          }}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M18 6L6 18M6 6l12 12" 
                stroke="#ffffff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
      
      {/* Begin/Stop Transmission Button */}
      <button 
        className={styles.beginTransmissionButton}
        onClick={hasStarted ? () => {
          if (onNextSlide) {
            onNextSlide();
          }
        } : handleBeginTransmission}
      >
        {hasStarted ? 'Stop Transmission' : 'Begin Transmission'}
      </button>
    </div>
  );
});

Slide1Reviews.displayName = 'Slide1Reviews';

export default Slide1Reviews;
