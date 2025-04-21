"use client";
import { useEffect } from 'react';

export default function EnvDetector() {
  useEffect(() => {
    // Check if we're in production and on GitHub Pages
    if (typeof window !== 'undefined') {
      if (window.location.hostname === 'lokeshpara.github.io' || 
          window.location.href.includes('/portfolio-1')) {
        document.documentElement.classList.add('production');
        console.log('Running in production mode - GitHub Pages');
      } else {
        console.log('Running in development mode - Local');
      }
    }
  }, []);

  // This component doesn't render anything
  return null;
} 