"use client";
import React, { useState, useEffect } from "react";
import styles from "./Flippingwords.module.css";

interface SlideFlippingWordsProps {
  currentWord?: string;
  size?: 'small' | 'medium' | 'large' | number; // Accept number for pixel values
  fontSize?: number;
  letterWidth?: number;
  letterHeight?: number;
  mute?: boolean;
}

const defaultWord = "DISRUPTION";

const SlideFlippingWords: React.FC<SlideFlippingWordsProps> = ({ 
  currentWord = defaultWord, 
  size = 'large',
  fontSize,
  letterWidth,
  letterHeight,
  mute = false
}) => {
  const [displayedWord, setDisplayedWord] = useState(currentWord);
  const [flippingLetters, setFlippingLetters] = useState<boolean[]>(
    new Array(10).fill(false)
  );
  const [flipAudio, setFlipAudio] = useState<HTMLAudioElement | null>(null);

  // Calculate sizes based on props
  const getSizeValues = () => {
    if (fontSize && letterWidth && letterHeight) {
      return { fontSize, letterWidth, letterHeight };
    }
    
    // If size is a number, use it as fontSize and calculate proportional dimensions
    if (typeof size === 'number') {
      const pixelSize = size;
      return { 
        fontSize: pixelSize, 
        letterWidth: Math.round(pixelSize * 0.6), // 60% of font size
        letterHeight: Math.round(pixelSize * 1.2) // 120% of font size
      };
    }
    
    // Fallback to predefined sizes
    switch (size) {
      case 'small':
        return { fontSize: 24, letterWidth: 20, letterHeight: 40 };
      case 'medium':
        return { fontSize: 60, letterWidth: 40, letterHeight: 80 };
      case 'large':
      default:
        return { fontSize: 104, letterWidth: 60, letterHeight: 120 };
    }
  };

  const { fontSize: calculatedFontSize, letterWidth: calculatedWidth, letterHeight: calculatedHeight } = getSizeValues();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Preload audio
      const audio = new Audio("/sound/flip.mp3");
      audio.preload = "auto";
      setFlipAudio(audio);
    }
  }, []);

  // Trigger animation when currentWord changes
  useEffect(() => {
    if (currentWord !== displayedWord) {
      // Reset all flipping states
      setFlippingLetters(new Array(currentWord.length).fill(false));
      
      // Use performance.now() for precise timing
      const startTime = performance.now();
      const letterDelay = 100; // 100ms between each letter
      
      // Schedule audio and animation for each letter
      const audioTimeouts: NodeJS.Timeout[] = [];
      const animationTimeouts: NodeJS.Timeout[] = [];
      
      currentWord.split("").forEach((char, index) => {
        const delay = index * letterDelay;
        const isSpace = !char || char.trim() === '';
        
        // Schedule audio only for non-space characters
        if (!isSpace && !mute) {
          const audioTimeout = setTimeout(() => {
            try {
              const audioClone = new Audio("/sound/flip.mp3");
              audioClone.playbackRate = 2.5;
              audioClone.volume = 1.0;
              audioClone.play().catch(err => {
                console.debug("Audio play failed:", err);
              });
            } catch (error) {
              console.debug("Audio creation failed:", error);
            }
          }, delay);
          audioTimeouts.push(audioTimeout);
        }
        
        // Schedule animation for all characters (including spaces for visual consistency)
        // Use requestAnimationFrame for frame-perfect timing
        const animationTimeout = setTimeout(() => {
          setFlippingLetters((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, delay);
        animationTimeouts.push(animationTimeout);
      });

      // Update the displayed word after all animations complete
      const totalDuration = (currentWord.length - 1) * letterDelay + 500; // 500ms for animation duration
      setTimeout(() => {
        setDisplayedWord(currentWord);
        setFlippingLetters(new Array(currentWord.length).fill(false));
      }, totalDuration);

      return () => {
        audioTimeouts.forEach((timeout) => clearTimeout(timeout));
        animationTimeouts.forEach((timeout) => clearTimeout(timeout));
      };
    }
  }, [currentWord, displayedWord, mute]);

  return (
    <div 
      className={styles.wordFlipper}
      style={{
        '--letter-font-size': `${calculatedFontSize}px`,
        '--letter-width': `${calculatedWidth}px`,
        '--letter-height': `${calculatedHeight}px`,
        '--letter-half-height': `${calculatedHeight / 2}px`,
        '--letter-line-height': `${calculatedHeight}px`,
        '--letter-margin-top': `${-calculatedHeight / 2}px`,
      } as React.CSSProperties}
    >
      {displayedWord.split("").map((letter, index) => (
        <div key={index} className={styles.letterContainer}>
          <div
            className={`${styles.letter} ${
              flippingLetters[index] ? styles.flipping : ""
            }`}
          >
            <div className={styles.letterTop}>
              <span>{currentWord[index] || letter}</span>
            </div>
            <div className={styles.letterBottom}>
              <span>{letter}</span>
            </div>
            <div className={styles.letterFlip}>
              <div className={styles.letterFlipTop}>
                <span>{letter}</span>
              </div>
            </div>
            <div className={styles.letterFlip2}>
              <div className={styles.letterFlipBottom}>
                <span>{currentWord[index] || letter}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideFlippingWords;
