"use client";

import Link from 'next/link';

// Education data
const education = [
  {
    period: "2017 - 2019",
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    description:
      "Specialized in Artificial Intelligence and Machine Learning with a focus on Natural Language Processing. Conducted research on transformer-based language models and deep learning applications.",
    achievements: [
      "Graduated with distinction (GPA: 3.8/4.0)",
      "Research assistant in the NLP lab",
      "Published 2 papers on transformer-based language models"
    ],
    url: "https://www.stanford.edu"
  },
  {
    period: "2013 - 2017",
    degree: "Bachelor of Science in Computer Engineering",
    institution: "MIT",
    description:
      "Comprehensive program covering software engineering, computer architecture, and systems design. Focused on building scalable applications and distributed systems architecture.",
    achievements: [
      "Dean's List all semesters",
      "Senior thesis on distributed systems",
      "President of the Computer Science Club"
    ],
    url: "https://www.mit.edu"
  },
  {
    period: "2009 - 2013",
    degree: "High School Diploma",
    institution: "Tech Preparatory Academy",
    description: "Advanced STEM curriculum with honors in mathematics and computer science. Participated in numerous hackathons and coding competitions.",
    achievements: [
      "Valedictorian",
      "National Merit Scholar",
      "Winner of State Programming Competition"
    ],
    url: "https://example.com/school"
  }
];

// Certifications
const certifications = [
  {
    period: "2022",
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    description: "Validated expertise in developing, deploying, and debugging cloud-based applications using AWS. Mastered AWS core services, best practices for application development, and CI/CD workflows.",
    technologies: ["Amazon EC2", "AWS Lambda", "Amazon S3", "Amazon DynamoDB", "AWS IAM"],
    image: '/images/projects/ecommerce.jpg',
    url: "https://aws.amazon.com/certification/"
  },
  {
    period: "2021",
    name: "Professional Scrum Master I (PSM I)",
    issuer: "Scrum.org",
    description: "Demonstrated understanding of Scrum framework, values, practices, and applications. Developed skills in facilitating team collaboration, addressing impediments, and coaching on effective Scrum implementation.",
    technologies: ["Agile Methodologies", "Sprint Planning", "Backlog Management", "Servant Leadership", "Empirical Process Control"],
    image: '/images/portfolio-website.jpg',
    url: "https://www.scrum.org/professional-scrum-certifications"
  },
  {
    period: "2020",
    name: "Google UX Design Professional Certificate",
    issuer: "Google",
    description: "Comprehensive training in UX design process including research, wireframing, prototyping, and testing. Developed skills in creating user-centered designs and solving complex design challenges.",
    technologies: ["User Research", "Wireframing", "Prototyping", "Figma", "Usability Testing"],
    image: '/images/task-management.jpg',
    url: "https://grow.google/certificates/ux-design/"
  }
];

export default function EducationSection() {
  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="education" className="py-8">
      <div className="mb-4 md:hidden">
        <h2 className="text-lg font-semibold text-lightest-slate">Education</h2>
      </div>

      {/* Certifications */}
      <div className="mb-12">
        <h3 className="text-md font-semibold mb-6 text-lightest-slate">Professional Certifications</h3>
        
        <div 
          className="space-y-3 certification-container"
          onMouseLeave={() => {
            // Reset all cards to full opacity when mouse leaves the container
            document.querySelectorAll('.certification-card').forEach(card => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.filter = 'none';
            });
          }}
        >
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden cursor-pointer certification-card"
              style={{ 
                padding: "10px",
                transition: "all 0.3s ease",
                borderRadius: "15px",
              }}
              onClick={() => handleCardClick(cert.url)}
              onMouseEnter={(e) => {
                // Make all other cards less visible
                document.querySelectorAll('.certification-card').forEach(card => {
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
                const certImg = e.currentTarget.querySelector(".cert-image") as HTMLImageElement;
                const imgOverlay = e.currentTarget.querySelector(".img-overlay") as HTMLDivElement;
                
                if (titleEl) titleEl.style.color = "#64ffda";
                if (certImg) certImg.style.transform = "scale(1.05)";
                if (imgOverlay) imgOverlay.style.backgroundColor = "rgba(100, 255, 218, 0.1)";
                
                if (linkIcon) {
                  linkIcon.style.color = "#64ffda";
                  linkIcon.style.opacity = "1";
                  
                  // Animation is already defined in the academic section
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
                
                const titleEl = e.currentTarget.querySelector(".title-text") as HTMLElement;
                const subtitleEls = e.currentTarget.querySelectorAll(".subtitle-text");
                const techEls = e.currentTarget.querySelectorAll(".tech-item");
                const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
                const arrowLine = e.currentTarget.querySelector(".arrow-line") as SVGPathElement;
                const arrowHead = e.currentTarget.querySelector(".arrow-head") as SVGPathElement;
                const certImg = e.currentTarget.querySelector(".cert-image") as HTMLImageElement;
                const imgOverlay = e.currentTarget.querySelector(".img-overlay") as HTMLDivElement;
                
                if (titleEl) titleEl.style.color = "#ccd6f6";
                if (certImg) certImg.style.transform = "scale(1)";
                if (imgOverlay) imgOverlay.style.backgroundColor = "rgba(17, 34, 64, 0.7)";
                
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
                {/* Left column - Certificate Image */}
                <div style={{ width: "165px", padding: "10px", position: "relative", overflow: "hidden", borderRadius: "8px" }}>
                  <div className="img-overlay" style={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    width: "100%", 
                    height: "100%", 
                    backgroundColor: "rgba(17, 34, 64, 0.7)",
                    transition: "background-color 0.3s ease",
                    zIndex: 1
                  }}></div>
                  <div style={{ 
                    fontSize: "0.65rem", 
                    position: "absolute", 
                    bottom: "8px", 
                    left: "8px", 
                    padding: "2px 8px", 
                    borderRadius: "4px", 
                    backgroundColor: "rgba(100, 255, 218, 0.2)", 
                    color: "#64ffda",
                    zIndex: 2,
                    fontFamily: "monospace"
                  }}>
                    {cert.period}
                  </div>
                  <img 
                    src={cert.image} 
                    alt={cert.name}
                    className="cert-image"
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      borderRadius: "4px"
                    }}
                  />
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
                    }}>
                      {cert.name}
                    </span>
                    
                    {/* External link arrow icon */}
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
                      className="link-icon ml-2" 
                      style={{ 
                        opacity: 0.6,
                        color: "#a8b2d1",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <path d="M7,17 L17,7" className="arrow-line" strokeLinecap="round" />
                      <path d="M17,7 L17,13 M17,7 L11,7" className="arrow-head" strokeLinecap="round" />
                      <rect x="7" y="7" width="10" height="10" strokeWidth="1.5" strokeOpacity="0.4" rx="1" />
                    </svg>
                  </h3>
                  
                  <div className="mt-1 mb-2">
                    <span className="subtitle-text" style={{ 
                      fontSize: "0.75rem", 
                      color: "#a8b2d1",
                      transition: "color 0.3s ease"
                    }}>
                      {cert.issuer}
                    </span>
                  </div>
                  
                  <p style={{ 
                    fontSize: "0.75rem",
                    color: "#8892b0",
                    margin: "0 0 10px 0",
                    lineHeight: "1.4"
                  }}>
                    {cert.description}
                  </p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {cert.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="tech-item"
                        style={{ 
                          fontSize: "0.65rem",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          backgroundColor: "#112240",
                          color: "#a8b2d1",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Academic Education */}
      <div>
        <h3 className="text-md font-semibold mb-6 text-lightest-slate">Academic Education</h3>
        <div 
          className="space-y-3 education-container"
          onMouseLeave={() => {
            // Reset all cards to full opacity when mouse leaves the container
            document.querySelectorAll('.education-card').forEach(card => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.filter = 'none';
            });
          }}
        >
          {education.map((edu, index) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden cursor-pointer education-card"
              style={{ 
                padding: "10px",
                transition: "all 0.3s ease",
                borderRadius: "15px",
              }}
              onClick={() => handleCardClick(edu.url)}
              onMouseEnter={(e) => {
                // Make all other cards less visible
                document.querySelectorAll('.education-card').forEach(card => {
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
                const achieveEls = e.currentTarget.querySelectorAll(".achieve-item");
                const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
                const arrowLine = e.currentTarget.querySelector(".arrow-line") as SVGPathElement;
                const arrowHead = e.currentTarget.querySelector(".arrow-head") as SVGPathElement;
                const periodEl = e.currentTarget.querySelector(".period-text") as HTMLElement;
                
                if (titleEl) titleEl.style.color = "#64ffda";
                if (periodEl) periodEl.style.color = "#64ffda";
                
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
                  if (!document.getElementById('arrow-animations-edu')) {
                    const styleEl = document.createElement('style');
                    styleEl.id = 'arrow-animations-edu';
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
                
                achieveEls.forEach(el => {
                  (el as HTMLElement).style.color = "#64ffda";
                  (el as HTMLElement).style.backgroundColor = "rgba(100, 136, 255, 0.1)";
                });
              }}
              onMouseLeave={(e) => {
                // Reset this card styles (the container onMouseLeave will handle resetting all cards)
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "0 0 0 0px rgba(100, 255, 219, 0), 0 2px 4px rgba(2, 12, 27, 0)";
                
                const titleEl = e.currentTarget.querySelector(".title-text") as HTMLElement;
                const subtitleEls = e.currentTarget.querySelectorAll(".subtitle-text");
                const achieveEls = e.currentTarget.querySelectorAll(".achieve-item");
                const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
                const arrowLine = e.currentTarget.querySelector(".arrow-line") as SVGPathElement;
                const arrowHead = e.currentTarget.querySelector(".arrow-head") as SVGPathElement;
                const periodEl = e.currentTarget.querySelector(".period-text") as HTMLElement;
                
                if (titleEl) titleEl.style.color = "#ccd6f6";
                if (periodEl) periodEl.style.color = "#a8b2d1";
                
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
                
                achieveEls.forEach(el => {
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
                    {edu.period}
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
                    }}>
                      {edu.degree}
                    </span>
                    
                    {/* External link arrow icon */}
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
                      className="link-icon ml-2" 
                      style={{ 
                        opacity: 0.6,
                        color: "#a8b2d1",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <path d="M7,17 L17,7" className="arrow-line" strokeLinecap="round" />
                      <path d="M17,7 L17,13 M17,7 L11,7" className="arrow-head" strokeLinecap="round" />
                      <rect x="7" y="7" width="10" height="10" strokeWidth="1.5" strokeOpacity="0.4" rx="1" />
                    </svg>
                  </h3>
                  
                  <div className="mt-1 mb-2">
                    <span className="subtitle-text" style={{ 
                      fontSize: "0.75rem", 
                      color: "#a8b2d1",
                      transition: "color 0.3s ease"
                    }}>
                      {edu.institution}
                    </span>
                  </div>
                  
                  <p style={{ 
                    fontSize: "0.75rem",
                    color: "#8892b0",
                    margin: "0 0 10px 0",
                    lineHeight: "1.4"
                  }}>
                    {edu.description}
                  </p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {edu.achievements.map((achievement, i) => (
                      <span 
                        key={i}
                        className="achieve-item"
                        style={{ 
                          fontSize: "0.65rem",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          backgroundColor: "#112240",
                          color: "#a8b2d1",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 