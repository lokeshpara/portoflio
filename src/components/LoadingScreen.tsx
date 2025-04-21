"use client";

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [counter, setCounter] = useState(0);
  const [commandLines, setCommandLines] = useState<string[]>([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 600);
      }
    };
    
    // Check on mount
    checkMobile();
    
    // Listen for resize events
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
    }
    
    // Set a small timeout before starting animations to ensure smooth appearance
    const initialTimer = setTimeout(() => {
      setFadeIn(true);
    }, 10);

    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 15);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

  useEffect(() => {
    // Add command lines at specific percentages to simulate terminal output
    if (counter === 5) {
      setCommandLines(prev => [...prev, "$ Initializing portfolio application..."]);
    } else if (counter === 20) {
      setCommandLines(prev => [...prev, "$ Loading project data..."]);
    } else if (counter === 40) {
      setCommandLines(prev => [...prev, "$ Preparing assets and resources..."]);
    } else if (counter === 60) {
      setCommandLines(prev => [...prev, "$ Building user interface components..."]);
    } else if (counter === 80) {
      setCommandLines(prev => [...prev, "$ Optimizing performance..."]);
    } else if (counter === 95) {
      setCommandLines(prev => [...prev, "$ Final preparations..."]);
    } else if (counter === 100) {
      setCommandLines(prev => [...prev, "$ Portfolio ready. Launching..."]);
    }
  }, [counter]);

  // Simplify command lines on mobile
  const getCommandLines = () => {
    if (isMobile) {
      // On mobile, show fewer command lines to save space
      const filteredLines = commandLines.slice(Math.max(0, commandLines.length - 2));
      return (
        <>
          <div className="loading-initial-line">$ Loading portfolio...</div>
          {filteredLines.map((line, index) => (
            <div key={index} className="loading-command-line">{line}</div>
          ))}
        </>
      );
    }
    
    // On desktop, show the most recent 3-4 lines to keep it compact
    const filteredLines = commandLines.slice(Math.max(0, commandLines.length - 3));
    return (
      <>
        <div className="loading-initial-line">$ Portfolio loading sequence initiated</div>
        {filteredLines.map((line, index) => (
          <div key={index} className="loading-command-line">{line}</div>
        ))}
      </>
    );
  };
  
  // Define styles as objects to avoid SSR issues
  const terminalContainerStyle = {
    width: '90%',
    maxWidth: '550px',
    height: 'auto',
    minHeight: isMobile ? '200px' : '230px',
    maxHeight: '60vh',
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
    fontFamily: 'monospace',
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? 'scale(1)' : 'scale(0.98)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  };
  
  const terminalHeaderStyle = {
    height: isMobile ? '26px' : '30px',
    backgroundColor: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    position: 'relative' as const,
    justifyContent: 'space-between',
  };
  
  const terminalBodyStyle = {
    padding: isMobile ? '8px' : '12px',
    height: isMobile ? 'calc(100% - 26px)' : 'calc(100% - 30px)',
    minHeight: isMobile ? '160px' : '180px',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    color: '#adbac7',
  };
  
  const progressBarStyle = {
    width: `${counter}%`,
    height: '100%',
    backgroundColor: '#64ffda',
    boxShadow: '0 0 5px rgba(100, 255, 218, 0.5)',
    transition: 'width 0.1s linear',
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a192f',
        zIndex: 9999,
      }}
    >
      <div style={terminalContainerStyle}>
        <div style={terminalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f57', marginRight: '6px' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#febc2e', marginRight: '6px' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c840', marginRight: '6px' }}></div>
          </div>
          <div style={{ color: '#adbac7', fontSize: '12px' }}>Portfolio.exe</div>
        </div>
        <div style={terminalBodyStyle}>
          <div style={{ 
            flexGrow: 1, 
            overflowY: 'auto' as const,
            marginBottom: '12px',
            fontSize: isMobile ? '12px' : '13px',
            lineHeight: isMobile ? '1.4' : '1.5',
          }}>
            {getCommandLines()}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              marginTop: '12px',
              flexWrap: 'wrap' as const,
              gap: '5px',
              rowGap: isMobile ? '6px' : '5px',
            }}>
              <span style={{ color: '#64ffda', marginRight: '5px' }}>$</span>
              <span className="terminal-cursor">Progress: </span>
              <div style={{ 
                width: '60%',
                maxWidth: '200px',
                height: isMobile ? '8px' : '10px',
                backgroundColor: '#1e293b',
                borderRadius: '5px',
                overflow: 'hidden',
                border: '1px solid #2d3748',
                flexGrow: 1,
              }}>
                <div style={progressBarStyle}></div>
              </div>
              <span style={{ 
                color: '#64ffda', 
                fontWeight: 'bold',
                fontSize: isMobile ? '12px' : 'inherit',
                marginLeft: isMobile ? 'auto' : undefined
              }}>
                {counter}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .loading-initial-line, .loading-command-line {
          margin-bottom: 8px;
          opacity: 0.9;
          word-wrap: break-word;
          word-break: break-word;
          animation: typingEffect 0.5s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        @keyframes typingEffect {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 0.9; transform: translateY(0); }
        }
        
        .terminal-cursor::after {
          content: '';
          display: inline-block;
          width: 7px;
          height: 13px;
          background-color: #64ffda;
          animation: blink 1s step-end infinite;
          margin-left: 2px;
          vertical-align: middle;
        }
        
        @media (max-width: 600px) {
          .terminal-cursor::after {
            height: 11px;
            width: 6px;
          }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
} 