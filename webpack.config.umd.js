module.exports = {
  entry: ['./src/revue.js'],
  output: {
    path: __dirname,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'revue'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: [/node_modules/] }
    ]
  },
  plugins: []
}
