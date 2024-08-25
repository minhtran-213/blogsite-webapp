const getServerConfig = () => {
  return {
    backendUrl:
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:3001',
    // Add other server-side configurations here
  }
}

module.exports = getServerConfig
