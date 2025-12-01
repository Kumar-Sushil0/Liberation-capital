"use client";
import React from 'react';
import styles from '../../styles/slides.module.css';

export const FinalSlide = () => {
  return (
    <div className={styles.slideContent}>
      <h2 className={styles.slideTitle}>Final Threshold</h2>
      <div className={styles.slideText}>
        <p>There are only two ways to step into this philosophy:</p>
        <div style={{ 
          marginTop: '3rem', 
          display: 'flex', 
          gap: '2rem', 
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href="/investor"
            style={{
              padding: '1rem 2rem',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '0.5rem',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Become an Investor
          </a>
          <span style={{ opacity: 0.8 }}>or</span>
          <a
            href="/applicants"
            style={{
              padding: '1rem 2rem',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '0.5rem',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Apply for Funding
          </a>
        </div>
        <div style={{ 
          marginTop: '3rem', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          opacity: 0.8,
          fontSize: '1rem'
        }}>
          <p>Choose with intention.</p>
          <p>Choose with honesty.</p>
          <p>Choose with consequence.</p>
        </div>
      </div>
    </div>
  );
};
