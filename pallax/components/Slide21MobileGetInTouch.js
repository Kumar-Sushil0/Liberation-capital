"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const getInTouchImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/13.+game+link+2.svg';

/**
 * Slide21MobileGetInTouch - Mobile full-screen slide for "Get In Touch" section
 * Replaces the cramped 2-column layout on mobile
 */
const Slide21MobileGetInTouch = () => {
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
            Get In Touch
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            If the story sparks your flame,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            join the fold to play the game.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className={styles.heroImageMobile} style={{ marginTop: '1rem' }}>
        <Image
          src={getInTouchImageUrl}
          width={180}
          height={180}
          alt="Get In Touch - Life i Design Game"
          className={styles.heroImageContentMobile}
          unoptimized
        />
      </div>

      {/* Contact Section */}
      <div className={styles.heroContentMobile} style={{ marginTop: '2rem' }}>
        <p className={styles.heroParagraphMobile} style={{ 
          textAlign: 'center',
          marginBottom: '1rem',
          fontSize: '13px',
          lineHeight: '1.4'
        }}>
          For Beta Testing, Collaborations, Questions, or Alliances contact:
        </p>
        <a 
          href="mailto:yo@lifeidesign.games" 
          style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            padding: '0.75rem 1.5rem',
            color: '#00e87b',
            fontFamily: '"satoshi", sans-serif',
            fontSize: '16px',
            fontWeight: '600',
            letterSpacing: '1px',
            textDecoration: 'none',
            border: '1px solid #00e87b',
            borderRadius: '4px',
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
          yo@lifeidesign.games
        </a>
      </div>
    </div>
  );
};

export default Slide21MobileGetInTouch;

