"use client";
import React from 'react';
import styles from '../Pallax.module.css';

/**
 * Slide8MobileDesign - Mobile full-screen slide for "The Design" section
 * Replaces the cramped 2-column layout on mobile
 */
const Slide8MobileDesign = () => {
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
            The Design
          </h3>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            They forged the maze and called it fate,
          </p>

          <p className={styles.heroParagraphMobile} style={{ textAlign: 'center' }}>
            a loop designed to captivate.
          </p>
        </div>
      </div>

      {/* 2x2 Grid of Cards */}
      <div className={styles.forcesGrid2x2} style={{ 
        marginTop: '2rem',
        maxWidth: '400px',
        width: '100%',
        gap: '1.5rem'
      }}>
        {/* Society */}
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
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.5.svg" 
                  alt="Society" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The mirror that keeps you blind.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Society</h4>
        </div>

        {/* Government */}
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
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.6.svg" 
                  alt="Government" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The script that traps your mind.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Government</h4>
        </div>

        {/* Religion */}
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
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.7.svg" 
                  alt="Religion" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The voice that shapes your fear.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Religion</h4>
        </div>

        {/* Media */}
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
                  src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.8.svg" 
                  alt="Media" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardHoverContent}>
                <p className={styles.cardDescription}>The noise that drowns your goal.</p>
              </div>
            </div>
          </div>
          <h4 className={styles.cardTitleBelow}>Media</h4>
        </div>
      </div>
    </div>
  );
};

export default Slide8MobileDesign;

