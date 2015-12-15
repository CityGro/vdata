var webpack = require('webpack')

module.exports = {
  entry: ['./src/revue.js'],
  output: {
    path: __dirname,
    filename: 'revue.js',
    libraryTarget: 'umd',
    library: 'Revue'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: [/node_modules/] }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': false
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ]
}
