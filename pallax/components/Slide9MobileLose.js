"use client";
import React from 'react';
import styles from '../Pallax.module.css';

/**
 * Slide9MobileLose - Mobile full-screen slide for "YOU WILL LOSE" section
 * Replaces the cramped 2-column layout on mobile
 */
const Slide9MobileLose = () => {
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
            YOU WILL LOSE
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            To rise beyond the life you knew,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            you&apos;ll shed the cage that once felt true.
          </p>
        </div>
      </div>

      {/* 2x2 Grid of Cards */}
      <div className={styles.lossesGrid2x2} style={{ 
        marginTop: '2rem',
        maxWidth: '400px',
        width: '100%',
        gap: '1.5rem'
      }}>
        {/* Approval */}
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
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.5.svg" 
                  alt="Approval" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The mirror that bends your view.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Approval</h4>
        </div>

        {/* Excuses */}
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
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.6.svg" 
                  alt="Excuses" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The fog that hides your cue.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Excuses</h4>
        </div>

        {/* Comfort */}
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
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.7.svg" 
                  alt="Comfort" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The cage you called your peace.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Comfort</h4>
        </div>

        {/* Fear */}
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
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/15.8.svg" 
                  alt="Fear" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The clock that won&apos;t release.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Fear</h4>
        </div>
      </div>
    </div>
  );
};

export default Slide9MobileLose;

