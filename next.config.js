/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
  //     },
  //   ]
  // },
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
