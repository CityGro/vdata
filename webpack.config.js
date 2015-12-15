var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./example/index'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: [/node_modules/] },
      { test: /\.vue$/, loaders: ['vue'], exclude: [/node_modules/]}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    }),
    new HtmlWebpackPlugin({
      title: 'Revue',
      template: './example/index.tpl'
    })
  ]
}
