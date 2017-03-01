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

const store = new JSData.DS()
const User = store.defineResource('user')

User.inject({id: 1, name: 'tokyo_jesus'})

Vue.use(vdata(store))

const vm = new Vue({
  query: (store, force) => ({
    user: {
      default: {name: null},
      value: store.get('user', 1, {force}),
      constraints: {
        name: {
          presence: true
        }
      }
    },
    posts: store.findAll('post', {user: 1})
  }),
  methods: {
    rename (to) {
      this.$qs.user.name = to
      return this.$qs.user.save()
    }
  }
})

vm.rename('xj9').then((user) => {
  expect(user.name).toBe('xj9')
})
```

## options

### `vm.$options.query(store: JSData.DataStore, force: Boolean): {[key: string]: any}`

this function is used by `vm.$vdata()` to populate `vm.$qs` and update it whenever
the store changes.

queries are resolved using `Q.all()`, arbitrary nested objects will not be resolved. a `Promise`
can *return* nested values, but `@citygro/vdata` will only resolve the promises referenced in
top-level keys.

a query can also be expressed as a plain object with the keys: `default`, `value`, and (optionally) `constraints`. these
allow you additional control over what is injected into your component. constraints can be checked by calling
`vm.$q[field].isValid()`. see [validate.js] docs.

`force` is true for the initial query and false for all subsequent updates. 

[validate.js]: https://validatejs.org/

## properties

### `vm.$q: {[key: string]: Promise | any}`

the return value of the most recent execution `vm.$options.query()`. useful if you need
to access the raw promises/values of your queries.

### `vm.$qs: {[key: string]: any}`

the values resulting from resolving `vm.$q`

### `vm.$qLoading: boolean`

a flag indicating that `vm.$vdata()` is running

### `vm.$vdata: function`

the event handler that manages state updates and resolving promises. called on the `js-data`
`add`, `change`, and `remove` events and the `created` Vue component lifecycle hook.

this handler can be called any time you need to force an update and data sync.