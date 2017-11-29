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
        ["env",
         {
           modules: false,
           targets: {
             browsers: [
               '> 5% in US',
               'Firefox ESR',
               'last 2 versions'
             ]
           },
           include: [
             'transform-regenerator',
             'transform-es2015-spread'
           ]
         }
        ]
      ],
      plugins: [
        'external-helpers',
        'syntax-async-functions',
        'syntax-flow',
        'transform-flow-comments',
        'transform-object-rest-spread'
      ]
    })
  ],
  format: 'cjs'
}
