import babel from 'rollup-plugin-babel'

export default {
  entry: './src/revue.js',
  dest: 'revue.common.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup']
    })
  ],
  format: 'cjs'
}
