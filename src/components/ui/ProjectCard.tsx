"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  imageUrl,
  tags,
  projectUrl 
}: ProjectCardProps) {
  return (
    <motion.div 
      className="flex flex-col overflow-hidden rounded-lg shadow-lg dark:bg-gray-900 bg-white"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0 relative h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
          {title.charAt(0)}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href={projectUrl} className="mt-2 block">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              {title}
            </h3>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href={projectUrl}
            className="text-base font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View Project →
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 