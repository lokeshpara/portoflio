/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-1' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-1/' : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig; 