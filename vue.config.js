const path = require('path')
const axios = require('axios')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
  },

  devServer: {
    port: 9998,

    proxy: {
      '/cgi-bin': {
        target: 'https://u.y.qq.com',
        changeOrigin: true,
        secure: false
      },

      '/v8/fcg-bin': {
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        secure: false
      }
    },

    before: (app) => {
      app.get(/\/qzone\//, (req, res) => {
        const target = 'https://c.y.qq.com'
        axios.get(target + req.path, {
          headers: {
            referer: 'https://y.qq.com/n/yqq/7270987435.html',
            host: 'y.qq.com'
          },
          params: req.query
        }).then(response => {
          res.json(response.data)
        }).catch(() => {
          res.json({
            code: 1,
            msg: '开发环境获取数据失败'
          })
        })
      })
    }
  }
}