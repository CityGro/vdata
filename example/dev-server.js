const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
var middlewares = jsonServer.defaults()

const webpack = require('webpack')
const webpackConfig = require('./webpack.conf')
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
server.use(require('connect-history-api-fallback')())
// serve webpack bundle output
server.use(devMiddleware)
// enable hot-reload and state-preserving
// compilation error display
server.use(hotMiddleware)
server.use(middlewares)
server.use(router)

server.listen(8080, function () {
  console.log('$vdata-dev: listening on 8080')
})