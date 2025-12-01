"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const speculateImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/4.+game+aim+1.svg';

/**
 * Slide5MobileSpeculate - Mobile full-screen slide for Speculate feature
 * Replaces the cramped 3-column layout on mobile
 */
const Slide5MobileSpeculate = () => {
  return (
    <div className={styles.heroLayoutMobile}>
      {/* Image at top */}
      <div className={styles.heroImageMobile}>
        <Image
          src={speculateImageUrl}
          width={250}
          height={250}
          alt="Speculate - Life i Design Game"
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
            SPECULATE
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Imagine beyond what eyes can see,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Design the &quot;what if&quot; that sets you free.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide5MobileSpeculate;

