"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const creativeEntrepreneurImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/6.+game+crowd+3.svg';

/**
 * Slide7MobileCreativeEntrepreneur - Mobile full-screen slide for Creative Entrepreneur feature
 * Replaces the cramped 3-column layout on mobile
 */
const Slide7MobileCreativeEntrepreneur = () => {
  return (
    <div className={styles.heroLayoutMobile}>
      {/* Image at top */}
      <div className={styles.heroImageMobile}>
        <Image
          src={creativeEntrepreneurImageUrl}
          width={250}
          height={250}
          alt="Creative Entrepreneur - Life i Design Game"
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
            CREATIVE ENTREPRENEUR
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Trades the safe for paths unknown,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            builds his freedom from his own.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide7MobileCreativeEntrepreneur;

