var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    './example/app.js'
  ],
  resolve: {
    alias: {
       'vue': 'vue/dist/vue.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '@citygro/vdata',
      template: 'example/index.html',
      inject: 'body',
      xhtml: true
    })
  ]
}