[![build status](https://gitlab.com/citygro/vdeux/badges/latest/build.svg)](https://gitlab.com/citygro/vdeux/commits/latest)
[![coverage report](https://gitlab.com/citygro/vdeux/badges/latest/coverage.svg)](https://gitlab.com/citygro/vdeux/commits/latest)
[![npm downloads](https://img.shields.io/npm/dt/vdeux.svg)](https://npmjs.org/package/vdeux)
[![npm version](https://img.shields.io/npm/v/vdeux.svg)](https://npmjs.org/package/vdeux)

vdeux(3) -- redux-vue binding
=============================

```sh
$ yarn add redux vdeux
# or
$ npm install --save redux vdeux
```

## usage

```js
// from test.js

import Vue from 'vue'
import Vdeux from 'vdeux'

import store from './store'
import { increment } from './example/dux/counter'

Vue.use(Vdeux)

const vm = new Vue({
  store,
  computed: {
    count () {
      return this.$state.counter
    }
  },
  created () {
    this.$dispatch(increment())
    this.$dispatch(increment())
  }
})
// vm.count.should.equal(2)
```

## see also

`example/`, [ducks]

[ducks]: https://gitlab.com/citygro/ducks-modular-redux
