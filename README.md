# Revue

[![NPM version](https://img.shields.io/npm/v/revue.svg?style=flat-square)](https://www.npmjs.com/package/revue)
[![NPM download](https://img.shields.io/npm/dm/revue.svg?style=flat-square)](https://www.npmjs.com/package/revue)
[![Build Status](https://img.shields.io/circleci/project/egoist/revue/master.svg?style=flat-square)](https://circleci.com/gh/egoist/revue/tree/master)

## Usage

Obviously it works with Redux, install via NPM: `npm i -D redux revue`

```javascript
// App.js
import revue from 'revue'
import store from './store'
Vue.use(revue, {
  store
})

// store.js
// just put some reducers in `./reducers` like
// what you do in pure Redux
// and combine them in `./reducers/index.js`
import { createStore } from 'redux'
import reducer from './reducers/index'
export default createStore(reducer)

// component.js
// some component using Revue
new Vue({
  el: '#app',
  data () {
    return {
      counter: this.$revue.getState().counter
    }
  },
  ready () {
    // subscribe state changes
    this.$subscribe('counter')
  },
  methods: {
    handleClickCounter () {
      // dispatch events
      this.$revue.dispatch({type: 'INCREMENT'})
    }
  }
})
```

[**More detailed usages**](/src)

## License

MIT.
