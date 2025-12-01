"use client";
import React from 'react';
import styles from '../../styles/slides.module.css';

export const ContentSlide2 = () => {
  return (
    <div className={styles.slideContent}>
      <h2 className={styles.slideTitle}>The Accelerator</h2>
      <div className={styles.slideText}>
        <p>LIFEiDESIGN Accelerator</p>
        <p style={{ marginTop: '2rem' }}>Where humans design, decode, and gamify their code.</p>
        <p style={{ marginTop: '2rem', opacity: 0.8 }}>
          Part therapy. Part design lab. Part discipline dojo.
        </p>
        <p style={{ marginTop: '1rem', opacity: 0.8 }}>
          You don't "know thyself" — you design thyself.
        </p>
      </div>
    </div>
  );
};
