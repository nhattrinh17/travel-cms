/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // API_URL: 'http://localhost:9999/api',
    // Prod
    API_URL: 'https://be.thglobaltravel.com/api',
  },
  images: {
    domains: ['storage.googleapis.com'],
    unoptimized: true,
  },
  output: 'standalone',
};

export default nextConfig;
