var webpack = require('webpack')
var path = require('path');
var fs = require('fs');
var config = require('./webpack.config.umd')

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })


config.output.libraryTarget = 'commonjs2'
config.output.filename = 'revue.common.js'
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__DEV__': false
  })
]
config.externals = nodeModules
config.target = 'node'
module.exports = config
