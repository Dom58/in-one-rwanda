/**
 * @type {import('next').NextConfig}
 */

const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  // output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      {
        source: '/rssb-proxy/:path*',
        destination: 'https://apigateway.rssb.rw/imisanzu/api/v1/:path*',
      },
    ]
  },
}

module.exports = nextConfig
