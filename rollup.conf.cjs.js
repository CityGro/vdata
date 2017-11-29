import babel from 'rollup-plugin-babel'
// import commonjs from 'rollup-plugin-commonjs'
// import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './src/index.js',
  dest: 'vdata.common.js',
  plugins: [
    /*
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
    }),
    */
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
             'transform-es2015-spread'
           ]
         }
        ]
      ],
      plugins: [
        'transform-async-to-generator',
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
