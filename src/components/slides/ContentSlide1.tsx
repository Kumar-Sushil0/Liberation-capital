"use client";

import { useState } from 'react';
import { VibeCheckButton } from '../VibecheckButton/VibeCheckButton';

export const ContentSlide1 = () => {
  const [isHovered, setIsHovered] = useState(false);

  const textStyle = {
    fontSize: 'clamp(0.75rem, 1.6vw, 1rem)',
    lineHeight: 1.5,
    margin: 0
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem'
    }}>
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Opening italic statement */}
        <p style={{ 
          ...textStyle,
          color: '#b8b8b8',
          fontStyle: 'italic',
          
        }}>
          Where online acceleration meets monastic incubation... and humans become investable.
        </p>

        {/* What it's not and what it is */}
        <p style={{ ...textStyle, color: '#b8b8b8',
          fontStyle: 'italic', }}>
          This is not Y Combinator... This is not a retreat. This is not a course... This is about FUNDING LIFE
        </p>

        <p style={{ ...textStyle, color: '#b8b8b8',
          fontStyle: 'italic', }}>
          This is a human evolution accelerator with Design Mechanics & Game Theory, built for two tribes:
        </p>

        {/* Two tribes side by side with button in middle */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '2rem',
          marginBottom: '5rem',
          marginTop: '5rem',
          alignItems: 'center'
        }}>
          {/* Become Player */}
          <div style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: isHovered ? 'auto' : 'none'
          }}>
            <p style={{ ...textStyle, color: '#00e87b', marginBottom: '0.5rem', fontFamily:'"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', textTransform:'uppercase'}}>
              <strong>Become Player →</strong>
            </p>
             <p style={{ ...textStyle, color: '#b8b8b8', fontStyle: 'italic', paddingLeft: '1rem' }}>
              Apply as Player (Accelerator → Pitch)
            </p>
            <p style={{ ...textStyle, color: '#b8b8b8', fontStyle: 'italic', marginBottom: '0.3rem', paddingLeft: '1rem' }}>
              Your game of life is the due diligence.
            </p>
           
          </div>

          {/* VibeCheck Button */}
          <div 
            style={{ display: 'flex', justifyContent: 'center' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <VibeCheckButton inline={true} currentSection={0} onClick={() => {}} />
          </div>

          {/* Become Patron */}
          <div style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: isHovered ? 'auto' : 'none'
          }}>
            <p style={{ ...textStyle, color: '#00e87b', marginBottom: '0.5rem', fontFamily:'"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', textTransform:'uppercase' }}>
              <strong>← Become Patron</strong>
            </p>
             <p style={{ ...textStyle, color: '#b8b8b8', fontStyle: 'italic', paddingLeft: '1rem' }}>
              Apply as Angel Investor 
            </p>
            <p style={{ ...textStyle, color: '#b8b8b8', fontStyle: 'italic', marginBottom: '0.3rem', paddingLeft: '1rem' }}>
              Invest in human capital, not hype.
            </p>
           
          </div>
        </div>

        {/* Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          
          border: '1px solid #333',
          fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
          tableLayout: 'auto'
        }}>
          <tbody>
            <tr>
              <td style={{
                color: '#00e87b',
                fontWeight: 'bold',
                padding: '0.5rem 0.6rem',
                borderRight: '1px solid #333',
                verticalAlign: 'top',
                fontFamily:'"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', 
                textTransform:'uppercase',
                whiteSpace: 'nowrap'
              }}>
                Up to $100,000 -
              </td>
              <td style={{
                color: '#00e87b',
                fontWeight: 'bold',
                padding: '0.5rem 0.6rem',
                borderRight: '1px solid #333',
                verticalAlign: 'top',
                fontFamily:'"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', 
                textTransform:'uppercase',
                whiteSpace: 'nowrap'
              }}>
                No equity in identity
              </td>
              <td style={{
                color: '#00e87b',
                fontWeight: 'bold',
                padding: '0.5rem 0.6rem',
                borderRight: '1px solid #333',
                verticalAlign: 'top',
                fontFamily:'"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', 
                textTransform:'uppercase',
                whiteSpace: 'nowrap'
              }}>
                Principal + 10% / 3 years
              </td>
              <td style={{
                color: '#00e87b',
                fontWeight: 'bold',
                padding: '0.5rem 0.6rem',
                verticalAlign: 'top',
                fontFamily:'"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', 
                textTransform:'uppercase',
                whiteSpace: 'nowrap'
              }}>
                Optional legacy: 2% honor-based
              </td>
            </tr>
            <tr>
              <td style={{
                color: '#b8b8b8',
                padding: '0.5rem 0.6rem',
                borderRight: '1px solid #333',
                borderTop: '1px solid #333',
                verticalAlign: 'top',
                fontFamily:'"Full Moon BT W01 Falling Leav", "satoshi", sans-serif', 
                textTransform:'uppercase',
                whiteSpace: 'nowrap'
              }}>
                Capital becomes scaffolding
              </td>
              <td style={{
                color: '#b8b8b8',
                padding: '0.5rem 0.6rem',
                borderRight: '1px solid #333',
                borderTop: '1px solid #333',
                verticalAlign: 'top',
                whiteSpace: 'nowrap'
              }}>
                Identity becomes architecture
              </td>
              <td style={{
                color: '#b8b8b8',
                padding: '0.5rem 0.6rem',
                borderRight: '1px solid #333',
                borderTop: '1px solid #333',
                verticalAlign: 'top',
                whiteSpace: 'nowrap'
              }}>
                Your evolution becomes the application.
              </td>
              <td style={{
                color: '#b8b8b8',
                padding: '0.5rem 0.6rem',
                borderTop: '1px solid #333',
                verticalAlign: 'top',
                whiteSpace: 'nowrap'
              }}>
                Coherence becomes proof
              </td>
            </tr>
          </tbody>
        </table>

        {/* Terms text */}
        <p style={{
          fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
          color: '#888',
          marginTop: '0.75rem',
          fontStyle: 'italic'
        }}>
          *Terms and eligibility apply.
        </p>
      </div>
    </div>
  );
};
