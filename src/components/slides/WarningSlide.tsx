"use client";
import { createLiberationCapitalMeeting } from '../../utils/calendar';

export const WarningSlide = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      gap: '0.75rem'
    }}>
      {/* Warning Box */}
      <div style={{
        fontFamily: '"satoshi", sans-serif',
        fontSize: '13px',
        fontWeight: 500,
        textAlign: 'center',
        margin: '0 auto',
        maxWidth: '600px',
        lineHeight: 1.5,
        background: '#000000',
        borderLeft: '2px solid #ffe61d',
        borderRight: '2px solid #ffe61d',
        borderBottom: '2px solid #ffe61d',
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          background: '#ffe61d', 
          padding: '6px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px' 
        }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            style={{ width: '18px', height: '18px', color: '#000000' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" 
            />
          </svg>
          <span style={{ 
            color: '#000000', 
            fontWeight: '700', 
            fontSize: '14px', 
            letterSpacing: '1.2px' 
          }}>
            WARNING
          </span>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <div style={{ 
            color: '#ffffff', 
            fontWeight: '400', 
            fontSize: '13px',
            marginBottom: '8px'
          }}>
            The philosophy of <strong>LIBERATION CAPITAL</strong> may disrupt your default settings.
          </div>
          <div style={{ 
            color: '#ffffff', 
            fontWeight: '400', 
            fontSize: '13px',
            marginBottom: '12px'
          }}>
            Enter website only when you can give <strong>15 uninterrupted minutes</strong> to wrestle with new kind of reality.
          </div>
          
          {/* Clickable Text */}
          <a
            href="#"
            style={{
              fontFamily: '"satoshi", sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#00e87b',
              textDecoration: 'underline',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease',
              display: 'block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onClick={(e) => {
              e.preventDefault();
              const calendarLink = createLiberationCapitalMeeting();
              window.open(calendarLink, '_blank');
            }}
          >
            Choose a time when you're ready to think, not react.
          </a>
        </div>
      </div>

    </div>
  );
};
