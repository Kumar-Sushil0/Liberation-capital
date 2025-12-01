import React from 'react';
import styles from '../../Pallax.module.css';

export const FloatingArrow = ({ currentSection, onNextSlide, isVisible, sections }) => {
  const handleClick = () => {
    // Go to next section, but don't cycle back to first
    const nextSection = currentSection + 1;
    if (nextSection < sections.length) {
      onNextSlide(nextSection);
    }
  };

  return (
    <div
      className={styles.floatingArrow}
      onClick={handleClick}
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.arrowSvg}
      >
        <path
          d="M7 13L12 18L17 13"
          stroke="#00e87b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18V6"
          stroke="#00e87b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

