"use client";
import React from 'react';
import styles from '../../styles/slides.module.css';

export const ContentSlide3 = () => {
  return (
    <div className={styles.slideContent}>
      <h2 className={styles.slideTitle}>The Test</h2>
      <div className={styles.slideText}>
        <p>EPiCENTRE — Where identity meets reality</p>
        <p style={{ marginTop: '2rem' }}>
          A silent, monastic, reality-heavy pressure chamber
        </p>
        <p style={{ marginTop: '1rem' }}>
          where your future self is stress-tested.
        </p>
        <p style={{ marginTop: '2rem', opacity: 0.8 }}>
          If it can't survive stillness, it won't survive life.
        </p>
      </div>
    </div>
  );
};
