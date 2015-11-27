# Revue

Redux binding for Vue.

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
      counter: this.$revue.getState().counter,
      todo: ''
    }
  },
  ready () {
    // listen state changes
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
