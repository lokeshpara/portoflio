"use client";

import React from 'react';
// Remove motion import
// import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="pt-10 pb-16">
      <div style={{ marginLeft: '0.85rem' }}>
        {/* Replace motion.div with regular div and remove animation properties */}
        <div className="flex items-center group mb-8 md:hidden">
          <h2 className="text-2xl font-semibold text-lightest-slate">
            About
          </h2>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("about");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="ml-2 transition-opacity duration-200"
            aria-label="Link to About section"
          >
            {/* No hover link icon */}
          </a>
        </div>
        
        <div className="space-y-0">
          <p className="pb-8 mb-4 text-light-slate" style={{ fontSize: '0.85rem' }}>
            I'm a full-stack developer with a passion for building intuitive and performant web applications. With over 5 years of experience in the industry, I've had the opportunity to work with a variety of technologies and frameworks to deliver impactful solutions.
          </p>
          
          <p className="pb-8 mb-4 text-light-slate" style={{ fontSize: '0.85rem' }}>
            Currently, I'm focused on developing accessible, user-centered products at <a href="#" className="text-green hover:underline">Acme Corporation</a>, where I lead the frontend development team. My approach combines clean code principles with modern design patterns to create maintainable and scalable applications.
          </p>
          
          <p className="pb-8 mb-4 text-light-slate" style={{ fontSize: '0.85rem' }}>
            My technical toolkit includes React, TypeScript, Node.js, and various cloud services. I'm particularly interested in performance optimization, state management strategies, and creating delightful user experiences.
          </p>
          
          <p className="text-light-slate" style={{ fontSize: '0.85rem' }}>
            When I'm not coding, you can find me hiking in the mountains, experimenting with new recipes, or contributing to open-source projects that align with my values of making technology accessible to everyone.
          </p>
        </div>
      </div>
    </section>
  );
} 