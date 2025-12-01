"use client";
import React from 'react';
import styles from '../../styles/slides.module.css';

export const HeroSlide = () => {
  return (
    <div className={styles.slideContent}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
        maxWidth: '1200px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          margin: 0,
          lineHeight: 1.2,
          color: '#ffffff'
        }}>
          Want a new life?
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          width: '100%',
          maxWidth: '1000px',
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          fontWeight: 'bold',
          lineHeight: 1.3,
          fontFamily: 'inherit'
        }}>
          <p style={{ margin: 0, color: '#00e87b' }}>Design it.</p>
          <p style={{ margin: 0, color: '#00e87b' }}>Play it.</p>
          <p style={{ margin: 0, color: '#00e87b' }}>Pitch it.</p>
        </div>

        <p style={{
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          fontWeight: 'bold',
          margin: 0,
          color: '#ffffff',
          lineHeight: 1.3
        }}>
          Get funded for it.
        </p>

        <p style={{
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          margin: 0,
          color: '#ffffff',
          opacity: 0.9
        }}>
          Yes — this is real.
        </p>
      </div>
    </div>
  );
};
