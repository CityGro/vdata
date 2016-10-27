var webpack = require('webpack')

module.exports = {
  entry: ['./vdeux.common.js'],
  output: {
    path: __dirname,
    filename: 'vdeux.js',
    libraryTarget: 'umd',
    library: 'Vdeux'
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
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ],
  babel: {
    presets: ['es2015']
  }
}
