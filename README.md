[![build status](https://gitlab.com/citygro/vdata/badges/latest/build.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![coverage report](https://gitlab.com/citygro/vdata/badges/latest/coverage.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![npm downloads](https://img.shields.io/npm/dt/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)
[![npm version](https://img.shields.io/npm/v/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)

@citygro/vdata(3) -- vue-js-data binding
===============================

> `@citygro/vdata` requires `vue>=2.1.0`

```sh
$ yarn add js-data @citygro/vdata
# or
$ npm install --save js-data @citygro/vdata
```

## usage

```js
import Vue from 'vue'
import {vdata} from '@citygro/vdata'
import JSData from 'js-data'

const store = new JSData.DataStore()
// .. register adapter ..
store.defineMapper('user')
store.create('user', {id: 1, name: 'tokyo_jesus'})

Vue.use(vdata(store))

const vm = new Vue({
  // called on js-data change and onBeforeUpdate
  vdata (store) {
    this.user = store.get('user', 1)
    this.posts = store.getAll('post', {user: 1})
  },
  asyncData: {
    user () {
      return this.$store.find('user', 1)
    },
    posts () {
      return this.$store.findAll('post', {user: 1})
    }
  },
  methods: {
    rename (to) {
      this.user.name = to
      return this.user.save()
    }
  }
})

vm.rename('xj9').then((user) => {
  expect(user.name).toBe('xj9')
})
```

## install options

### `[options.events=['change', 'add', 'remove']]: string[]`

`JSData.DataStore` events that will trigger state updates

## vm options

### `vm.$options.vdata(store: JSData.DataStore, event: string): void`

> note that `@citygro/vdata` does not react to changes on `vm`, you will need to manually trigger updates if your
> bindings depend on any `vm` state.
>
> see `vm.$vdata()`

run synchronous functions to update component data from the `JSData.DataStore`

### `vm.$options.asyncData: {[key: string]: Function}`

## properties

### `vm.asyncLoading: boolean`

async loading state

### `vm.asyncError: boolean`

async error flag

## methods

### `vm.asyncReload(name: string|void)`

refresh data. if `name` is specified, only that field is updated

### `vm.$vdata(): void`

force state update
