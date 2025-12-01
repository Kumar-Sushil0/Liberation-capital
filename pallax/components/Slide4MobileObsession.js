"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const playImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+3.svg';

/**
 * Slide4MobileObsession - Mobile full-screen slide for Play feature
 * Replaces the cramped 3-column layout on mobile
 */
const Slide4MobileObsession = () => {
  return (
    <div className={styles.heroLayoutMobile}>
      {/* Image at top */}
      <div className={styles.heroImageMobile}>
        <Image
          src={playImageUrl}
          width={250}
          height={250}
          alt="Play - Life i Design Game"
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
            PLAY
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Fall, rise, and play unbound,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Where curiosity leads, wonder&apos;s found.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide4MobileObsession;
