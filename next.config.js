/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: { sourceMap: false },
  },
  images: {
    domains: ['res.zrain.fun'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.zrain.fun',
        port: '443',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
