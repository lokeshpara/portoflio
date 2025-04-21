"use client";

// import Link from 'next/link';

// Blog post data with images
const blogPosts = [
  {
    image: '/images/projects/ecommerce.jpg', // Using the downloaded image temporarily
    title: 'Building Performant Web Applications',
    category: 'Web Development',
    excerpt: 'Learn how to optimize your Next.js applications for maximum performance and user experience. This guide covers code splitting, image optimization, and server-side rendering techniques that can drastically improve your application loading times.',
    date: 'June 15, 2023',
    readTime: '8 min read',
    slug: 'building-performant-web-applications-nextjs',
  },
  {
    image: '/images/portfolio-website.jpg',
    title: 'The Power of TypeScript',
    category: 'TypeScript',
    excerpt: 'Discover how TypeScript can help you write more maintainable and error-free code in your projects. We explore type inference, interfaces, generics, and other advanced features that will level up your development workflow.',
    date: 'May 22, 2023',
    readTime: '6 min read',
    slug: 'power-of-typescript-modern-frontend',
  },
  {
    image: '/images/task-management.jpg',
    title: 'Creating Stunning Animations',
    category: 'Animation',
    excerpt: 'A comprehensive guide to implementing beautiful and performant animations in React applications. Learn how to create complex animations that enhance user experience without sacrificing performance.',
    date: 'April 10, 2023',
    readTime: '10 min read',
    slug: 'creating-animations-framer-motion',
  },
];

export default function BlogSection() {
  const handleCardClick = (slug: string) => {
    window.open(`/blog/${slug}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="blog" className="py-8">
      <div className="mb-4 md:hidden">
        <h2 className="text-lg font-semibold text-lightest-slate">Blog</h2>
      </div>

      <div 
        className="space-y-3 blog-container"
        onMouseLeave={() => {
          // Reset all cards to full opacity when mouse leaves the container
          document.querySelectorAll('.blog-card').forEach(card => {
            (card as HTMLElement).style.opacity = '1';
            (card as HTMLElement).style.filter = 'none';
          });
        }}
      >
        {blogPosts.map((post, index) => (
          <div 
            key={index} 
            className="rounded-lg overflow-hidden cursor-pointer blog-card"
            style={{ 
              padding: "10px",
              transition: "all 0.3s ease",
              borderRadius: "15px",
            }}
            onClick={() => handleCardClick(post.slug)}
            onMouseEnter={(e) => {
              // Make all other cards less visible
              document.querySelectorAll('.blog-card').forEach(card => {
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
              const categoryEl = e.currentTarget.querySelector(".category-tag") as HTMLElement;
              const dateEl = e.currentTarget.querySelector(".date-text") as HTMLElement;
              const readTimeEl = e.currentTarget.querySelector(".read-time") as HTMLElement;
              const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
              const arrowLine = e.currentTarget.querySelector(".arrow-line") as SVGPathElement;
              const arrowHead = e.currentTarget.querySelector(".arrow-head") as SVGPathElement;
              const postImg = e.currentTarget.querySelector(".post-image") as HTMLImageElement;
              
              if (titleEl) titleEl.style.color = "#64ffda";
              if (categoryEl) categoryEl.style.color = "#64ffda";
              if (dateEl) dateEl.style.color = "rgba(100, 255, 218, 0.7)";
              if (readTimeEl) readTimeEl.style.color = "rgba(100, 255, 218, 0.7)";
              
              if (postImg) {
                postImg.style.transform = "scale(1.05)";
                postImg.style.filter = "brightness(1.1)";
              }
               
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
                if (!document.getElementById('arrow-animations-blog')) {
                  const styleEl = document.createElement('style');
                  styleEl.id = 'arrow-animations-blog';
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
            }}
            onMouseLeave={(e) => {
              // Reset this card styles
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "0 0 0 0px rgba(100, 255, 219, 0), 0 2px 4px rgba(2, 12, 27, 0)";
              e.currentTarget.style.background = "linear-gradient(to right, transparent, rgba(100, 255, 219, 0), transparent)";
              
              const titleEl = e.currentTarget.querySelector(".title-text") as HTMLElement;
              const categoryEl = e.currentTarget.querySelector(".category-tag") as HTMLElement;
              const dateEl = e.currentTarget.querySelector(".date-text") as HTMLElement;
              const readTimeEl = e.currentTarget.querySelector(".read-time") as HTMLElement;
              const linkIcon = e.currentTarget.querySelector(".link-icon") as SVGElement;
              const arrowLine = e.currentTarget.querySelector(".arrow-line") as SVGPathElement;
              const arrowHead = e.currentTarget.querySelector(".arrow-head") as SVGPathElement;
              const postImg = e.currentTarget.querySelector(".post-image") as HTMLImageElement;
              
              if (titleEl) titleEl.style.color = "#ccd6f6";
              if (categoryEl) categoryEl.style.color = "#64ffda";
              if (dateEl) dateEl.style.color = "#a8b2d1";
              if (readTimeEl) readTimeEl.style.color = "#a8b2d1";
              
              if (postImg) {
                postImg.style.transform = "scale(1)";
                postImg.style.filter = "brightness(1)";
              }
               
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
            }}
          >
            {/* Flex container - creates two columns */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* Left column - Blog Post Image */}
              <div style={{ width: "165px", padding: "10px" }}>
                <div className="image-container" style={{ 
                  overflow: "hidden", 
                  borderRadius: "8px", 
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#112240"
                }}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="post-image"
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      transition: "all 0.3s ease"
                    }} 
                  />
                </div>
              </div>
              
              {/* Right column - Content */}
              <div style={{ flex: "1", padding: "8px" }}>
                <div className="flex items-center justify-between mb-1">
                  <span 
                    className="category-tag"
                    style={{ 
                      fontSize: '0.65rem',
                      padding: '2px 6px',
                      backgroundColor: '#112240',
                      color: '#64ffda',
                      transition: "all 0.3s ease",
                      borderRadius: "4px"
                    }}
                  >
                    {post.category}
                  </span>
                  <div className="flex items-center text-light-slate">
                    <span className="date-text" style={{ fontSize: '0.65rem', color: '#a8b2d1', transition: "all 0.3s ease" }}>
                      {post.date}
                    </span>
                    <span style={{ margin: '0 4px', fontSize: '0.65rem' }}>•</span>
                    <span className="read-time" style={{ fontSize: '0.65rem', color: '#a8b2d1', transition: "all 0.3s ease" }}>
                      {post.readTime}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold m-0 p-0 flex items-center">
                  <span className="title-text" style={{ 
                    fontSize: "0.8rem", 
                    color: "#ccd6f6",
                    transition: "color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    {post.title}
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
                        handleCardClick(post.slug);
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
                
                <p className="mt-1 mb-1 opacity-90 text-light-slate" style={{ 
                  fontSize: '0.7rem', 
                  lineHeight: 1.3, 
                  padding: "6px 0" 
                }}>
                  {post.excerpt}
                </p>
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
          
          .blog-btn {
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
          
          .blog-btn::before {
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
          
          .blog-btn:hover {
            background-color: rgba(100, 255, 218, 0.05);
            transform: translateY(-2px);
          }
          
          .blog-btn:hover::before {
            animation: borderRotate 2s ease infinite;
          }
          
          .blog-btn:hover .btn-text {
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
          
          .article-icon {
            transition: all 0.3s ease;
            transform-origin: center;
          }
          
          .blog-btn:hover .article-icon {
            transform: translateY(-2px) scale(1.1);
            filter: drop-shadow(0 2px 2px rgba(100, 255, 218, 0.3));
          }
          
          @keyframes articleRipple {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 0.7; }
          }
          
          .blog-btn:hover .article-ripple {
            animation: articleRipple 1.5s infinite ease-in-out;
          }
        `}</style>
        <a 
          href="/blog"
          className="blog-btn"
        >
          <span className="btn-text">View All Articles</span>
          <svg 
            className="article-icon" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
            <path className="article-ripple" d="M7 7h10M7 12h10M7 17h7" />
          </svg>
        </a>
      </div>
    </section>
  );
} 