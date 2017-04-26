import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './src/index.js',
  dest: 'vdata.common.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      namedExports: {
        './lib/vue-async-data/src/main.js': ['AsyncDataPlugin', 'AsyncDataMixin']
      }
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          "es2015",
          {
            "modules": false
          }
        ],
        "stage-2"
      ],
      plugins: [
        'external-helpers'
      ]
    })
  ],
  format: 'cjs'
}
