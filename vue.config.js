module.exports = {
    devServer: {
      proxy: 'http://localhost:8080',
      changeOrigin: true,
      cors: true
    }
  }