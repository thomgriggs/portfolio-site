/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  experimental: {
    externalDir: true
  }
};
module.exports = nextConfig;
