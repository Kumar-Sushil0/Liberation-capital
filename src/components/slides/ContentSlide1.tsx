"use client";
import React from 'react';
import styles from '../../styles/slides.module.css';

export const ContentSlide1 = () => {
  return (
    <div className={styles.slideContent}>
      <h2 className={styles.slideTitle}>Liberation Capital</h2>
      <div className={styles.slideText}>
        <p>Up to $100,000 for humans who complete the LIFEiDESIGN Accelerator</p>
        <p style={{ marginTop: '2rem' }}>We don't fund startups.</p>
        <p>We fund humans redesigning themselves.</p>
        <p style={{ marginTop: '2rem', opacity: 0.8 }}>
          Capital becomes scaffolding. Identity becomes architecture.
        </p>
      </div>
    </div>
  );
};
