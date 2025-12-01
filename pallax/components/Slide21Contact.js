"use client";
import React from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';

const pressKitImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/brochure.svg';
const getInTouchImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/13.+game+link+2.svg';

const Slide21Contact = () => {
  return (
    <div className={styles.contactLayout}>
      <div className={styles.contactContent}>
        <div className={styles.pallaxContactSection}>
          <h3 className={styles.pallaxContactTitle}>Brochure</h3>

          <p className={styles.heroParagraph} style={{ margin: '0', textAlign: 'center' }}>
            Before you play, behold the lore,
          </p>
          <p className={styles.heroParagraph} style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
            this brochure opens the hidden door.
          </p>

          <div className={styles.contactImageWrapper} style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src={pressKitImageUrl}
              width={120}
              height={120}
              alt="Life i Design Game"
              className={styles.contactImage}
              style={{ transform: 'scale(1.5)' }}
              unoptimized
            />
          </div>

          <div className={styles.pallaxContactContent} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            <p className={styles.pallaxContactDescription} style={{ margin: 0, padding: 0, lineHeight: '1.2' }}>
              Download the LIFEiDESIGN brochure.
            </p>
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = pressKitImageUrl;
                link.download = 'brochure.svg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.25rem',
                padding: 0,
                backgroundColor: 'transparent',
                color: '#00e87b',
                border: 'none',
                borderRadius: 0,
                cursor: 'pointer',
                fontFamily: '"satoshi", sans-serif',
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'none',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#fff';
                e.target.style.textShadow = '0 0 10px rgba(0, 232, 123, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#00e87b';
                e.target.style.textShadow = 'none';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 11L3 6H6V2H10V6H13L8 11Z" fill="currentColor"/>
                <path d="M2 13H14V14H2V13Z" fill="currentColor"/>
              </svg>
              DOWNLOAD
            </button>
          </div>
        </div>
      </div>

      <div className={styles.contactSeparatorLine}></div>

      <div className={styles.contactContent}>
        <div className={styles.pallaxContactSection}>
          <h3 className={styles.pallaxContactTitle}>Get In Touch</h3>

          <p className={styles.heroParagraph} style={{ margin: '0', textAlign: 'center' }}>
            If the story sparks your flame,
          </p>
          <p className={styles.heroParagraph} style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
            join the fold to play the game.
          </p>

          <div className={styles.contactImageWrapper}>
            <Image
              src={getInTouchImageUrl}
              width={120}
              height={120}
              alt="Life i Design Game"
              className={styles.contactImage}
              unoptimized
            />
          </div>

          <div className={styles.pallaxContactContent} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            <p className={styles.pallaxContactDescription} style={{ margin: 0, padding: 0, lineHeight: '1.2' }}>
              For Beta Testing, Collaborations, Questions, or Alliances
            </p>
            <a href="mailto:yo@lifeidesign.games" className={styles.pallaxEmailLink} style={{ marginTop: '0.25rem' }}>
              yo@lifeidesign.games
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide21Contact;

