// import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: './lib/main.js',
  dest: 'vdata.common.js',
  plugins: [
    resolve(),
    commonjs(),
    nodeResolve({
      jsnext: true,
      main: true
    })
  ],
  format: 'cjs'
}
