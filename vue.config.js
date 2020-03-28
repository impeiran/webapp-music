const path = require('path')
const parseDevServer = require('./proxy.config.js')

const resolve = dir => path.join(__dirname, dir)


module.exports = {
  publicPath: process.env.NODE_ENV !== 'production' ? '/' : '/music',

  productionSourceMap: false,

  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
  },

  devServer: parseDevServer({
    port: 9998
  })
}
