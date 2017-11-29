var webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['./vdata.common.js'],
  output: {
    path: __dirname,
    filename: 'vdata.js',
    libraryTarget: 'umd',
    library: 'vdata'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: [/node_modules/] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        },
        output: {
          beautify: true,
          comments: true
        }
      }
    })
  ]
}
