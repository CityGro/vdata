import babel from 'rollup-plugin-babel'

export default {
  entry: './src/vdeux.js',
  dest: 'vdeux.common.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup']
    })
  ],
  format: 'cjs'
}
