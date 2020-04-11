const path = require('path')
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@', resolve('src'))
      .set('styles',resolve('src/assets/styles'))
      .set('img',resolve('src/assets/img'))
      .set('components',resolve('src/components')).end().symlinks(true)
    },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: IS_PROD
  }
}