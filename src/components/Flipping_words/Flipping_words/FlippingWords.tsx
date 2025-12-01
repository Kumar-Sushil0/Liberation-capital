"use client";
import React, { useState, useEffect } from "react";
import styles from "./Flippingwords.module.css";

const words = ["DISRUPTION", "INNOVATION", "LIBERATION", "REVOLUTION"];

const WordFlipper: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [nextWordIndex, setNextWordIndex] = useState(1);
  const [flippingLetters, setFlippingLetters] = useState<boolean[]>(
    new Array(10).fill(false)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % words.length;
        setNextWordIndex((nextIndex + 1) % words.length);
        setFlippingLetters(new Array(words[nextIndex].length).fill(false));
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const nextWord = words[nextWordIndex];
    
    // Reset flipping states
    setFlippingLetters(new Array(currentWord.length).fill(false));
    
    const letterDelay = 100; // 100ms between each letter
    const audioTimeouts: NodeJS.Timeout[] = [];
    const animationTimeouts: NodeJS.Timeout[] = [];

    currentWord.split("").forEach((char, index) => {
      const delay = index * letterDelay;
      const isSpace = !char || char.trim() === '';
      
      // Schedule audio only for non-space characters
      if (!isSpace) {
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
      
      // Schedule animation for all characters
      const animationTimeout = setTimeout(() => {
        setFlippingLetters((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, delay);
      animationTimeouts.push(animationTimeout);
    });

    return () => {
      audioTimeouts.forEach((timeout) => clearTimeout(timeout));
      animationTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [currentWordIndex, nextWordIndex]);

  const currentWord = words[currentWordIndex];
  const nextWord = words[nextWordIndex];

  return (
    <div className={styles.wordFlipper}>
      {currentWord.split("").map((letter, index) => (
        <div key={index} className={styles.letterContainer}>
          <div
            className={`${styles.letter} ${
              flippingLetters[index] ? styles.flipping : ""
            }`}
          >
            <div className={styles.letterTop}>
              <span>{nextWord[index]}</span>
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
                <span>{nextWord[index]}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordFlipper;
