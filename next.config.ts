/**
 * @type {import('next').NextConfig}
 */

const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  basePath: isProd ? '/rwanda-masterplan' : '',
  output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  }
}

module.exports = nextConfig
