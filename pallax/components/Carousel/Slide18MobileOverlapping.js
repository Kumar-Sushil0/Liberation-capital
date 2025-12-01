"use client"
import React, { useState } from 'react';
import styles from '../../Pallax.module.css';

export const Slide18MobileOverlappingCarousel = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const slide18CardsData = [
        {
            id: 0,
            title: "Ava Li",
            description: "\"Mirror Mode destroyed every illusion I had about 'user experience.' Turns out, the real UX is life itself and LIFEiDESIGN is the interface.\"",
            designation: "Product Designer, Singapore",
            color: "#ff6b6b"
        },
        {
            id: 1,
            title: "Rafael Costa",
            description: "\"I thought I knew storytelling until Hero Mode. LIFEiDESIGN doesn't help you 'find your voice', it makes your voice find you.\"",
            designation: "Brand Director, São Paulo",
            color: "#4ecdc4"
        },
        {
            id: 2,
            title: "Leena Patel",
            description: "\"NPC Mode flipped my idea of wealth on its head. I realized I didn't want more money, I wanted more meaning. I'd invest in this before any startup.\"",
            designation: "Entrepreneur & Angel Investor, London",
            color: "#45b7d1"
        },
        {
            id: 3,
            title: "Noah Rivers",
            description: "\"Monk Mode was my ego's dojo. I've done ayahuasca, silent retreats, and endless meditation, none of them showed me my patterns this precisely. This is gamified shadow work.\"",
            designation: "Spiritual Coach, Sedona",
            color: "#f7b731"
        },
        {
            id: 4,
            title: "Dmitri Volkov",
            description: "\"The architecture is wild, like if Notion, Jung, and The Matrix had a child. Every decision changes your interface with reality. I didn't just play the game — the game played me back.\"",
            designation: "Product Manager, Berlin",
            color: "#5f27cd"
        },
        {
            id: 5,
            title: "Nia Calderón",
            description: "\"StoryiDesign taught me that fiction is the future. It's not about escaping reality, it's about designing it. I met my new self in Human Mode… and she's brilliant.\"",
            designation: "Actor & Writer, Los Angeles",
            color: "#00d2d3"
        },
        {
            id: 6,
            title: "Arjun Mehta",
            description: "\"LIFEiDESIGN is the MBA of consciousness. Strategy, story, psychology, all merged into a living system. It made my five year plan feel one-dimensional.\"",
            designation: "Business Leader, Mumbai",
            color: "#ff9ff3"
        },
        {
            id: 7,
            title: "Dr. Helena Strauss",
            description: "\"For the first time, philosophy feels playable. God Mode is not a metaphor, it's a mirror. I no longer 'think about' purpose. I live it.\"",
            designation: "Philosopher & Scholar, Vienna",
            color: "#54a0ff"
        },
        {
            id: 8,
            title: "Elon Kai",
            description: "\"This isn't self-help, it's self-simulation. LIFEiDESIGN gives civilization what religion tried to: a framework for becoming. You have to play it to believe it, and once you do, there's no going back.\"",
            designation: "Futurist & Policy Advisor, Tokyo",
            color: "#5f27cd"
        }
    ];

    const handleNext = () => {
        setCurrentCardIndex((prev) => (prev + 1) % slide18CardsData.length);
    };

    const handlePrev = () => {
        setCurrentCardIndex((prev) => (prev - 1 + slide18CardsData.length) % slide18CardsData.length);
    };

    const currentCard = slide18CardsData[currentCardIndex];

    return (
        <div className={styles.scrollRevealMasterContainer}>
            <div className={styles.greyLineContainer} style={{ zIndex: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div className={styles.mobileLine} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '1px', textAlign: 'center', margin: 0, maxWidth: '800px', padding: '0 1rem', lineHeight: 1.6, textTransform: 'none', color: '#888888', opacity: 1 }}>
                        When seasoned eyes name what&apos;s true, the world remaps itself.
                    </div>
                    <div className={styles.mobileLine} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '1px', textAlign: 'center', margin: 0, maxWidth: '800px', padding: '0 1rem', lineHeight: 1.6, textTransform: 'none', color: '#888888', opacity: 1 }}>
                        Listen close, their words aren&apos;t praise, but proof the game is real.
                    </div>
                    <div className={styles.mobileLine} style={{ fontFamily: '"satoshi", sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '1px', textAlign: 'center', margin: 0, maxWidth: '800px', padding: '0 1rem', lineHeight: 1.6, textTransform: 'none', color: '#888888', opacity: 1 }}>
                        Their stamp is not advice, it&apos;s the cue that your old world is shifting.
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className={styles.scrollRevealMainContent}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem 1rem',
                    minHeight: '60vh'
                }}>
                    {/* Card */}
                    <div
                        style={{
                            '--card-color': currentCard.color,
                            background: '#000000',
                            border: '1px solid #00e87b',
                            borderRadius: '12px',
                            padding: '2rem 1.5rem',
                            maxWidth: '500px',
                            width: '100%',
                            position: 'relative'
                        }}
                    >
                        <div className={styles.slide12CardContent} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', justifyContent: 'flex-start' }}>
                                    <div
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '4px',
                                            background: '#000000',
                                            border: '1px solid #00e87b',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontFamily: '"satoshi", sans-serif',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            color: '#00e87b',
                                            flexShrink: 0
                                        }}
                                    >
                                    </div>
                                    <h3 className={styles.slide12CardTitle} style={{ margin: 0, textAlign: 'left' }}>
                                        <span style={{
                                            fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                                            fontSize: '14px',
                                            color: '#00e87b',
                                            fontWeight: '500',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            {currentCard.title}
                                        </span>
                                    </h3>
                                </div>
                                <div className={styles.slide12CardTitleDivider} style={{ alignSelf: 'flex-start', width: '100%' }}></div>
                            </div>
                            <p className={styles.slide12CardDescription} style={{ textAlign: 'left', marginTop: '1rem' }}>
                                {currentCard.description}
                                <br />
                                <strong style={{ fontWeight: 'bold', color: '#fff', display: 'block', marginTop: '1rem' }}>{currentCard.designation}</strong>
                            </p>
                            <div className={styles.slide12CardNumber} style={{ textAlign: 'left', alignSelf: 'flex-start', marginTop: '1rem' }}>
                                {String(currentCard.id + 1).padStart(2, '0')}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '2rem',
                        alignItems: 'center'
                    }}>
                        <button
                            onClick={handlePrev}
                            style={{
                                background: 'transparent',
                                border: '1px solid #00e87b',
                                borderRadius: '50%',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#00e87b',
                                fontSize: '20px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            ←
                        </button>

                        <div style={{
                            fontFamily: '"satoshi", sans-serif',
                            fontSize: '14px',
                            color: '#888888',
                            minWidth: '80px',
                            textAlign: 'center'
                        }}>
                            {currentCardIndex + 1} / {slide18CardsData.length}
                        </div>

                        <button
                            onClick={handleNext}
                            style={{
                                background: 'transparent',
                                border: '1px solid #00e87b',
                                borderRadius: '50%',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#00e87b',
                                fontSize: '20px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            →
                        </button>
                    </div>

                    {/* Dot Indicators */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '1.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        maxWidth: '300px'
                    }}>
                        {slide18CardsData.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentCardIndex(index)}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: index === currentCardIndex ? '#00e87b' : '#333',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
