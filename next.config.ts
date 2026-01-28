/**
 * @type {import('next').NextConfig}
 */

const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  // basePath: isProd ? '/rwanda-masterplan' : '',
  // output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
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
