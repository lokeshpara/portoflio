"use client";

import { useEffect, useRef, useState } from 'react';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import EducationSection from '@/components/sections/EducationSection';
import LoadingScreen from '@/components/LoadingScreen';

// Section reference component for direct navigation
const SectionReference = ({ id, title, onSectionClick }: { id: string; title: string; onSectionClick: (id: string) => void }) => {
  // Direct scroll function within the component
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSectionClick(id);
  };

  return (
    <a 
      href={`#${id}`}
      onClick={handleClick}
      className="text-green hover:text-lightest-slate transition-colors duration-200 ml-2"
      title={`Direct link to ${title} section`}
    >
      {/* Removed hover link icon */}
    </a>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  
  // Track whether we need to process scroll events
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Map of section IDs to their corresponding refs
  const sectionRefs = {
    'about': aboutRef,
    'experience': experienceRef,
    'projects': projectsRef,
    'education': educationRef,
    'blog': blogRef
  };

  // Simplified, lightweight smooth scroll function
  const smoothScrollTo = (element: HTMLElement) => {
    if (!element || !rightColumnRef.current) return;
    
    // Temporarily disable scroll handling during programmatic scrolling
    isScrollingRef.current = true;
    
    // Use minimal calculation for better performance
    const offset = 40;
    const top = element.offsetTop - offset;
    
    // Simple, direct scrolling
    rightColumnRef.current.scrollTo({
      top,
      behavior: 'smooth'
    });
    
    // Re-enable scroll handling after animation completes
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  };

  // Function to scroll to a specific section - minimal processing
  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    
    if (ref?.current && rightColumnRef.current) {
      // Update active section immediately for responsive UI
      setActiveSection(sectionId);
      
      // Call the scroll function
      smoothScrollTo(ref.current);
      
      // Update URL quietly without triggering scroll events
      history.replaceState(null, '', `#${sectionId}`);
    }
  };

  // Debounced scroll handler to minimize performance impact
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Skip if programmatic scrolling
    if (isScrollingRef.current) return;
    
    // Use requestAnimationFrame to limit scroll event processing
    requestAnimationFrame(() => {
      if (!e.currentTarget) return; // Add safety check
      const scrollPos = e.currentTarget.scrollTop;
      const threshold = 50;
      
      // Simplified section detection with minimal calculations
      let newActiveSection = activeSection;
      
      // Use a simple comparison approach for better performance
      if (aboutRef.current && scrollPos < (experienceRef.current?.offsetTop || Infinity) - threshold) {
        newActiveSection = 'about';
      } else if (experienceRef.current && scrollPos < (projectsRef.current?.offsetTop || Infinity) - threshold) {
        newActiveSection = 'experience';
      } else if (projectsRef.current && scrollPos < (blogRef.current?.offsetTop || Infinity) - threshold) {
        newActiveSection = 'projects';
      } else if (blogRef.current && scrollPos < (educationRef.current?.offsetTop || Infinity) - threshold) {
        newActiveSection = 'blog';
      } else if (educationRef.current) {
        newActiveSection = 'education';
      }
      
      // Only update if necessary
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    });
  };

  // Initialize scroll handling and navigation
  useEffect(() => {
    if (rightColumnRef.current) {
      // Apply hardware acceleration for smoother scrolling
      rightColumnRef.current.style.transform = 'translateZ(0)';
      
      // Add click handlers with passive event option for better performance
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const targetId = target.getAttribute('href')?.substring(1);
          if (targetId && sectionRefs[targetId as keyof typeof sectionRefs]?.current) {
            scrollToSection(targetId);
          }
        }, { passive: false });
      });
    }
    
    return () => {
      // Cleanup
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle initial loading
  useEffect(() => {
    // Simulate a minimum loading time to ensure the animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Debug useEffect to check if refs are properly initialized
  useEffect(() => {
    // Wait a bit to ensure DOM is rendered
    const timeoutId = setTimeout(() => {
      if (rightColumnRef.current) {
        // Add a clean event listener for smooth scroll on all navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const target = e.currentTarget as HTMLAnchorElement;
            const targetId = target.getAttribute('href')?.substring(1);
            if (targetId && sectionRefs[targetId as keyof typeof sectionRefs]?.current) {
              scrollToSection(targetId);
            }
          });
        });
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle initial hash scrolling and hash changes - simplified
  useEffect(() => {
    if (typeof window === 'undefined' || isLoading) return;
    
    // First render: check for hash in URL
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (hash && ['about', 'experience', 'projects', 'education', 'blog'].includes(hash)) {
        // Delay to ensure the DOM is fully ready
        setTimeout(() => {
          scrollToSection(hash);
        }, 500);
      }
    }
    
    // Add event listener for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && ['about', 'experience', 'projects', 'education', 'blog'].includes(hash)) {
        scrollToSection(hash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isLoading]);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    
    // Check on initial render
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Return loading screen while content is preparing
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Return main content once loading is complete
  return (
    <div className="bg-slate-900 min-h-screen py-12 md:py-20 lg:py-24 relative overflow-hidden" style={{ paddingTop: '1rem', paddingBottom: '1.5rem', fontFeatureSettings: "'ss01', 'ss02', 'cv01', 'cv02'" }}>
      {/* Background Spotlight Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-indigo-950/30 opacity-80" />
        
        {/* Static gradient elements instead of motion effects */}
        <div 
          className="absolute w-[150vw] h-[100vh] bg-gradient-to-b from-transparent via-green/30 to-transparent skew-y-12 rotate-12"
          style={{ top: '-50%', left: '-50%', opacity: 0.1 }}
        />
        
        <div 
          className="absolute w-[60vw] h-[60vh] bg-gradient-to-r from-green/30 to-emerald-400/20 rounded-full blur-[100px] opacity-70"
          style={{ top: '5%', left: '10%' }}
        />
        
        <div 
          className="absolute w-[70vw] h-[70vh] bg-gradient-to-br from-indigo-500/30 via-violet-500/25 to-purple-800/20 rounded-full blur-[120px] opacity-60"
          style={{ bottom: '-10%', right: '0%' }}
        />
        
        <div 
          className="absolute w-[40vw] h-[40vh] bg-gradient-to-tl from-blue-500/25 to-cyan-300/20 rounded-full blur-[80px] opacity-50"
          style={{ top: '60%', left: '40%' }}
        />
        
        <div 
          className="absolute w-[35vw] h-[35vh] bg-gradient-to-tr from-rose-500/20 to-pink-400/15 rounded-full blur-[90px] opacity-40"
          style={{ top: '30%', right: '10%' }}
        />
      </div>
      
      {/* Mobile View */}
      <div className={isMobile ? "block p-4 sm:p-6 md:p-8" : "hidden"} style={{ fontSize: 'small' }}>
        <header className="text-left mb-6 pt-6 sm:pt-8 relative p-3 rounded-lg">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-green/5 via-slate-800/80 to-slate-900 rounded-lg -z-10"
          />
          <h1 
            className="font-bold text-lightest-slate mb-2 tracking-tight"
            style={{ fontSize: 'xxx-large' }}
          >
            Lokesh Para
          </h1>
          
          <div
            className="flex items-center gap-1 mb-4"
          >
            <p 
              className="font-bold text-lightest-slate mb-2 tracking-tight"
              style={{ fontSize: 'medium' }}
            >
              Full Stack Developer
            </p>
          </div>
          
          <p 
            className="text-light-slate opacity-70 font-light tracking-wide mb-8"
            style={{ fontSize: 'small' }}
          >
            Building digital experiences that matter
          </p>
          
          <div className="social-container mobile-social">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub Profile"
            >
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn Profile"
            >
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            
            <a 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Twitter Profile"
            >
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            
            <a 
              href="mailto:john@doe.com" 
              className="email-link mobile-email"
            >
              john@doe.com
            </a>
          </div>
        </header>
        
        <main style={{ fontSize: 'small' }}>
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <BlogSection />
      </main>
      </div>
      
      {/* Desktop View - Optimized Structure for Performance */}
      <div className={isMobile ? "hidden" : "block p-0"}>
        {/* Fixed Left Column - No Scrolling */}
        <div className="fixed top-0 left-0 h-screen w-[calc(min(90vw,1000px)*0.4)] max-w-[400px] z-10" style={{ 
          marginLeft: 'calc((100vw - min(90vw, 1000px))/2)',
          top: '2rem'
        }}>
          <div className="flex flex-col h-full px-3 md:px-4 lg:px-5 xl:px-6">
            {/* Profile section - reduce margin */}
            <div className="relative mb-4" style={{ marginTop: '2rem' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-slate-800/80 to-slate-900 rounded-lg -z-10"/>
              <div className="p-3">
                <div className="flex items-start">
                  <div>
                    <h1 className="font-bold text-lightest-slate mb-2 tracking-tight" style={{ fontSize: 'xxx-large' }}>
                      Lokesh Para
                    </h1>
                    <div className="flex items-center gap-1 mb-4">
                      <p className="text-green font-bold font-mono tracking-tight" style={{ fontSize: 'large' }}>
                        Full Stack Developer
                      </p>
                    </div>
                    <p className="text-light-slate opacity-70 font-light tracking-wide mb-8" style={{ fontSize: 'small' }}>
                      Building digital experiences that matter
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="mb-8 pl-4" style={{ opacity: 1 }}>
              <ul className="flex flex-col" style={{ opacity: 1 }}>
                <li className="navlink-container" style={{ opacity: 1 }}>
                  <a 
                    href="#about"
                    className={`navlink ${activeSection === 'about' ? 'navlink-active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('about');
                    }}
                    style={{ opacity: 1 }}
                  >
                    <div className="navlink-indicator">
                      <div className="navlink-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                    <span className="navlink-text">About</span>
                  </a>
                </li>
                <li className="navlink-container" style={{ opacity: 1 }}>
                  <a 
                    href="#experience"
                    className={`navlink ${activeSection === 'experience' ? 'navlink-active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('experience');
                    }}
                    style={{ opacity: 1 }}
                  >
                    <div className="navlink-indicator">
                      <div className="navlink-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                    <span className="navlink-text">Experience</span>
                  </a>
                </li>
                <li className="navlink-container" style={{ opacity: 1 }}>
                  <a 
                    href="#projects"
                    className={`navlink ${activeSection === 'projects' ? 'navlink-active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('projects');
                    }}
                    style={{ opacity: 1 }}
                  >
                    <div className="navlink-indicator">
                      <div className="navlink-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                    <span className="navlink-text">Projects</span>
                  </a>
                </li>
                <li className="navlink-container" style={{ opacity: 1 }}>
                  <a 
                    href="#blog"
                    className={`navlink ${activeSection === 'blog' ? 'navlink-active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('blog');
                    }}
                    style={{ opacity: 1 }}
                  >
                    <div className="navlink-indicator">
                      <div className="navlink-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                    <span className="navlink-text">Blog</span>
                  </a>
                </li>
                <li className="navlink-container" style={{ opacity: 1 }}>
                  <a 
                    href="#education"
                    className={`navlink ${activeSection === 'education' ? 'navlink-active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('education');
                    }}
                    style={{ opacity: 1 }}
                  >
                    <div className="navlink-indicator">
                      <div className="navlink-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                    <span className="navlink-text">Education</span>
                  </a>
                </li>
              </ul>
            </nav>
            
            {/* Social links with icons instead of text */}
            <div className="mt-4 mb-6" style={{ opacity: 1 }}>
              <div className="social-container" style={{ opacity: 1 }}>
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub Profile"
                  style={{ opacity: 1 }}
                >
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 1 }}>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn Profile"
                  style={{ opacity: 1 }}
                >
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 1 }}>
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Twitter Profile"
                  style={{ opacity: 1 }}
                >
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 1 }}>
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
              </div>
              
              <div className="flex items-center" style={{ opacity: 1 }}>
                <a 
                  href="mailto:john@doe.com" 
                  className="email-link"
                  style={{ opacity: 1 }}
                >
                  john@doe.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Right Column */}
      <div 
        ref={rightColumnRef} 
        onScroll={handleScroll}
        className="h-screen overflow-y-auto pt-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          willChange: 'scroll-position', // Hint to browser to optimize scrolling
          transform: 'translateZ(0)', // Force hardware acceleration
          backfaceVisibility: 'hidden', // Reduce visual artifacts
          marginLeft: 'calc(min(90vw,1000px)*0.48)',
          width: 'calc(100% - calc(min(90vw,1000px)*0.48))'
        }}
      >
        <style jsx global>{`
          @media (min-width: 800px) {
            .lg\\:block {
              display: block;
            }
            .lg\\:hidden {
              display: none;
            }
          }
          @media (max-width: 799px) {
            .hidden.lg\\:block {
              display: none;
            }
            .block.lg\\:hidden {
              display: block;
            }
          }
          
          /* Hide scrollbars */
          ::-webkit-scrollbar {
            display: none;
          }
          
          /* List style reset for navigation */
          nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          /* Mobile list style reset */
          .mobile-social {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          /* Better section positioning with lightweight approach */
          .section-container {
            position: relative;
            padding-top: 20px;
            scroll-margin-top: 20px;
          }
          
          /* Optimize rendering during scrolling */
          @media (prefers-reduced-motion: no-preference) {
            .scroll-container {
              scroll-behavior: smooth;
            }
          }
          
          /* New Creative Line Animation - REMOVE FADES */
          @keyframes dash {
            from { stroke-dashoffset: 20; }
            to { stroke-dashoffset: 0; }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          
          /* Remove all animations that affect initial render */
          .navlink-container {
            opacity: 1 !important;
            animation: none !important;
            transform: none !important;
          }
          
          .social-container {
            display: flex;
            gap: 12px;
            margin-bottom: 12px;
            opacity: 1 !important;
          }
          
          .social-link,
          .email-link,
          .navlink,
          .navlink-icon,
          .navlink-text,
          .resume-btn,
          .mobile-social {
            opacity: 1 !important;
            animation: none !important;
          }
          
          /* Remove all animation delays */
          .navlink-container:nth-child(1),
          .navlink-container:nth-child(2),
          .navlink-container:nth-child(3),
          .navlink-container:nth-child(4),
          .navlink-container:nth-child(5),
          .social-link:nth-child(1),
          .social-link:nth-child(2),
          .social-link:nth-child(3) {
            animation-delay: 0s !important;
          }
          
          /* Keep hover animations */
          .navlink:hover .navlink-icon .line-svg,
          .navlink-active .navlink-icon .line-svg {
            width: 36px;
          }
          
          .navlink:hover .navlink-text {
            transform: translateX(5px);
            color: #64ffda;
            font-size: var(--nav-font-size-hover);
          }
          
          /* Mobile styles */
          .mobile-social {
            margin-top: 1rem;
            margin-bottom: 0;
            opacity: 1 !important;
          }
          
          /* Animation keyframes */
          @keyframes expandDots {
            0% { width: 20px; }
            50% { width: 35px; }
            100% { width: 40px; }
          }
          
          @keyframes glowPulse {
            0% { box-shadow: 0 0 2px #64ffda; }
            50% { box-shadow: 0 0 8px #64ffda; }
            100% { box-shadow: 0 0 2px #64ffda; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          
          /* List style reset for navigation */
          nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          /* Navlink container */
          .navlink-container {
            opacity: 1;
            margin-bottom: 10px;
          }
          
          /* Base navlink styles */
          .navlink {
            position: relative;
            display: flex;
            align-items: center;
            padding: 8px 0;
            opacity: 1;
            color: #8892b0;
            font-size: var(--nav-font-size);
            transition: color 0.3s ease;
          }
          
          .navlink:hover {
            color: #64ffda;
          }
          
          /* Creative dots/dash indicator */
          .navlink-indicator {
            position: relative;
            height: 20px;
            width: 40px;
            margin-right: 12px;
            display: flex;
            align-items: center;
          }
          
          .navlink-indicator::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 2px;
            background: transparent;
            transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .navlink-dots {
            display: flex;
            align-items: center;
            height: 100%;
            transition: transform 0.3s ease;
          }
          
          .dot {
            width: 4px;
            height: 4px;
            margin-right: 3px;
            background-color: #64ffda;
            border-radius: 50%;
            opacity: 0.7;
            transition: all 0.3s ease;
          }
          
          .dot:nth-child(1) { transition-delay: 0.05s; }
          .dot:nth-child(2) { transition-delay: 0.1s; }
          .dot:nth-child(3) { transition-delay: 0.15s; }
          .dot:nth-child(4) { transition-delay: 0.2s; transition: all 0.3s ease, opacity 0.5s ease; opacity: 0; }
          .dot:nth-child(5) { transition-delay: 0.25s; transition: all 0.3s ease, opacity 0.5s ease; opacity: 0; }
          
          /* Hover and active effects */
          .navlink:hover .dot,
          .navlink-active .dot {
            opacity: 1;
            animation: float 2s infinite ease-in-out;
          }
          
          .navlink:hover .dot:nth-child(4),
          .navlink:hover .dot:nth-child(5),
          .navlink-active .dot:nth-child(4),
          .navlink-active .dot:nth-child(5) {
            opacity: 1;
          }
          
          .navlink:hover .dot:nth-child(1),
          .navlink-active .dot:nth-child(1) {
            animation-delay: 0.1s;
          }
          
          .navlink:hover .dot:nth-child(2),
          .navlink-active .dot:nth-child(2) {
            animation-delay: 0.2s;
          }
          
          .navlink:hover .dot:nth-child(3),
          .navlink-active .dot:nth-child(3) {
            animation-delay: 0.3s;
          }
          
          .navlink:hover .dot:nth-child(4),
          .navlink-active .dot:nth-child(4) {
            animation-delay: 0.4s;
          }
          
          .navlink:hover .dot:nth-child(5),
          .navlink-active .dot:nth-child(5) {
            animation-delay: 0.5s;
          }
          
          /* Text animation */
          .navlink-text {
            position: relative;
            opacity: 1;
            font-weight: 500;
            letter-spacing: 0.5px;
            transition: transform 0.3s ease, color 0.3s ease;
          }
          
          .navlink:hover .navlink-text,
          .navlink-active .navlink-text {
            transform: translateX(5px);
            color: #64ffda;
          }
          
          .navlink-active .navlink-text {
            color: #64ffda;
          }
        `}</style>
        
        {/* Content container */}
        <div className="mx-auto" style={{ 
          width: '85%',
          maxWidth: '670px',
          paddingRight: '1rem',
          paddingLeft: '1rem',
          marginTop: '1.5rem', 
          marginBottom: '1rem',
          overflow: 'hidden'
        }}>
          <div 
            className="bg-slate-900/50 rounded-lg shadow-lg backdrop-blur-sm"
            id="content-column"
          >
            <div className="px-6 py-12">
              <section ref={aboutRef} id="about" className="right-column-section mb-24 section-container">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold text-lightest-slate hidden">About</h2>
                  <SectionReference id="about" title="About" onSectionClick={scrollToSection} />
                </div>
                <AboutSection />
              </section>
              
              <section ref={experienceRef} id="experience" className="right-column-section mb-24 section-container">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold text-lightest-slate hidden">Experience</h2>
                  <SectionReference id="experience" title="Experience" onSectionClick={scrollToSection} />
                </div>
                <ExperienceSection />
              </section>
              
              <section ref={projectsRef} id="projects" className="right-column-section mb-24 section-container">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold text-lightest-slate hidden">Projects</h2>
                  <SectionReference id="projects" title="Projects" onSectionClick={scrollToSection} />
                </div>
                <ProjectsSection />
              </section>
              
              <section ref={blogRef} id="blog" className="right-column-section mb-24 section-container">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold text-lightest-slate hidden">Blog</h2>
                  <SectionReference id="blog" title="Blog" onSectionClick={scrollToSection} />
                </div>
                <BlogSection />
              </section>
              
              <section ref={educationRef} id="education" className="right-column-section section-container">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold text-lightest-slate hidden">Education</h2>
                  <SectionReference id="education" title="Education" onSectionClick={scrollToSection} />
                </div>
                <EducationSection />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
