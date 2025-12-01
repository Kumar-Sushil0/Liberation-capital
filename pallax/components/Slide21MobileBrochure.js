"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const pressKitImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/brochure.svg';

/**
 * Slide21MobileBrochure - Mobile full-screen slide for "Brochure" section
 * Replaces the cramped 2-column layout on mobile
 */
const Slide21MobileBrochure = () => {
  return (
    <div className={styles.heroLayoutMobile}>
      {/* Title and Description */}
      <div className={styles.heroContentMobile}>
        <div className={styles.heroTextMobile}>
          <h3 style={{
            fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
            fontSize: '28px',
            color: '#00e87b',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: '0 0 1.5rem 0',
            textAlign: 'center'
          }}>
            Brochure
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Press play on proof and lore,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            the world should know what&apos;s worth more.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className={styles.heroImageMobile} style={{ marginTop: '1rem' }}>
        <Image
          src={pressKitImageUrl}
          width={180}
          height={180}
          alt="Brochure - Life i Design Game"
          className={styles.heroImageContentMobile}
          style={{ transform: 'scale(1.5)' }}
          unoptimized
        />
      </div>

      {/* Download Section */}
      <div className={styles.heroContentMobile} style={{ marginTop: '2rem' }}>
        <p className={styles.heroParagraphMobile} style={{ 
          textAlign: 'center',
          marginBottom: '1rem',
          fontSize: '13px',
          lineHeight: '1.4'
        }}>
          Download the official press kit — assets, visuals, and story deck
        </p>
        <button 
          onClick={() => {
            const link = document.createElement('a');
            link.href = pressKitImageUrl;
            link.download = 'brochure.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#00e87b',
            border: '1px solid #00e87b',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: '"satoshi", sans-serif',
            fontSize: '16px',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'none',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#fff';
            e.target.style.backgroundColor = '#00e87b';
            e.target.style.textShadow = '0 0 10px rgba(0, 232, 123, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#00e87b';
            e.target.style.backgroundColor = 'transparent';
            e.target.style.textShadow = 'none';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 11L3 6H6V2H10V6H13L8 11Z" fill="currentColor"/>
            <path d="M2 13H14V14H2V13Z" fill="currentColor"/>
          </svg>
          DOWNLOAD
        </button>
      </div>
    </div>
  );
};

export default Slide21MobileBrochure;

