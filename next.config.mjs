import getServerConfig from './server-config.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    ...getServerConfig(),
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_BACKEND_BASE_URL:
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:3001',
  },
  output: 'standalone',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })
    return config
  },
}

export default nextConfig
