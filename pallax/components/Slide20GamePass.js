"use client";
import React from 'react';
import styles from '../Pallax.module.css';
import { VibeCheckButton } from './UI/VibeCheckButton';

const gamePassImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/game+pass.svg';

const Slide20GamePass = ({ currentSection }) => {
  return (
    <div className={styles.scrollRevealMasterContainer}>
      {/* Fixed Grey Line Container */}
      <div className={styles.greyLineContainer}>
        <p className={styles.greyLineText}>
          If the only thing stopping you from being you is you, The LIFEIDESIGN is for you.
        </p>
      </div>

      {/* Main Content Container */}
      <div className={styles.scrollRevealMainContent}>
        <div 
          className={styles.pallaxGamePassSection}
          style={{
            backgroundImage: `url(${gamePassImageUrl})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            flex: 1,
            minHeight: '60vh',
            maxHeight: '80vh'
          }}
        >
            <div className={styles.pallaxGamePassCta} style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
              <VibeCheckButton currentSection={currentSection} inline={true} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Slide20GamePass;

