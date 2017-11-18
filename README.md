[![build status](https://gitlab.com/citygro/vdata/badges/latest/build.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![coverage report](https://gitlab.com/citygro/vdata/badges/latest/coverage.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![npm downloads](https://img.shields.io/npm/dt/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)
[![npm version](https://img.shields.io/npm/v/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)

@citygro/vdata(3) -- reactive query model
=========================================

> `@citygro/vdata` requires `vue>=2.1.0`

```sh
$ yarn add js-data-http @citygro/vdata
```

## usage

```js
import Vue from 'vue'
import {vdata} from '@citygro/vdata'
import HttpAdapter from 'js-data-http'

Vue.use(vdata, vdata.createConfig(() => ({
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
})))

// doTheThing()
```

## `vdataConfig: Object`

### `events: Array<string>`

`JSData` events that should trigger a `vdata` update procedure.

- add
- change
- remove

### `models: Object`

a mapping of [`JSData` models](http://api.js-data.io/js-data/3.0.1/Mapper.html).

```
{
  models: {
    [name]: {
      name: String,
      idAttribute: String
    }
  }
}
```

### `adapters: Object`

a mapping of `JSData` adapter instances. each adapter has its own options,
check the docs for your specific choice.

```
{
  adapters: {
    [name]: {
      adapter: AdapterInstance,
      default: Boolean
    }
  }
}
```

## dataflow

`vdata` provides a rich vocabulary for working with and modifying complex
data.

### `handleChange(diff: Object)`

```
// ...
import {DataFlowMixin} from '@citygro/vdata'

export default {
  name: 'my-editor',
  mixins: [DataFlowMixin],
  template: '<text-input :value="value.key" @input="handleChange({key: $event})" />'
}
```
