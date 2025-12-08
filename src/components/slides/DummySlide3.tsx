"use client";
import React from "react";
import styles from '../../styles/slides.module.css';

export const DummySlide3 = () => {
  return (
    <div className={styles.slideContent}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        padding: '0 3rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: '600',
          color: '#ffffff',
          margin: 0,
          fontFamily: '"built", "Satoshi", sans-serif'
        }}>
          DUMMY SLIDE 3
        </h1>
        <p style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
          color: '#b8b8b8',
          marginTop: '1rem'
        }}>
          Placeholder Content
        </p>
      </div>
    </div>
  );
};
