<h1 align="center">Revue</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/revue">
    <img src="https://camo.githubusercontent.com/b145895dcb12693255d3b4b371446ea6b73fa357/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72657675652e737667" alt="NPM version" style="max-width:100%;">
  </a>
  <a href="https://www.npmjs.com/package/revue">
    <img src="https://camo.githubusercontent.com/49a99ffd8da7a0793e1d648f859792e9b1db45fa/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f72657675652e737667" alt="NPM download" style="max-width:100%;"></a>
  <a href="https://semaphoreci.com/egoist/revue">
    <img src="https://img.shields.io/travis/egoist/revue/master.svg" alt="Build Status" style="max-width:100%;">
  </a>
</p>

<p align="center">
  <a href="https://github.com/egoist/vuepack">
    <img src="https://cloud.githubusercontent.com/assets/8784712/11776407/cb9d0838-a281-11e5-8d75-c6b2a7c9978f.png" alt="vuepack">
  </a>
</p>

## Usage

**New:** [Time to use Redux-devtools in non-React apps!](https://github.com/egoist/redux-devtools-script)

Obviously it works with Redux, install via NPM: `npm i -D redux revue`

You can also hot-link the CDN version: https://npmcdn.com/revue/revue.js, `Revue` is exposed to `window` object.

```javascript
// App.js
import Revue from 'revue'
import store from './store'
Vue.use(Revue, {
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
      counter: this.$store.state.counter
    }
  },
  ready () {
    // subscribe state changes
    this.$subscribe('counter')
    // if your name the 'counter' to 'temp_counter' in data()
    // you can use this.$subscribe('counter as temp_counter')
    // if you want to subscribe a deep property
    // this.$subscribe('top.middle.counter as counter')
    // or even this.$subscribe('something.in.reduxStore.counter as instance.somewhere.counter')
    // you can only $subscribe once, if you want to subscribe multi states at the same time, do this:
    /*
    this.$subscribe(
      'foo',
      'bar'
    )
    */
  },
  methods: {
    handleClickCounter () {
      // dispatch events
      this.$store.dispatch({type: 'INCREMENT'})
    }
  }
})
```

[**More detailed usages**](/src)

## Hot-reload reducers

Just change your `store.js` like this:

Before:

```javascript
import { createStore } from 'redux'
import rootReducer from './reducers'

export default createStore(rootReducer)
```

After:

```javascript
import { createStore } from 'redux'
import rootReducer from './reducers'

function configureStore() {
  const store = createStore(rootReducer)
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}

export default configureStore()
```

## FAQ

**Do I have to use `this.$subscribe`? It's so verbose.**

No, not always if you don't care about mutating states in reducers. And also because Vue states are mutable and observable, it's ok for you to modify data directly like `state.foo = 'bar'`, then it becomes so similar to the Vue Flux implementation [Vuex](https://github.com/vuejs/vuex), it allows you to mutate data. However what the best part of Redux is states are immutable, which means you can't make direct operations on states so that you have less chance to make mistakes.

`this.$subscribe` is only needed if you don't mutate states directly. And you're recommended to do so.

## License

MIT &copy; [EGOIST](https://github.com/egoist)
