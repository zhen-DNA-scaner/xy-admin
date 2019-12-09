const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

console.log(isDev)

module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: isDev ? 'http://localhost:7001' : 'http://www.acfun.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/scss/*.scss'),
      ]
    }
  }
}
