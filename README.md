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
import Vue from 'vue'
import vdeux from 'vdeux'

import configureStore from './store'
import {increment} from './store/actions'

const store = configureStore()

Vue.use(vdeux(store))

const vm = new Vue({
  computed: {
    count () {
      return this.$state
    }
  },
  created () {
    this.$dispatch(increment())
    this.$dispatch(increment())
  }
})
// expect(vm.count).toBe(2)
```
