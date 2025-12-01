"use client";
import React from 'react';
import styles from '../Pallax.module.css';

/**
 * Slide7NewMobileMainQuest - Mobile full-screen slide for "THE MAIN QUEST" section
 * Replaces the cramped 2-section layout on mobile
 */
const Slide7NewMobileMainQuest = () => {
    return (
        <div className={styles.heroLayoutMobile}>
            {/* Title and Description */}
            <div className={styles.heroContentMobile}>
                <div className={styles.heroTextMobile}>
                    <h3 style={{
                        fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                        fontSize: '24px',
                        color: '#00e87b',
                        fontWeight: 'normal',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        margin: '0 0 0.5rem 0',
                        textAlign: 'center',
                        lineHeight: 1.3
                    }}>
                        THE MAIN QUEST
                    </h3>

                    <h4 style={{
                        fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                        fontSize: '20px',
                        color: '#ffffff',
                        fontWeight: 'normal',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        margin: '0 0 1.5rem 0',
                        textAlign: 'center'
                    }}>
                        LIFEiDESIGN
                    </h4>

                    <p className={styles.heroParagraphMobile} style={{ textAlign: 'center', color: '#888888' }}>
                        You&apos;re not a pawn in someone&apos;s frame,
                    </p>

                    <p className={styles.heroParagraphMobile} style={{ textAlign: 'center', color: '#888888' }}>
                        you are the architect of your game.
                    </p>
                </div>
            </div>

            {/* 2x2 Grid of Cards */}
            <div className={styles.powersGrid2x2} style={{
                marginTop: '2rem',
                maxWidth: '400px',
                width: '100%',
                gap: '1.5rem'
            }}>
                {/* Intuition */}
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
                                    src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.1.svg"
                                    alt="Intuition"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardHoverContent}>
                                <p className={styles.cardDescription}>The compass no one can cloud.</p>
                            </div>
                        </div>
                    </div>
                    <h4 className={styles.cardTitleBelow}>Intuition</h4>
                </div>

                {/* Inner Voice */}
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
                                    src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.2.svg"
                                    alt="Inner Voice"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardHoverContent}>
                                <p className={styles.cardDescription}>The echo that names your soul.</p>
                            </div>
                        </div>
                    </div>
                    <h4 className={styles.cardTitleBelow}>Inner Voice</h4>
                </div>

                {/* Instinct */}
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
                                    src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.3.svg"
                                    alt="Instinct"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardHoverContent}>
                                <p className={styles.cardDescription}>The step before you know.</p>
                            </div>
                        </div>
                    </div>
                    <h4 className={styles.cardTitleBelow}>Instinct</h4>
                </div>

                {/* Risk */}
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
                                    src="https://lidbucketnew.s3.ap-south-1.amazonaws.com/landingpage/slideassets/14.4.svg"
                                    alt="Risk"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardHoverContent}>
                                <p className={styles.cardDescription}>The storm that makes you grow.</p>
                            </div>
                        </div>
                    </div>
                    <h4 className={styles.cardTitleBelow}>Risk</h4>
                </div>
            </div>
        </div>
    );
};

export default Slide7NewMobileMainQuest;
