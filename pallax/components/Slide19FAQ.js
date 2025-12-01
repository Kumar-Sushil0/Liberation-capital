"use client";
import React from 'react';
import styles from '../Pallax.module.css';

/**
 * Slide19FAQ - Nineteenth slide component for the parallax experience
 * Displays FAQ section with expandable questions and answers
 * @param {Object} props - Component props
 * @param {number|null} props.expandedFAQ - Currently expanded FAQ index
 * @param {Function} props.toggleFAQ - Function to toggle FAQ expansion
 * @returns {JSX.Element} FAQ slide component
 */
const Slide19FAQ = ({ expandedFAQ, toggleFAQ }) => {
  return (
    <div className={styles.pallaxFaqLayout}>
      <div className={styles.pallaxFaqGrid}>
        <div className={styles.pallaxFaqItem}>
          <button className={styles.pallaxFaqQuestion} onClick={() => toggleFAQ(0)}>
            <span>Redefining &quot;Maya&quot; For The Modern World</span>
            <span className={styles.pallaxFaqIcon}>{expandedFAQ === 0 ? '−' : '+'}</span>
          </button>
          <div className={`${styles.pallaxFaqAnswer} ${expandedFAQ === 0 ? styles.pallaxExpanded : ''}`}>
            <p>In South Asian philosophy, &quot;Maya&quot; has long been interpreted as &quot;illusion&quot;, &quot;delusion&quot; or &quot;simulation&quot;. MAYA redefines this ancient concept as emergent complexity - as what arises when the interaction of simple parts creates something infinitely greater than their sum.</p>
          </div>
        </div>

        <div className={styles.pallaxFaqItem}>
          <button className={styles.pallaxFaqQuestion} onClick={() => toggleFAQ(1)}>
            <span>A Bridge Between Ancient Wisdom and Contemporary Science</span>
            <span className={styles.pallaxFaqIcon}>{expandedFAQ === 1 ? '−' : '+'}</span>
          </button>
          <div className={`${styles.pallaxFaqAnswer} ${expandedFAQ === 1 ? styles.pallaxExpanded : ''}`}>
            <p>MAYA synthesizes timeless philosophical and narrative frameworks with cutting-edge ideas from cognitive biology, consciousness studies, and systems theory. Ancient insights meet modern empiricism to create narratives that speak to our current moment.</p>
          </div>
        </div>

        <div className={styles.pallaxFaqItem}>
          <button className={styles.pallaxFaqQuestion} onClick={() => toggleFAQ(2)}>
            <span>An Endless Sandbox For Visionary Creators</span>
            <span className={styles.pallaxFaqIcon}>{expandedFAQ === 2 ? '−' : '+'}</span>
          </button>
          <div className={`${styles.pallaxFaqAnswer} ${expandedFAQ === 2 ? styles.pallaxExpanded : ''}`}>
            <p>The MAYA universe welcomes storytellers to craft their own narratives within this rich framework. Contributors include acclaimed authors, industry veterans, and emerging voices - all stakeholders in the ever-growing canon of the MAYA mythology.</p>
          </div>
        </div>

        <div className={styles.pallaxFaqItem}>
          <button className={styles.pallaxFaqQuestion} onClick={() => toggleFAQ(3)}>
            <span>Designed By The World&apos;s Finest Artists</span>
            <span className={styles.pallaxFaqIcon}>{expandedFAQ === 3 ? '−' : '+'}</span>
          </button>
          <div className={`${styles.pallaxFaqAnswer} ${expandedFAQ === 3 ? styles.pallaxExpanded : ''}`}>
            <p>Some of entertainment&apos;s most renowned artists have made the art of MAYA, including Wayne Barlowe (Avatar), Wētā FX (Lord of the Rings, Planet of The Apes), and MPC VFX (House of the Dragon). Artists across the USA, New Zealand, China, India, Mexico, France, and Canada have defined the new aesthetic for a new global mythology.</p>
          </div>
        </div>

        <div className={styles.pallaxFaqItem}>
          <button className={styles.pallaxFaqQuestion} onClick={() => toggleFAQ(4)}>
            <span>4 Years and hundreds of Collaborators In The Making</span>
            <span className={styles.pallaxFaqIcon}>{expandedFAQ === 4 ? '−' : '+'}</span>
          </button>
          <div className={`${styles.pallaxFaqAnswer} ${expandedFAQ === 4 ? styles.pallaxExpanded : ''}`}>
            <p>The MAYA Narrative Universe has been built over four intensive years by experts across disciplines and mediums. Filmmakers, writers, game designers, biologists, geologists, linguists, architects, material scientists, and artists have assembled from around the world to lay the foundation for a new cultural monument.</p>
          </div>
        </div>

        <div className={styles.pallaxFaqItem}>
          <button className={styles.pallaxFaqQuestion} onClick={() => toggleFAQ(5)}>
            <span>Powered By Revolutionary Speculative Pedagogy</span>
            <span className={styles.pallaxFaqIcon}>{expandedFAQ === 5 ? '−' : '+'}</span>
          </button>
          <div className={`${styles.pallaxFaqAnswer} ${expandedFAQ === 5 ? styles.pallaxExpanded : ''}`}>
            <p>Much of MAYA&apos;s architecture emerged from a groundbreaking program created in partnership with CEPT University, India&apos;s premiere architecture institution. Led by visionary architect Shikha Parmar, thirty-two students across semesters at CEPT built the spatial lexicon of MAYA. Similar partnerships are underway at top schools around the world.</p>
          </div>
        </div>

        <div className={styles.pallaxFaqItem}>
          <button className={styles.pallaxFaqQuestion} onClick={() => toggleFAQ(6)}>
            <span>A Mirror For Civilization&apos;s Defining Struggles</span>
            <span className={styles.pallaxFaqIcon}>{expandedFAQ === 6 ? '−' : '+'}</span>
          </button>
          <div className={`${styles.pallaxFaqAnswer} ${expandedFAQ === 6 ? styles.pallaxExpanded : ''}`}>
            <p>MAYA holds a mirror to the conflicts of our civilization today: truth vs dogma, innovation vs stagnation, and freedom vs control. With an emotional, philosophical, and narrative depth that goes far beyond traditional &quot;good vs. evil&quot;, MAYA considers the defining struggle of our time: haves vs have-nots.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide19FAQ;
