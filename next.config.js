/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    if (!config.resolve.fallback) {
      config.resolve.fallback = {}
    }

    config.resolve.fallback.encoding = false

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
