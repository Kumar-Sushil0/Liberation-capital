"use client";
import React from 'react';
import styles from '../../styles/slides.module.css';

export const HeroSlide = () => {
  return (
    <div className={styles.slideContent}>
      <h1 className={styles.slideTitle}>Want a new life?</h1>
      <div className={styles.slideText}>
        <p>Design it. Play it. Pitch it.</p>
        <p style={{ marginTop: '1rem', fontSize: '2rem', fontWeight: 'bold' }}>Get funded for it.</p>
        <p style={{ marginTop: '1rem', opacity: 0.9 }}>Yes — this is real.</p>
      </div>
    </div>
  );
};
