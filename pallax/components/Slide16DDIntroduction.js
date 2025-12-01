"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from "next/image";
import styles from '../Pallax.module.css';
import SimpleFlippingWords from '../../../components/Flipping_words/SimpleFlippingWords';

const gameHostImageUrl = 'https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/12.+game+host.svg';

/**
 * Slide16DDIntroduction - Sixteenth slide component for the parallax experience
 * Displays DD's introduction with personal stats and social links
 * @param {Object} props - Component props
 * @param {number} props.currentSection - Current active section index
 * @returns {JSX.Element} DD Introduction slide component
 */
const Slide16DDIntroduction = ({ currentSection }) => {
  // Refs for controlling flipping words manually
  const creativeFlipRef = useRef(null);
  const originalFlipRef = useRef(null);
  const fearlessFlipRef = useRef(null);

  // Track which animations have been triggered to prevent re-triggering
  const [triggeredAnimations, setTriggeredAnimations] = useState(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Reset triggered animations when entering slide 16 (currentSection === 22)
  useEffect(() => {
    if (isInitialized && currentSection === 22) {
      // Reset triggered animations when entering slide 16
      setTriggeredAnimations(new Set());
      
      // Trigger animations in sequence when user arrives at slide 16
      // Creative animation (after 400ms)
      setTimeout(() => {
        if (creativeFlipRef.current) {
          creativeFlipRef.current.triggerFlip();
          setTriggeredAnimations(prev => new Set(prev).add('creative'));
        }
      }, 600);

      // Original animation (after 800ms)
      setTimeout(() => {
        if (originalFlipRef.current) {
          originalFlipRef.current.triggerFlip();
          setTriggeredAnimations(prev => new Set(prev).add('original'));
        }
      }, 1000);

      // Fearless animation (after 1200ms)
      setTimeout(() => {
        if (fearlessFlipRef.current) {
          fearlessFlipRef.current.triggerFlip();
          setTriggeredAnimations(prev => new Set(prev).add('fearless'));
        }
      }, 1400);
    }
  }, [currentSection, isInitialized]);
  // Calculate responsive font sizes based on window width
  const getCountFontSize = () => {
    if (typeof window === 'undefined') return '48px';
    const width = window.innerWidth;
    if (width <= 360) return '24px';
    if (width <= 480) return '28px';
    if (width <= 768) return '36px';
    return '48px';
  };

  return (
    <div className={styles.pallaxAboutDigen}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
        <p className={styles.pallaxWebsiteLink} style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>
          game created and hosted by:
        </p>
      </div>
      <div className={styles.pallaxSocials}>
        <div className={styles.pallaxSocialIcond}>
          <Image src={gameHostImageUrl} height={120} width={120} alt='DD Logo' unoptimized />
        </div>
        <div className={styles.pallaxSocialLinks}>
          <p className={styles.pallaxDesignationText} style={{ margin: 0 }}>
            D.D
          </p>
          <p className={styles.pallaxDesignationText} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '15px', margin: 0 }}>
            liberation designer
          </p>
          <a href="https://dyslexicdigen.com/" target="_blank" rel="noopener noreferrer" className={styles.pallaxYoddLink} style={{ marginTop: '0.25rem' }}>
            www.yodd.design
          </a>
        </div>
      </div>

      <div className={styles.pallaxSectionHeader}>
        <p style={{ 
          fontFamily: '"satoshi", sans-serif', 
          fontSize: '14px', 
          color: '#888888', 
          textAlign: 'center',
          margin: '0 0 1rem 0',
          lineHeight: '1.6',
          fontStyle: 'italic',
          fontWeight: 'bold',
          textTransform: 'none'
        }}>
          &quot;I built the maze to lose my way, so you could find yours through this play.&quot;
        </p>
        <h3 className={styles.pallaxDdSubtitle} style={{ marginTop: '1.5rem' }}>Artist <span>|</span> Designer <span>|</span> Strategist <span>|</span> Philosopher</h3>
        <div className={styles.pallaxDdDescription} style={{ width: '100%', maxWidth: '100%' }}>
          <h3>
            Yo I&apos;m D.D, I&apos;ll be designing & leading this Lifestyle Gamification Experience to ensure you just don&apos;t participate, but dominate.<br />
            As you engage with this game my role is to keep you consistently performing at your peak.
          </h3>
        </div>
      </div>

      <div className={styles.pallaxDigenCounts}>
        <div className={styles.pallaxDigenCount}>
          <SimpleFlippingWords 
            ref={creativeFlipRef}
            currentWord="100% CREATIVE"
            fontSize={getCountFontSize()}
            animationTrigger={0}
            mute={true}
          />
          
          <p style={{ color: '#888888', textTransform: 'none' }} className={styles.pallaxCountDesc}>Fueled by radical imagination.</p>
        </div>
        <div className={styles.pallaxDigenCount}>
          <SimpleFlippingWords 
            ref={originalFlipRef}
            currentWord="100% ORIGINAL"
            fontSize={getCountFontSize()}
            animationTrigger={0}
            mute={true}
          />
         
          <p style={{ color: '#888888', textTransform: 'none' }} className={styles.pallaxCountDesc}>Channeled through raw authenticity.</p>
        </div>
        <div className={styles.pallaxDigenCount}>
          <SimpleFlippingWords 
            ref={fearlessFlipRef}
            currentWord="100% FEARLESS"
            fontSize={getCountFontSize()}
            animationTrigger={0}
            mute={true}
          />
          
          <p style={{ color: '#888888', textTransform: 'none' }} className={styles.pallaxCountDesc}>Forged in bold exploration.</p>
        </div>
      </div>
    </div>
  );
};

export default Slide16DDIntroduction;
