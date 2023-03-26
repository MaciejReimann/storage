module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    pageExtensions: ['page.tsx', 'page.js', 'endpoint.ts'],
  }
  return nextConfig
}
