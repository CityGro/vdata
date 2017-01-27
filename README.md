[![build status](https://gitlab.com/citygro/vdata/badges/latest/build.svg)](https://gitlab.com/citygro/vdata/commits/latest)
[![coverage report](https://gitlab.com/citygro/vdata/badges/latest/coverage.svg)](https://gitlab.com/citygro/vdata/commits/latest)
[![npm downloads](https://img.shields.io/npm/dt/vdata.svg)](https://npmjs.org/package/vdata)
[![npm version](https://img.shields.io/npm/v/vdata.svg)](https://npmjs.org/package/vdata)

vdata(3) -- vue-js-data binding
===============================

> `vdata` requires `vue>=2.1.0`

```sh
$ yarn add js-data @citygro/vdata
# or
$ npm install --save js-data @citygro/vdata
```

## usage

```js
import Vue from 'vue'
import vdata from '@citygro/vdata'
import JSData from 'js-data'

const store = JSData.DS()
const User = store.defineResource('user')

User.inject({id: 1, name: 'tokyo_jesus'})

Vue.use(vdata(store))

const vm = new Vue({
  query: (store) => ({
    count: store.get('user', 1)
  }),
  methods: {
    rename (to) {
      this.$qs.user.name = 'xj9'
      return this.$qs.user.save()
    }
  }
})

vm.rename('xj9').then((user) => {
  expect(user.name).toBe('xj9')
})
```
