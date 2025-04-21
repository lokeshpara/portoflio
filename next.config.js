/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Ensure the distDir is properly set
  distDir: '.next',
  experimental: {
    // Turn off optimizeCss as it requires Critters which is causing issues
    optimizeCss: false,
  },
};

module.exports = nextConfig; 