const withOffline = require('next-offline')

const workboxOpts = {
  clientsClaim: true,
  skipWaiting: true,
  cleanupOutdatedCaches: true,
  runtimeCaching: [
    {
      // sample runtime caching
      urlPattern: '/api/*',
      handler: 'NetworkFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }
  ]
}

const nextConfig = {
  workboxOpts,
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    return config
  }
}

module.exports = withOffline(nextConfig)
