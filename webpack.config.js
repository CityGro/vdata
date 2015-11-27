module.exports = {
  entry: ['./src/App.js'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
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
