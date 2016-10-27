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
