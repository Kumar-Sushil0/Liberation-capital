"use client"
import React from 'react';
import Image from "next/image";
import styles from '../../Pallax.module.css';

export const Slide17OverlappingCarousel = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Rod",
      surname: "Chang",
      designation: "The World Builder",
      description: "\"Rod merges motion, myth, and machinery — the perfect engineer for narrative worlds. He expands LIFEiDESIGN's cinematic universe through sound, story, and speed. Building the visual grammar of the metaverse.\""
    },
    {
      id: 2,
      name: "Vanessa ",
      surname: "Aldrich",
      designation: "The Creative Conscience",
      description: "\"Vanessa moves between arias and archetypes — where sound becomes structure and wisdom becomes style.She keeps heart harmonic. The voice that turns vision sacred.\""
    },
    {
      id: 3,
      name: "Yukai",
      surname: "Chow",
      designation: "The Gamification Oracle",
      description: "\"Yu-kai transforms human behavior into blueprints of engagement.He brings the code to LIFEiDESlGN — refining every reward, rhythm, and ritual.Engineering motivation into mastery.\""
    },
    {
      id: 4,
      name: "Chris",
      surname: "Do",
      designation: "The Brand Architect",
      description: "\"Chris builds clarity from chaos — he turns creative vision into scalable systems.He's the one helping LIFEiDESIGN speak the language of value and velocity. Designing the way the world perceives the game.\""
    }
  ];

  return (
    <div className={styles.scrollRevealMasterContainer}>
      {/* Fixed Grey Line Container */}
      <div className={styles.greyLineContainer}>
        <p className={styles.greyLineText}>
          Game is a gang sport. Meet the visionaries who turn individual potential into collective power.
        </p>
      </div>

      {/* Main Content Container */}
      <div className={styles.scrollRevealMainContent}>
        <div className={styles.slide17ImageGrid}>
        {teamMembers.map((member, index) => (
          <div key={member.id} className={styles.slide17ImageWrapper}>
            <Image
              src={`/image${(index % 4) + 1}.jpg`}
              width={200}
              height={200}
              alt={`${member.name} ${member.surname}`}
              className={styles.slide17Image}
            />
            {/* Name positioned at bottom left of card */}
            <div className={styles.slide17CardName}>
                <h3 className={styles.slide17MemberName}>
                {member.name} {member.surname}
                </h3>
            </div>
            {/* Overlay that appears on hover */}
            <div className={styles.slide17ImageOverlay}>
              <div className={styles.slide17OverlayContent}>
                <div className={styles.slide17OverlayCenter}>
                  <p className={styles.slide17MemberDescription} style={{ marginTop: '5rem' }}>
                    {member.description}
                  </p>
                </div>
                <div className={styles.slide17OverlayBottom}>
                <p className={styles.slide17MemberDesignation}>
                  {member.designation}
                </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};
