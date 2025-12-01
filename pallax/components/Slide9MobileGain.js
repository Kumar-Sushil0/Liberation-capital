"use client";
import React from 'react';
import styles from '../Pallax.module.css';

/**
 * Slide9MobileGain - Mobile full-screen slide for "YOU WILL GAIN" section
 * Replaces the cramped 2-column layout on mobile
 */
const Slide9MobileGain = () => {
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
            YOU WILL GAIN
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            You&apos;ll gain the truth that can&apos;t be bought,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            and lose the fear of what you&apos;re not.
          </p>
        </div>
      </div>

      {/* 2x2 Grid of Cards */}
      <div className={styles.gainsGrid2x2} style={{ 
        marginTop: '2rem',
        maxWidth: '400px',
        width: '100%',
        gap: '1.5rem'
      }}>
        {/* Selfishness */}
        <div className={styles.cardWrapper}>
          <div className={styles.hoverCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardEmoji} style={{ 
                position: 'absolute', 
                top: '-20px', 
                left: '-20px', 
                right: '-20px', 
                bottom: '-20px', 
                transform: 'none', 
                width: 'calc(100% + 40px)', 
                height: 'calc(100% + 40px)' 
              }}>
                <img 
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.1.svg" 
                  alt="Selfishness" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The fuel that frees your flame.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Selfishness</h4>
        </div>

        {/* Sovereignty */}
        <div className={styles.cardWrapper}>
          <div className={styles.hoverCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardEmoji} style={{ 
                position: 'absolute', 
                top: '-20px', 
                left: '-20px', 
                right: '-20px', 
                bottom: '-20px', 
                transform: 'none', 
                width: 'calc(100% + 40px)', 
                height: 'calc(100% + 40px)' 
              }}>
                <img 
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.2.svg" 
                  alt="Sovereignty" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The crown that bears your name.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Sovereignty</h4>
        </div>

        {/* Obsession */}
        <div className={styles.cardWrapper}>
          <div className={styles.hoverCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardEmoji} style={{ 
                position: 'absolute', 
                top: '-20px', 
                left: '-20px', 
                right: '-20px', 
                bottom: '-20px', 
                transform: 'none', 
                width: 'calc(100% + 40px)', 
                height: 'calc(100% + 40px)' 
              }}>
                <img 
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.3.svg" 
                  alt="Obsession" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The hunger that shapes your fire.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Obsession</h4>
        </div>

        {/* Creation */}
        <div className={styles.cardWrapper}>
          <div className={styles.hoverCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardEmoji} style={{ 
                position: 'absolute', 
                top: '-20px', 
                left: '-20px', 
                right: '-20px', 
                bottom: '-20px', 
                transform: 'none', 
                width: 'calc(100% + 40px)', 
                height: 'calc(100% + 40px)' 
              }}>
                <img 
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.4.svg" 
                  alt="Creation" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The ground where you never tire.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Creation</h4>
        </div>
      </div>
    </div>
  );
};

export default Slide9MobileGain;

