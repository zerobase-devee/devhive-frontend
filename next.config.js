/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: `/api/:path*`,
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  images: {
    domains: ['devhive-image.s3.ap-northeast-2.amazonaws.com'],
  },
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
