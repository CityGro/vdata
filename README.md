@citygro/vdata -- reactive query model
======================================

[![build status](https://gitlab.com/citygro/vdata/badges/latest/build.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![coverage report](https://gitlab.com/citygro/vdata/badges/latest/coverage.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![npm downloads](https://img.shields.io/npm/dt/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)
[![npm version](https://img.shields.io/npm/v/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)
[![license](https://img.shields.io/npm/l/@citygro/vdata.svg)](https://gitlab.com/citygro/vdata/blob/latest/LICENSE)

```sh
yarn add js-data-$adapter @citygro/vdata
```

1. [usage](#usage)
2. [`vdataConfig`](#vdataconfig-object)
3. [dataflow](#dataflow)
4. [`asyncData`](#asyncdata)
5. [`vdata`](#vdata)
6. [`vQuery`](#vquery)
7. [utils](#utils)

## usage

```js
import Vue from 'vue'
import {vdata} from '@citygro/vdata'
import HttpAdapter from 'js-data-http'

Vue.use(vdata, {
  models: {
    user: {
      // options
    }
  },
  adapters: {
    http: {
      adapter: new HttpAdapter()
    }
  }
})

// doTheThing()
```

## `vdataConfig: object`

### `events: string[]`

> first, familiarize yourself with [js-data events](http://api.js-data.io/js-data/3.0.1/DataStore.html#event:add).

`JSData` events that should trigger a `vdata` update procedure.

- add
- change
- remove

### `models: object`

a mapping of [`JSData` models](http://api.js-data.io/js-data/3.0.1/Mapper.html).

```
{
  models: {
    name: {
      idAttribute: String
    }
  }
}
```

### `adapters: object`

a mapping of `JSData` adapter instances. each adapter has its own options,
check the docs for your specific choice.

```
{
  adapters: {
    label: {
      adapter: AdapterInstance,
      default: Boolean
    }
  }
}
```

## dataflow

> this is a BETA feature

`vdata` provides a rich vocabulary for working with and modifying complex
data.

### `handleChange(diff: object)`

> see this [in a fiddle](https://jsfiddle.net/v4wtgkmg/1/)

```
// ...
import {DataFlowMixin} from '@citygro/vdata'

export default {
  name: 'my-editor',
  mixins: [DataFlowMixin],
  template: '<text-input :value="value.key" @input="handleChange({key: $event})" />'
}
```

### `handleKeyChange(key: string, diff: object)`

### `handleArrayChange(i: number, diff: object)`

### `handleArrayKeyChange(i: number, key: string, diff: object)`

### `pushToArray(diff: any)`

### `pushToArrayKey(key: string, diff: any)`

### `removeFromArray(i: number)`

### `removeFromArrayKey(i: number, key: string)`

## `asyncData`

```
import {to} from '@citygro/vdata'

export default {
  // ...
  asyncData: {
    async prop () {
      const [err, data] = await to(this.$store.findAll('model'))
      if (err) {
        console.error(err)
      }
      return data
    },
    propDefault: () => [],
    propLazy: true
  }
  // ...
}
```

### `$asyncReload(propertyName?: string, skipLazy?: bool)`

force reload asyncData, optionally by `propertyName`

### `asyncData.[prop]()`

an async function that resolves to the result of a query or any other promise

### `asyncData.[prop]Default: any`

the default value of `[prop]`. use an arrow function for `Object` and `Array` values

### `asyncData.[prop]Lazy: bool`

by default `[prop]` is invoked automatically when the component is created. if `[prop]Lazy === true`
you will need to invoke `asyncReload()` or `asyncReload('prop')`

## vdata

> see [events](#events-arraystring)

`vm.$vdata()` is invoked whenever a js-data event is fired and on `vm.$options.created()`.

## utils

### `import {to} from '@citygro/vdata'`

```
async function foo () {
  const [err, data] = await to(myAsyncTask())
  if (err) {
    // handle my error
  }
  const result data.map(/* transform */)
  return result
}
```
