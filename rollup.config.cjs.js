import babel from 'rollup-plugin-babel'

export default {
  entry: './src/index.js',
  dest: 'vdata.common.js',
  plugins: [
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
