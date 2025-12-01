import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const VibeCheckButton = ({ currentSection, inline = false, sections = [] }) => {
  const [autoHover, setAutoHover] = useState(false);
  const timeoutRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const isPausedRef = useRef(false);
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (isPausedRef.current) return;
    timeoutRef.current = setTimeout(() => {
      if (isPausedRef.current) return;
      setAutoHover(true);
      hoverTimeoutRef.current = setTimeout(() => {
        setAutoHover(false);
      }, 1500);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [currentSection]);
  const handleClick = () => {
    window.open('https://app.lifeidesign.games', '_blank');
  };

  // For inline version, always show. For fixed version, check currentSection
  // Hide on slide 1 (currentSection === 0) and second-to-last slide (gamePass)
  // gamePass is at index 19 on desktop (21 sections) and index 21 on mobile (23 sections)
  const gamePassIndex = sections.length > 0 ? sections.length - 2 : 19;
  if (!inline && (currentSection < 1 || currentSection === gamePassIndex)) {
    return null;
  }

  const wrapperStyle = inline 
    ? { position: 'relative', display: 'inline-block' }
    : { position: 'fixed', bottom: '50px', right: '50px', zIndex: 1000, transform: 'scale(0.8)', transformOrigin: 'bottom right' };

  const handleMouseEnter = () => {
    isPausedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setAutoHover(false);
  };
  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };
  const handleFocus = () => {
    isPausedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setAutoHover(false);
  };
  const handleBlur = () => {
    isPausedRef.current = false;
  };

  return (
    <StyledWrapper style={wrapperStyle}>
      <div
        className={`btn-container${autoHover ? ' auto-hover' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div className="btn-drawer transition-top">Test Your...</div>
        <div className="btn-drawer transition-bottom">...in 60 sec</div>
        <button className="btn" onClick={handleClick}>
          <span className="btn-text">Game Vibe</span>
        </button>
        <svg className="btn-corner" xmlns="http://www.w3.org/2000/svg" viewBox="-1 1 32 32">
          <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
        </svg>
        <svg className="btn-corner" xmlns="http://www.w3.org/2000/svg" viewBox="-1 1 32 32">
          <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
        </svg>
        <svg className="btn-corner" xmlns="http://www.w3.org/2000/svg" viewBox="-1 1 32 32">
          <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
        </svg>
        <svg className="btn-corner" xmlns="http://www.w3.org/2000/svg" viewBox="-1 1 32 32">
          <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn-container {
    --btn-color: #d8ff7c;
    --corner-color: rgba(136, 136, 136, 0.3);
    --corner-dist: 24px;
    --corner-multiplier: 1.5;
    --timing-function: cubic-bezier(0, 0, 0, 2.5);
    --duration: 250ms;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn {
    position: relative;
    min-width: 160px;
    min-height: calc(var(--corner-dist) * 2);
    border: 4px solid #00e87b;
    padding: 0.25em 1em;

    background: #000;
    box-shadow:
      1px 1px 2px -1px #fff inset,
      0 2px 1px #00000010,
      0 4px 2px #00000010,
      0 8px 4px #00000010,
      0 16px 8px #00000010,
      0 32px 16px #00000010;

    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function);
    -webkit-transition:
      transform var(--duration) var(--timing-function),
      -webkit-filter var(--duration) var(--timing-function);

    cursor: pointer;
  }

  .btn-drawer {
    position: absolute;
    display: flex;
    justify-content: center;

    min-height: 32px;
    border-radius: 16px;
    border: none;
    padding: 0.25em 1em;
    font-size: 0.8em;
    font-weight: 600;
    font-family: "Poppins", monospace;
    color: #000;

    background: #e0e0e0;
    opacity: 0;

    transition:
      transform calc(0.5 * var(--duration)) ease,
      filter var(--duration) var(--timing-function),
      opacity calc(0.5 * var(--duration)) ease;
    -webkit-transition:
      transform calc(0.5 * var(--duration)) ease,
      -webkit-filter var(--duration) var(--timing-function),
      opacity calc(0.5 * var(--duration)) ease;
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }

  .transition-top {
    top: 0;
    left: 0;
    border-radius: 12px 12px 0 0;
    align-items: start;
  }
  .transition-bottom {
    bottom: 0;
    right: 0;
    border-radius: 0 0 12px 12px;
    align-items: end;
  }

  .btn-text {
    display: inline-block;

    font-size: 1.25em;
    font-family: "Full Moon BT W01 Falling Leav", "satoshi", sans-serif;
    font-weight: 600;
    color: #00e87b;
    text-transform: uppercase;

    filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006);
    -webkit-filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006);

    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function),
      color var(--duration) var(--timing-function);
    -webkit-transition:
      transform var(--duration) var(--timing-function),
      -webkit-filter var(--duration) var(--timing-function),
      color var(--duration) var(--timing-function);
  }

  .btn-corner {
    position: absolute;
    width: 32px;

    fill: none;
    stroke: var(--corner-color);

    transition:
      transform var(--duration) var(--timing-function),
      filter var(--duration) var(--timing-function);
    -webkit-transition:
      transform var(--duration) var(--timing-function),
      -webkit-filter var(--duration) var(--timing-function);
  }

  .btn-corner:nth-of-type(1) {
    top: 0;
    left: 0;
    transform: translate(
        calc(-1 * var(--corner-dist)),
        calc(-1 * var(--corner-dist))
      )
      rotate(90deg);
  }
  .btn-corner:nth-of-type(2) {
    top: 0;
    right: 0;
    transform: translate(var(--corner-dist), calc(-1 * var(--corner-dist)))
      rotate(180deg);
  }
  .btn-corner:nth-of-type(3) {
    bottom: 0;
    right: 0;
    transform: translate(var(--corner-dist), var(--corner-dist)) rotate(-90deg);
  }
  .btn-corner:nth-of-type(4) {
    bottom: 0;
    left: 0;
    transform: translate(calc(-1 * var(--corner-dist)), var(--corner-dist))
      rotate(0deg);
  }

  .btn-container:has(.btn:hover),
  .btn-container:has(.btn:focus-visible) {
    .btn {
      transform: scale(1.05);
      filter: drop-shadow(0 16px 16px #0002);
      -webkit-filter: drop-shadow(0 16px 16px #0002);
    }
    .transition-top {
      transform: translateY(-24px) rotateZ(4deg);
      filter: blur(0px);
      -webkit-filter: blur(0px);
      opacity: 1;
    }
    .transition-bottom {
      transform: translateY(24px) rotateZ(4deg);
      filter: blur(0px);
      -webkit-filter: blur(0px);
      opacity: 1;
    }
    .btn-text {
      filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      -webkit-filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      transform: scale(1.05);
      color: #00e87b;
      text-transform: uppercase;
    }

    --corner-color: rgba(170, 170, 170, 0.5);
    .btn-corner:first-of-type {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(90deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
    .btn-corner:nth-of-type(2) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(180deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
    @-moz-document url-prefix() {
      .btn-corner:nth-of-type(2) {
        filter: drop-shadow(10px -10px 1px var(--corner-color))
          drop-shadow(20px -20px 2px var(--corner-color));
      }
    }
    .btn-corner:nth-of-type(3) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(-90deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
    .btn-corner:nth-of-type(4) {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(0deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
  }

  .btn-container.auto-hover {
    .btn {
      transform: scale(1.05);
      filter: drop-shadow(0 16px 16px #0002);
      -webkit-filter: drop-shadow(0 16px 16px #0002);
    }
    .transition-top {
      transform: translateY(-24px) rotateZ(4deg);
      filter: blur(0px);
      -webkit-filter: blur(0px);
      opacity: 1;
    }
    .transition-bottom {
      transform: translateY(24px) rotateZ(4deg);
      filter: blur(0px);
      -webkit-filter: blur(0px);
      opacity: 1;
    }
    .btn-text {
      filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      -webkit-filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      transform: scale(1.05);
      color: #00e87b;
      text-transform: uppercase;
    }

    --corner-color: rgba(170, 170, 170, 0.5);
    .btn-corner:first-of-type {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(90deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
    .btn-corner:nth-of-type(2) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(180deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
    @-moz-document url-prefix() {
      .btn-corner:nth-of-type(2) {
        filter: drop-shadow(10px -10px 1px var(--corner-color))
          drop-shadow(20px -20px 2px var(--corner-color));
      }
    }
    .btn-corner:nth-of-type(3) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(-90deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
    .btn-corner:nth-of-type(4) {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(0deg);
      filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 1px var(--corner-color))
        drop-shadow(-20px 20px 2px var(--corner-color));
    }
  }

  .btn-container:has(.btn:active) {
    .btn {
      transform: scale(0.95);
      filter: drop-shadow(0 10px 4px #0002);
      -webkit-filter: drop-shadow(0 10px 4px #0002);
    }
    .transition-top,
    .transition-bottom {
      transform: translateY(0px) scale(0.5);
    }
    .btn-text {
      filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      -webkit-filter: drop-shadow(0 1px 0 #fff6) drop-shadow(0 -1px 0 #0006)
        drop-shadow(0px 6px 2px #0003);
      transform: scale(1);
      color: #00e87b;
    }
    --corner-color: rgba(204, 204, 204, 0.6);
    --corner-multiplier: 0.95;
    .btn-corner:first-of-type {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(90deg);
      filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
    }
    .btn-corner:nth-of-type(2) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(-1 * var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(180deg);
      filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
    }
    @-moz-document url-prefix() {
      .btn-corner:nth-of-type(2) {
        filter: drop-shadow(10px -10px 2px var(--corner-color))
          drop-shadow(20px -20px 3px var(--corner-color));
      }
    }
    .btn-corner:nth-of-type(3) {
      transform: translate(
          calc(var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(-90deg);
      filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
    }
    .btn-corner:nth-of-type(4) {
      transform: translate(
          calc(-1 * var(--corner-multiplier) * var(--corner-dist)),
          calc(var(--corner-multiplier) * var(--corner-dist))
        )
        rotate(0deg);
      filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
      -webkit-filter: drop-shadow(-10px 10px 2px var(--corner-color))
        drop-shadow(-20px 20px 3px var(--corner-color));
    }
  }

  @keyframes hue-anim {
    0%,
    100% {
      filter: hue-rotate(0deg);
      -webkit-filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(-70deg);
      -webkit-filter: hue-rotate(-70deg);
    }
  }
  @-webkit-keyframes hue-anim {
    0%,
    100% {
      -webkit-filter: hue-rotate(0deg);
    }
    50% {
      -webkit-filter: hue-rotate(-70deg);
    }
  }

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    &[style*="position: fixed"] {
      left: 50% !important;
      right: auto !important;
      transform: translateX(-50%) scale(0.7) !important;
      transform-origin: bottom center !important;
      bottom: 50px !important;
    }
  }

  @media (max-width: 480px) {
    &[style*="position: fixed"] {
      transform: translateX(-50%) scale(0.6) !important;
      bottom: 40px !important;
    }
  }
`;

