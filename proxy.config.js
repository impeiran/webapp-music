const axios = require('axios')

/**
 * QQ音乐 开发环境 代理配置
 */
const normalProxy = [
  { 
    path: ['/cgi-bin'], 
    target: 'https://u.y.qq.com'
  }, { 
    path: ['/v8', '/base'],
    target: 'https://c.y.qq.com'
  }
]

const beforeProxy = [
  { 
    path: /\/qzone\//, 
    referer: 'https://y.qq.com/n/yqq/index.html'
  }, { 
    path: /\/soso\//,
    referer: 'https://y.qq.com'
  }, { 
    path: /\/lyric\//,
    referer: 'https://y.qq.com'
  }
]

/** End */

// 注入代理配置
const parseProxyConfig = newConfig => {
  const injectProxy = normalProxy.reduce((ret, item) => {
    (item.path || []).forEach(itemPath => {
      ret[itemPath] = {
        target: item.target,
        changeOrigin: true,
        secure: false
      }
    })
    return ret
  }, {})

  const injectBefore = app => {
    beforeProxy.forEach(beforeItem => {
      const target = beforeItem.target || 'https://c.y.qq.com'
      app.get(beforeItem.path, (req, res) => {
        axios.get(target + req.path, {
          headers: {
            referer: beforeItem.referer,
            host: beforeItem.host || 'y.qq.com'
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
    })

    typeof newConfig.before === 'function' &&
    newConfig.before(app)
  }

  const currentConfig = Object.assign({}, {
    proxy: injectProxy,
  }, newConfig)

  currentConfig.before = injectBefore

  return currentConfig
}

module.exports = parseProxyConfig