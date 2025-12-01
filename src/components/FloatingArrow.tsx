"use client";
import React from 'react';
import styles from '../styles/slides.module.css';

interface FloatingArrowProps {
  currentSection: number;
  sections: any[];
  scrollToSection: (index: number) => void;
}

export const FloatingArrow: React.FC<FloatingArrowProps> = ({
  currentSection,
  sections,
  scrollToSection
}) => {
  const isLastSlide = currentSection === sections.length - 1;
  const isFirstSlide = currentSection === 0;

  if (isLastSlide) return null;

  return (
    <div 
      className={styles.floatingArrow}
      onClick={() => {
        if (!isLastSlide) {
          scrollToSection(currentSection + 1);
        }
      }}
    >
      <svg 
        className={styles.arrowIcon}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
        />
      </svg>
    </div>
  );
};
