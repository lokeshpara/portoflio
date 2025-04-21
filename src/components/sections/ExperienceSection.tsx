"use client";

const experiences = [
  {
    period: "dec 2024 — Present",
    positions: [
      "Senior Frontend Engineer, Accessibility"
    ],
    company: "Klaviyo",
    description: "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
    technologies: ["JavaScript", "TypeScript", "React", "Storybook"],
    url: "https://www.klaviyo.com/"
  },
  {
    period: "may 2018 — dec 2024",
    positions: [
      "Lead Engineer",
      "Senior Engineer",
      "Engineer"
    ],
    company: "Upstatement",
    description: "Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
    technologies: ["JavaScript", "TypeScript", "HTML & SCSS", "React", "Next.js", "React Native", "WordPress", "Contentful", "Node.js", "PHP"],
    url: "https://www.upstatement.com/"
  },
  {
    period: "July — Dec 2017",
    positions: [
      "UI Engineer Co-op"
    ],
    company: "Apple",
    description: "Developed and styled interactive web apps for Apple Music, including the user interface of Apple Music's embeddable web player widget for in-browser user authorization and full song playback.",
    technologies: ["MusicKit.js", "9to5Mac", "The Verge", "Ember", "SCSS", "JavaScript"],
    url: "https://www.apple.com/"
  },
  {
    period: "July 2016 — Dec 2017",
    positions: [
      "Developer"
    ],
    company: "Scout Studio",
    description: "Collaborated with other student designers and engineers on pro-bono projects to create new brands, design systems, and websites for organizations in the community.",
    technologies: ["Jekyll", "SCSS", "JavaScript", "WordPress"],
    url: "https://scout.camd.northeastern.edu/"
  },
  {
    period: "July 2015 — Dec 2016",
    positions: [
      "Software Engineer Co-op"
    ],
    company: "Starry",
    description: "Worked with the UI team to engineer and improve major features of Starry's customer-facing Android app.",
    technologies: ["Android App", "ScreenTime 2.0", "Cordova", "Backbone", "JavaScript", "CSS"],
    url: "https://starry.com/"
  },
  {
    period: "July 2015 — Dec 2015",
    positions: [
      "Creative Technologist Co-op"
    ],
    company: "MullenLowe U.S.",
    description: "Developed, maintained, and shipped production code for client websites. Clients included JetBlue, Lovesac, U.S. Cellular, U.S. Department of Defense, and more.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery"],
    url: "https://us.mullenlowe.com/"
  }
];

export default function ExperienceSection() {
  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="experience" className="py-8">
      <div className="mb-4 md:hidden">
        <h2 className="text-lg font-semibold text-lightest-slate">Experience</h2>
      </div>

      <div 
        className="space-y-3 experience-container"
        onMouseLeave={() => {
          // Reset all cards to full opacity when mouse leaves the container
          document.querySelectorAll('.experience-card').forEach(card => {
            (card as HTMLElement).style.opacity = '1';
            (card as HTMLElement).style.filter = 'none';
          });
        }}
      >
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="rounded-lg overflow-hidden cursor-pointer experience-card"
            style={{ 
              padding: "10px",
              transition: "all 0.3s ease",
              borderRadius: "15px",
              
            }}
            onClick={() => handleCardClick(exp.url)}
            onMouseEnter={(e) => {
              // Make all other cards less visible
              document.querySelectorAll('.experience-card').forEach(card => {
                if (card !== e.currentTarget) {
                  (card as HTMLElement).style.opacity = '0.4';
                  (card as HTMLElement).style.filter = 'grayscale(40%)';
                }
              });
              
              // Style current card
              e.currentTarget.style.backgroundColor = "rgba(100, 146, 255, 0.05)";
              e.currentTarget.style.boxShadow = "0 0 0 1px rgba(100, 255, 218, 0.2), 0 4px 8px rgba(2, 12, 27, 0)";
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.filter = 'none';
              
              const titleEl = e.currentTarget.querySelector(".title-text") as HTMLElement;
              const subtitleEls = e.currentTarget.querySelectorAll(".subtitle-text");
              const techEls = e.currentTarget.querySelectorAll(".tech-item");
              const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
              const arrowLine = e.currentTarget.querySelector(".arrow-line") as SVGPathElement;
              const arrowHead = e.currentTarget.querySelector(".arrow-head") as SVGPathElement;
              
              if (titleEl) titleEl.style.color = "#64ffda";
               
              if (linkIcon) {
                linkIcon.style.color = "#64ffda";
                linkIcon.style.opacity = "1";
                
                // Add simple animation to SVG
                const keyframes = `
                  @keyframes arrowOut {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(1px, -1px); }
                    100% { transform: translate(0, 0); }
                  }
                  
                  @keyframes arrowLineDraw {
                    0% { stroke-dashoffset: 12; }
                    100% { stroke-dashoffset: 0; }
                  }
                  
                  @keyframes arrowHeadDraw {
                    0% { stroke-dashoffset: 12; opacity: 0; }
                    50% { stroke-dashoffset: 6; opacity: 0.5; }
                    100% { stroke-dashoffset: 0; opacity: 1; }
                  }
                  
                  @keyframes iconPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                  }
                `;
                
                // Create and append style element if it doesn't exist
                if (!document.getElementById('arrow-animations')) {
                  const styleEl = document.createElement('style');
                  styleEl.id = 'arrow-animations';
                  styleEl.textContent = keyframes;
                  document.head.appendChild(styleEl);
                }
                
                linkIcon.style.animation = "iconPulse 1.5s infinite ease-in-out";
                
                if (arrowLine) {
                  arrowLine.style.strokeDasharray = "12";
                  arrowLine.style.strokeDashoffset = "12";
                  arrowLine.style.animation = "arrowLineDraw 0.5s forwards ease-in-out";
                }
                
                if (arrowHead) {
                  arrowHead.style.strokeDasharray = "12";
                  arrowHead.style.strokeDashoffset = "12";
                  arrowHead.style.animation = "arrowHeadDraw 0.5s 0.2s forwards ease-in-out, arrowOut 1.5s 0.7s infinite ease-in-out";
                }
              }
              
              subtitleEls.forEach(el => {
                (el as HTMLElement).style.color = "rgba(100, 255, 218, 0.7)";
              });
              
              techEls.forEach(el => {
                (el as HTMLElement).style.color = "#64ffda";
                (el as HTMLElement).style.backgroundColor = "rgba(100, 136, 255, 0.1)";
              });
            }}
            onMouseLeave={(e) => {
              // Reset this card styles (the container onMouseLeave will handle resetting all cards)
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "0 0 0 0px rgba(100, 255, 219, 0), 0 2px 4px rgba(2, 12, 27, 0)";
              e.currentTarget.style.background = "linear-gradient(to right, transparent, rgba(100, 255, 219, 0), transparent)";
              
              const titleEl = e.currentTarget.querySelector(".title-text") as HTMLElement;
              const subtitleEls = e.currentTarget.querySelectorAll(".subtitle-text");
              const techEls = e.currentTarget.querySelectorAll(".tech-item");
              const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
              const arrowLine = e.currentTarget.querySelector(".arrow-line") as SVGPathElement;
              const arrowHead = e.currentTarget.querySelector(".arrow-head") as SVGPathElement;
              
              if (titleEl) titleEl.style.color = "#ccd6f6";
               
              if (linkIcon) {
                linkIcon.style.color = "#a8b2d1";
                linkIcon.style.opacity = "0.6";
                linkIcon.style.transform = "scale(1)";
                linkIcon.style.animation = "none";
                linkIcon.style.filter = "none";
                linkIcon.style.transition = "all 0.3s ease";
              }
              
              if (arrowLine) {
                arrowLine.style.animation = "none";
                arrowLine.style.strokeDashoffset = "12";
              }
              
              if (arrowHead) {
                arrowHead.style.animation = "none";
                arrowHead.style.strokeDashoffset = "12";
              }
              
              subtitleEls.forEach(el => {
                (el as HTMLElement).style.color = "#a8b2d1";
              });
              
              techEls.forEach(el => {
                (el as HTMLElement).style.color = "#a8b2d1";
                (el as HTMLElement).style.backgroundColor = "#112240";
              });
            }}
          >
            {/* Flex container - creates two columns */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* Left column - Time period */}
              <div style={{ width: "165px", padding: "10px" }}>
                <div className="font-mono period-text" style={{ 
                  fontSize: "0.75rem", 
                  color: "#a8b2d1",
                  transition: "color 0.3s ease"
                }}>
                  {exp.period}
                </div>
              </div>
              
              {/* Right column - Content */}
              <div style={{ flex: "1", padding: "8px" }}>
                <h3 className="font-semibold m-0 p-0 flex items-center">
                  <span className="title-text" style={{ 
                    fontSize: "0.8rem", 
                    color: "#ccd6f6",
                    transition: "color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    {exp.positions[0]} - {exp.company}
                      <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="link-icon" 
                      style={{ 
                        opacity: 0.6,
                        color: "#a8b2d1",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        position: "relative",
                        marginTop: "0px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(exp.url);
                      }}
                    >
                      {/* Arrow line */}
                      <path 
                        className="arrow-line" 
                        d="M7,17 L17,7" 
                        strokeLinecap="round"
                      />
                      
                      {/* 90 degree arrow head */}
                      <path 
                        className="arrow-head" 
                        d="M17,7 L17,13 M17,7 L11,7" 
                        strokeLinecap="round"
                      />
                      
                      {/* Small box outline */}
                      <rect 
                        x="7" 
                        y="7" 
                        width="10" 
                        height="10" 
                        strokeWidth="1.5" 
                        strokeOpacity="0.4"
                        rx="1"
                      />
                    </svg>
                  </span>
                  
                </h3>
                
                {exp.positions.length > 1 && (
                  <div className="mt-0.5 mb-0.5">
                    {exp.positions.slice(1).map((position, posIndex) => (
                      <div 
                        key={posIndex} 
                        className="text-xs opacity-80 subtitle-text" 
                        style={{ 
                          fontSize: '0.7rem', 
                          padding: "0.5px 0",
                          color: "#a8b2d1",
                          transition: "color 0.3s ease"
                        }}
                      >
                        {position}
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="mt-1 mb-1 opacity-90 text-light-slate" style={{ 
                  fontSize: '0.7rem', 
                  lineHeight: 1.3, 
                  padding: "10px 0" 
                }}>
                  {exp.description}
                </p>
                
                <ul className="flex flex-wrap gap-2 mt-1" style={{ padding: "2px 0 10px 0" }}>
                  {exp.technologies.map((tech, techIndex) => (
                    <li 
                      key={techIndex}
                      className="rounded tech-item"
                      style={{ 
                        fontSize: '0.65rem',
                        padding: '2px 6px',
                        margin: '2px',
                        display: 'inline-block',
                        backgroundColor: '#112240',
                        color: '#a8b2d1',
                        transition: "all 0.3s ease",
                        borderRadius: "4px"
                      }}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-left pl-4" style={{ margin: "1rem 0.5rem" }}>
        <style jsx>{`
          @keyframes borderGlow {
            0%, 100% { box-shadow: 0 0 2px rgba(100, 255, 218, 0.5); }
            50% { box-shadow: 0 0 8px rgba(100, 255, 218, 0.8); }
          }
          
          @keyframes borderRotate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes textShimmer {
            0% { background-position: -100% 0; }
            100% { background-position: 200% 0; }
          }
          
          .review-btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #64ffda;
            font-size: 14px;
            padding: 6px 16px;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s ease;
            z-index: 1;
            cursor: pointer;
          }
          
          .review-btn::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 8px;
            padding: 1px;
            background: linear-gradient(
              90deg, 
              rgba(100, 255, 218, 0.5), 
              rgba(100, 255, 218, 0.2), 
              rgba(100, 255, 218, 0.8),
              rgba(100, 255, 218, 0.2)
            );
            background-size: 300% 100%;
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: borderRotate 4s ease infinite;
          }
          
          .review-btn:hover {
            background-color: rgba(100, 255, 218, 0.05);
            transform: translateY(-2px);
          }
          
          .review-btn:hover::before {
            animation: borderRotate 2s ease infinite;
          }
          
          .review-btn:hover .btn-text {
            background-position: 100% 0;
          }
          
          .btn-text {
            background: linear-gradient(
              to right, 
              #64ffda, 
              #9EEEDE, 
              #64ffda, 
              #64ffda
            );
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: all 0.3s ease;
          }
          
          .resume-icon {
            transition: all 0.3s ease;
            transform-origin: center;
          }
          
          .review-btn:hover .resume-icon {
            transform: translateY(-2px) scale(1.1);
            filter: drop-shadow(0 2px 2px rgba(100, 255, 218, 0.3));
          }
          
          @keyframes pageFlip {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(0.92); }
          }
          
          .review-btn:hover .page-element {
            animation: pageFlip 1.5s infinite ease-in-out;
          }
        `}</style>
        <a 
          href="/resume.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="review-btn"
        >
          <span className="btn-text">View Resume</span>
          <svg 
            className="resume-icon" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline className="page-element" points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </a>
      </div>
    </section>
  );
} 