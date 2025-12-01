"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const evaluateImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/4.+game+aim+2.svg';

/**
 * Slide5MobileEvaluate - Mobile full-screen slide for Evaluate feature
 * Replaces the cramped 3-column layout on mobile
 */
const Slide5MobileEvaluate = () => {
  return (
    <div className={styles.heroLayoutMobile}>
      {/* Image at top */}
      <div className={styles.heroImageMobile}>
        <Image
          src={evaluateImageUrl}
          width={250}
          height={250}
          alt="Evaluate - Life i Design Game"
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
            EVALUATE
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Still the static, decode your core
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            The self you seek is what you&apos;re for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide5MobileEvaluate;

