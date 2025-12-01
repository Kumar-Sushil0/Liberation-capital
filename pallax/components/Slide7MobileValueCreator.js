"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const valueCreatorImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/6.+game+crowd+2.svg';

/**
 * Slide7MobileValueCreator - Mobile full-screen slide for Value Creator feature
 * Replaces the cramped 3-column layout on mobile
 */
const Slide7MobileValueCreator = () => {
  return (
    <div className={styles.heroLayoutMobile}>
      {/* Image at top */}
      <div className={styles.heroImageMobile}>
        <Image
          src={valueCreatorImageUrl}
          width={250}
          height={250}
          alt="Value Creator - Life i Design Game"
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
            VALUE CREATOR
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Finds the pattern in the blur,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            turns each idea to something sure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide7MobileValueCreator;

