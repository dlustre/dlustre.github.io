/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '/react-portfolio',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/sf-black-filled/64/FFFFFF/double-down.png',
      },
    ],
  },
}

module.exports = nextConfig
