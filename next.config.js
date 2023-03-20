/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
