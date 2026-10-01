/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fonts load via <link> in app/layout.js, not at build time.
  optimizeFonts: false,
  poweredByHeader: false,
};

module.exports = nextConfig;
