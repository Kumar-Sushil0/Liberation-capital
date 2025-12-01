"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const integrateImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/4.+game+aim+3.svg';

/**
 * Slide5MobileIntegrate - Mobile full-screen slide for Integrate feature
 * Replaces the cramped 3-column layout on mobile
 */
const Slide5MobileIntegrate = () => {
  return (
    <div className={styles.heroLayoutMobile}>
      {/* Image at top */}
      <div className={styles.heroImageMobile}>
        <Image
          src={integrateImageUrl}
          width={250}
          height={250}
          alt="Integrate - Life i Design Game"
          className={styles.heroImageContentMobile}
          unoptimized
        />
      </div>

      {/* Text content below */}
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
            INTEGRATE
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Turn your insight into motion&apos;s flame,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Let the imagined become the same.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide5MobileIntegrate;

