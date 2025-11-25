"use client";
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import styles from './FixedHeader.module.css';
 

export const FixedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const menuRef = useRef(null);
  const cubeRef = useRef(null);

  // Track window width for responsive font sizing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        cubeRef.current &&
        !menuRef.current.contains(event.target) &&
        !cubeRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleCubeClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isMobile = windowWidth <= 768;

  return (
    <>
      {/* Fixed Hamburger Menu at Top Right */}
      <div className={styles.fixedSmallCubeGrid}>
        <StyledHamburgerWrapper ref={cubeRef}>
          <label className="hamburger" onClick={handleCubeClick}>
            <svg viewBox="0 0 32 32" className={isMenuOpen ? 'checked' : ''}>
              <path d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" className="line line-top-bottom" />
              <path d="M7 16 27 16" className="line" />
            </svg>
          </label>
        </StyledHamburgerWrapper>

        {/* Desktop Menu Container - Horizontal bar */}
        {!isMobile && (
          <StyledMenuWrapper ref={menuRef} $isVisible={isMenuOpen}>
            <div className="nav">
              <div className="container">
                <a className="btn" href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a className="btn" href="/rooms" onClick={() => setIsMenuOpen(false)}>Rooms</a>
                <a className="btn" href="/experiences" onClick={() => setIsMenuOpen(false)}>Experiences</a>
                <a className="btn" href="/explorations" onClick={() => setIsMenuOpen(false)}>Explorations</a>
                <a className="btn" href="/wellness" onClick={() => setIsMenuOpen(false)}>Wellness</a>
                <a className="btn" href="/events" onClick={() => setIsMenuOpen(false)}>Events</a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 60" height={60} width={600} overflow="visible" className="outline">
                  <rect strokeWidth={2} fill="transparent" height={60} width={600} y={0} x={0} pathLength={100} className="rect" />
                </svg>
              </div>
            </div>
          </StyledMenuWrapper>
        )}
      </div>

      {/* Mobile Sidebar - Slides in from right */}
      {isMobile && (
        <>
          {/* Backdrop/Overlay */}
          <StyledMobileBackdrop
            $isVisible={isMenuOpen}
            onClick={handleCubeClick}
          />

          {/* Mobile Sidebar */}
          <StyledMobileSidebar ref={menuRef} $isVisible={isMenuOpen}>
            <div className={styles.mobileSidebarHeader}>
              <h3 style={{
                fontFamily: '"Full Moon BT W01 Falling Leav", "satoshi", sans-serif',
                fontSize: '24px',
                color: '#00e87b',
                fontWeight: 'normal',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: 0
              }}>
                Menu
              </h3>
              <button
                onClick={handleCubeClick}
                className={styles.mobileSidebarClose}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#00e87b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className={styles.mobileSidebarContent}>
              <a className={styles.mobileSidebarItem} href="/" onClick={handleCubeClick}>
                <span>Home</span>
              </a>
              <a className={styles.mobileSidebarItem} href="/rooms" onClick={handleCubeClick}>
                <span>Rooms</span>
              </a>
              <a className={styles.mobileSidebarItem} href="/experiences" onClick={handleCubeClick}>
                <span>Experiences</span>
              </a>
              <a className={styles.mobileSidebarItem} href="/explorations" onClick={handleCubeClick}>
                <span>Explorations</span>
              </a>
              <a className={styles.mobileSidebarItem} href="/wellness" onClick={handleCubeClick}>
                <span>Wellness</span>
              </a>
              <a className={styles.mobileSidebarItem} href="/events" onClick={handleCubeClick}>
                <span>Events</span>
              </a>
            </div>
          </StyledMobileSidebar>
        </>
      )}
    </>
  );
};

const StyledMenuWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 100%;
  margin-right: 8px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transform: ${props => props.$isVisible ? 'translateY(-50%) translateX(0) scale(0.7)' : 'translateY(-50%) translateX(10px) scale(0.7)'};
  transform-origin: right center;
  transition: all 0.3s ease;
  z-index: 1004;

  .outline {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 40.9 9.1 40.9 9.1 0;
    transition: 0.5s;
    stroke: #00e87b;
  }

  .nav {
    position: relative;
    width: 600px;
    height: 60px;
    border-radius: 40px;
  }

  .container:hover .outline .rect {
    transition: 999999s;
    stroke-dashoffset: 1;
    stroke-dasharray: 0;
  }

  .container {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    padding: 0.5em;
  }

  .btn {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 0;
    color: #fff;
    cursor: pointer;
    transition: 0.1s;
    font-family: "Full Moon BT W01 Falling Leav", "satoshi", sans-serif;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
  }

  .btn:hover {
    background: #00e87b;
    color: #000;
    border-radius: 10px;
  }

  /* LORE */
  .btn:nth-child(1):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 1.3 5.0 82.9 5.0 5.8;
  }

  /* WORLD */
  .btn:nth-child(2):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 8.9 5.0 67.7 5.0 13.4;
  }

  /* PLAYBOOK */
  .btn:nth-child(3):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 16.5 5.0 52.5 5.0 21.0;
  }

  /* UNLOCK */
  .btn:nth-child(4):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 24.1 5.0 37.3 5.0 28.6;
  }

  /* LEVELS */
  .btn:nth-child(5):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 31.7 5.0 22.1 5.0 36.2;
  }

  /* PLAY */
  .btn:nth-child(6):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 39.3 5.0 6.9 5.0 43.8;
  }

  .btn:hover ~ .outline .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 0 10 40 10 40;
    transition: 0.5s !important;
  }
`;

const StyledHamburgerWrapper = styled.div`
  .hamburger {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hamburger svg {
    height: 42px;
    width: 42px;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: #00e87b;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger svg.checked {
    transform: rotate(-45deg);
  }

  .hamburger svg.checked .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;

const StyledMobileBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1002;
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const StyledMobileSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  max-width: 85vw;
  height: 100vh;
  background: #000000;
  border-left: 1px solid rgba(0, 232, 123, 0.2);
  z-index: 1003;
  transform: ${props => props.$isVisible ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
`;

