module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/v2': {
        target: 'https://dapi.kakao.com',
        changeOrigin: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
      },
      '/api': {
        target: 'https://mts.daumcdn.net',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  },
  publicPath: './'
} 