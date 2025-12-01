"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const psychologyImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/3.+game+moat+1.svg';

/**
 * Slide4MobileFiction - Mobile full-screen slide for Psychology feature
 * Replaces the cramped 3-column layout on mobile
 */
const Slide4MobileFiction = () => {
  return (
    <div className={styles.heroLayoutMobile}>
      {/* Image at top */}
      <div className={styles.heroImageMobile}>
        <Image
          src={psychologyImageUrl}
          width={250}
          height={250}
          alt="Psychology - Life i Design Game"
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
            PSYCHOLOGY
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Know thy loops, break the chain,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Rewire the mind, redesign the game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide4MobileFiction;
