"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./SimpleFlippingWords.module.css";

interface SimpleFlippingWordsProps {
  currentWord?: string;
  fontSize?: string;
  animationTrigger?: number;
  backgroundColor?: string;
  textColor?: string;
  onFlipComplete?: () => void;
  mute?: boolean;
  eyePosition?: 'up' | 'down';
}

export interface SimpleFlippingWordsRef {
  triggerFlip: () => void;
}

const defaultWord = "DISRUPTION";

// Function to get character-specific width
const getCharacterWidth = (letter: string, index: number, word: string): string => {
  const upperWord = word.toUpperCase();
  // Special case: if it's the 5th character (index 4) in "VIBEIDESIGN" and it's an "I", make it wider
  if (upperWord === "VIBEIDESIGN" && index === 4 && letter.toUpperCase() === 'I') {
    return '0.7em';
  }
  // Special case: if it's the 5th character (index 4) in "LIFEIDESIGN" and it's an "I", make it wider
  if (upperWord === "LIFEIDESIGN" && index === 4 && letter.toUpperCase() === 'I') {
    return '0.7em';
  }
  // Special case: if it's the 5th character (index 4) in "LIFE!DESIGN" and it's an "I", make it wider
  if (upperWord === "LIFE!DESIGN" && index === 4 && letter.toUpperCase() === 'I') {
    return '0.7em';
  }
  // Special case: if it's the 5th character (index 4) in "COREIDESIGN" and it's an "I", make it wider
  if (upperWord === "COREIDESIGN" && index === 4 && letter.toUpperCase() === 'I') {
    return '0.7em';
  }
  // Special case: if it's the 5th character (index 4) in "GAMEIDESIGN" and it's an "I", make it wider
  if (upperWord === "GAMEIDESIGN" && index === 4 && letter.toUpperCase() === 'I') {
    return '0.7em';
  }
  // Special case: if it's the 5th character (index 4) in "PLAYIDESIGN" and it's an "I", make it wider
  if (upperWord === "PLAYIDESIGN" && index === 4 && letter.toUpperCase() === 'I') {
    return '0.7em';
  }
  // Special case: if it's the 6th character (index 5) in "STORYIDESIGN" and it's an "I", make it wider
  if (upperWord === "STORYIDESIGN" && index === 5 && letter.toUpperCase() === 'I') {
    return '0.7em';
  }
  // Special case: if it's the 5th character (index 4) in "TIMEIDESIGN" and it's an "I", make it wider
  if (upperWord === "TIMEIDESIGN" && index === 4 && letter.toUpperCase() === 'I') {
    return '0.7em';
  }
  const widths: { [key: string]: string } = {
    'I': '0.22em',
    "'": '0.22em',  // Apostrophe - same width as I
    ' ': '0.4em',  // Space character
    'J': '0.4em', 
    'L': '0.43em',
    'T': '0.43em',
    'F': '0.4em',
    'W': '0.65em',
    'M': '0.6em',
    'N': '0.43em',
    'O': '0.43em',
    'Q': '0.43em',
    'R': '0.43em',
    'S': '0.43em',
    'U': '0.43em',
    'V': '0.43em',
    'X': '0.43em',
    'Y': '0.43em',
    'Z': '0.43em',
    'A': '0.43em',
    'B': '0.43em',
    'C': '0.43em',
    'D': '0.43em',
    'E': '0.4em',
    'G': '0.43em',
    'H': '0.43em',
    'K': '0.43em',
    'P': '0.43em',
    // Numbers - same width as capital D
    '0': '0.43em',
    '1': '0.43em',
    '2': '0.43em',
    '3': '0.43em',
    '4': '0.43em',
    '5': '0.43em',
    '6': '0.43em',
    '7': '0.43em',
    '8': '0.43em',
    '9': '0.43em',
    '%': '0.6em',  // Same width as capital M
    '∞': '0.8em'
  };
  return widths[letter.toUpperCase()] || '0.8em';
};

const SimpleFlippingWords = React.forwardRef<SimpleFlippingWordsRef, SimpleFlippingWordsProps>(({ 
  currentWord = defaultWord, 
  fontSize = "104px", 
  animationTrigger,
  backgroundColor = "#000000",
  textColor = "#ffffff",
  onFlipComplete,
  mute = false,
  eyePosition = 'up'
}, ref) => {
  const [displayedWord, setDisplayedWord] = useState(currentWord);
  const [flippingLetters, setFlippingLetters] = useState<boolean[]>(
    new Array(10).fill(false)
  );
  const [flipAudio, setFlipAudio] = useState<HTMLAudioElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const animationTimeoutsRef = useRef<(NodeJS.Timeout | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFlipAudio(new Audio("/sound/flip.mp3"));
    }
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      animationTimeoutsRef.current.forEach(timeout => timeout && clearTimeout(timeout));
    };
  }, []);

  // Expose manual trigger function via ref
  React.useImperativeHandle(ref, () => ({
    triggerFlip: () => {
      // Prevent multiple simultaneous animations
      if (isAnimating) return;
      
      // Allow re-triggering by resetting hasAnimated state
      setHasAnimated(true);
      triggerAnimation();
    }
  }));

  const triggerAnimation = () => {
    // Clear any existing timeouts
    animationTimeoutsRef.current.forEach(timeout => timeout && clearTimeout(timeout));
    animationTimeoutsRef.current = [];
    
    // Set animation state
    setIsAnimating(true);
    setFlippingLetters(new Array(currentWord.length).fill(false));
    
    const upperCurrentWord = currentWord.toUpperCase();
    const letterDelay = 100; // 100ms between each letter
    const audioTimeouts: NodeJS.Timeout[] = [];
    const animationTimeouts: NodeJS.Timeout[] = [];
    
    currentWord.split("").forEach((char, index) => {
      // Check if this letter should be animated (skip special cases)
      let shouldAnimate = true;
      if (upperCurrentWord === "VIBEIDESIGN" && index === 4) shouldAnimate = false;
      else if (upperCurrentWord === "LIFEIDESIGN" && index === 4) shouldAnimate = false;
      else if (upperCurrentWord === "LIFE!DESIGN" && index === 4) shouldAnimate = false;
      else if (upperCurrentWord === "COREIDESIGN" && index === 4) shouldAnimate = false;
      else if (upperCurrentWord === "GAMEIDESIGN" && index === 4) shouldAnimate = false;
      else if (upperCurrentWord === "PLAYIDESIGN" && index === 4) shouldAnimate = false;
      else if (upperCurrentWord === "STORYIDESIGN" && index === 5) shouldAnimate = false;
      else if (upperCurrentWord === "TIMEIDESIGN" && index === 4) shouldAnimate = false;
      
      const delay = index * letterDelay;
      const isSpace = !char || char.trim() === '';
      
      // Schedule audio only for non-space characters that should animate
      if (shouldAnimate && !isSpace && !mute) {
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
      
      // Schedule animation for letters that should animate
      if (shouldAnimate) {
        const animationTimeout = setTimeout(() => {
          setFlippingLetters((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, delay);
        animationTimeouts.push(animationTimeout);
      }
    });

    // Store timeouts for cleanup
    animationTimeoutsRef.current = [...audioTimeouts, ...animationTimeouts];

    // Final cleanup timeout
    const totalDuration = (currentWord.length - 1) * letterDelay + 500; // 500ms for animation duration
    const finalTimeout = setTimeout(() => {
      setFlippingLetters(new Array(currentWord.length).fill(false));
      setIsAnimating(false);
      // Call the completion callback
      if (onFlipComplete) {
        onFlipComplete();
      }
    }, totalDuration);
    
    animationTimeoutsRef.current.push(finalTimeout);
  };

  // Only trigger animation on word change if it hasn't animated yet
  useEffect(() => {
    if (currentWord !== displayedWord && !hasAnimated) {
      setDisplayedWord(currentWord);
    }
  }, [currentWord, displayedWord, hasAnimated]);

  // Trigger animation when animationTrigger changes (only if not already animated)
  useEffect(() => {
    if (animationTrigger && !hasAnimated) {
      setHasAnimated(true);
      triggerAnimation();
    }
  }, [animationTrigger, hasAnimated]);


  return (
    <div 
      ref={componentRef}
      className={styles.simpleWordFlipper}
      style={{
        '--font-size': fontSize,
        '--bg-color': backgroundColor
      } as React.CSSProperties}
    >
      {displayedWord.split("").map((letter, index) => (
        <div key={index} className={styles.simpleLetterContainer}>
          <div
            className={`${styles.simpleLetter} ${
              flippingLetters[index] ? styles.simpleFlipping : ""
            } ${
              (() => {
                const upperDisplayedWord = displayedWord.toUpperCase();
                return (upperDisplayedWord === "VIBEIDESIGN" || upperDisplayedWord === "LIFEIDESIGN" || upperDisplayedWord === "LIFE!DESIGN" || upperDisplayedWord === "COREIDESIGN" || upperDisplayedWord === "GAMEIDESIGN" || upperDisplayedWord === "PLAYIDESIGN" || upperDisplayedWord === "TIMEIDESIGN") && index === 4 ? styles.simpleSolidLetter : "";
              })()
            } ${
              (() => {
                const upperDisplayedWord = displayedWord.toUpperCase();
                return upperDisplayedWord === "STORYIDESIGN" && index === 5 ? styles.simpleSolidLetter : "";
              })()
            }`}
            style={{
              width: getCharacterWidth(letter, index, displayedWord),
              fontSize: fontSize,
              height: `calc(${fontSize} * 1.15)`,
              color: textColor
            }}
          >
            <div className={styles.simpleLetterTop}>
              <span>{currentWord[index] || letter}</span>
            </div>
            <div className={styles.simpleLetterBottom}>
              <span>{letter}</span>
            </div>
            <div className={styles.simpleLetterFlip}>
              <div className={styles.simpleLetterFlipTop}>
                <span>{letter}</span>
              </div>
            </div>
            <div className={styles.simpleLetterFlip2}>
              <div className={styles.simpleLetterFlipBottom}>
                <span>{currentWord[index] || letter}</span>
              </div>
            </div>
            
            {/* Eye positioned directly on the middle I letter */}
            {(() => {
              const upperDisplayedWord = displayedWord.toUpperCase();
              return (((upperDisplayedWord === "VIBEIDESIGN" || upperDisplayedWord === "LIFEIDESIGN" || upperDisplayedWord === "LIFE!DESIGN" || upperDisplayedWord === "COREIDESIGN" || upperDisplayedWord === "GAMEIDESIGN" || upperDisplayedWord === "PLAYIDESIGN" || upperDisplayedWord === "TIMEIDESIGN") && index === 4) || (upperDisplayedWord === "STORYIDESIGN" && index === 5));
            })() && (
              <div style={{
                position: 'absolute',
                top: eyePosition === 'down' ? '80%' : '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                
                zIndex: 10
              }}>
                <svg 
                  viewBox="1.5 1.5 12.5 8" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '30px', height: '15px' }}
                >
                  {/* Thick border following the exact eye shape with dynamic color */}
                  <path fill={backgroundColor} stroke={backgroundColor} strokeWidth="2.0" d="M11.28,4.8c.2.25.2.61,0,.86-.54.63-1.73,1.74-3.52,1.74-.17,0-2.17-.04-3.53-1.73-.2-.25-.2-.61,0-.86.54-.63,1.73-1.74,3.52-1.74.17,0,2.17.04,3.53,1.73Z"/>
                  
                  <path fill="#8860f4" d="M11.28,4.8c.2.25.2.61,0,.86-.54.63-1.73,1.74-3.52,1.74-.17,0-2.17-.04-3.53-1.73-.2-.25-.2-.61,0-.86.54-.63,1.73-1.74,3.52-1.74.17,0,2.17.04,3.53,1.73Z"/>
                  <path fill="#fff" d="M7.75,3.79c.08,0,.51,0,1.08.11.74.13,1.73.43,2.5,1.09.15.13.14.37-.01.49-.41.33-1.25.89-2.51,1.11-.33.06-.68.09-1.06.09-.08,0-.51,0-1.08-.11-.74-.13-1.73-.43-2.5-1.09-.15-.13-.14-.37.01-.49.41-.33,1.25-.89,2.51-1.11.33-.06.68-.09,1.06-.09Z"/>
                  <path fill="#00e77c" d="M7.75,3.79c.08,0,.51,0,1.08.11.39.31.64.8.64,1.34,0,.55-.26,1.04-.66,1.36-.33.06-.68.09-1.06.09-.08,0-.51,0-1.08-.11-.39-.31-.64-.8-.64-1.34s.26-1.04.66-1.35c.33-.06.68-.09,1.06-.09Z"/>
                  <circle cx="7.75" cy="5.23" r="1.0" fill="#1B1B1B"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

SimpleFlippingWords.displayName = 'SimpleFlippingWords';

export default SimpleFlippingWords;
