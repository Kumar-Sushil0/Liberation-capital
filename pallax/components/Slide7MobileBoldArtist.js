"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const boldArtistImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/6.+game+crowd+1.svg';

/**
 * Slide7MobileBoldArtist - Mobile full-screen slide for Bold Artist feature
 * Replaces the cramped 3-column layout on mobile
 */
const Slide7MobileBoldArtist = () => {
  return (
    <div className={styles.heroLayoutMobile}>
      {/* Image at top */}
      <div className={styles.heroImageMobile}>
        <Image
          src={boldArtistImageUrl}
          width={250}
          height={250}
          alt="Bold Artist - Life i Design Game"
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
            BOLD ARTIST
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            Feels in color, speaks through fire,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            designs emotion to inspire.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide7MobileBoldArtist;

