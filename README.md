<h1 align="center">Revue</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/revue">
    <img src="https://camo.githubusercontent.com/b145895dcb12693255d3b4b371446ea6b73fa357/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72657675652e737667" alt="NPM version" style="max-width:100%;">
  </a>
  <a href="https://www.npmjs.com/package/revue">
    <img src="https://camo.githubusercontent.com/49a99ffd8da7a0793e1d648f859792e9b1db45fa/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f72657675652e737667" alt="NPM download" style="max-width:100%;"></a>
  <a href="https://travis-ci.org/egoist/revue">
    <img src="https://img.shields.io/travis/egoist/revue/master.svg" alt="Build Status" style="max-width:100%;">
  </a>
  <img src="https://img.shields.io/badge/stablity-experimental-red.svg">
</p>

Here is 2.0 branch, for version 1.0 please view [master](https://github.com/egoist/revue/tree/master) branch

## Usage

**New:** [Time to use Redux-devtools in non-React apps!](https://github.com/egoist/redux-devtools-script)

Obviously it works with Redux, install via NPM: `npm i -D redux revue`

You can also hot-link the CDN version: https://npmcdn.com/revue/revue.js, `Revue` is exposed to `window` object.

```javascript
// store.js
// just put some reducers in `./reducers` like
// what you do in pure Redux
// and combine them in `./reducers/index.js`
import Vue from 'vue'
import Revue from 'revue'
import { createStore } from 'redux'
import reducer from './reducers/index'
// create a redux store
const reduxStore = createStore(reducer)
// create a revueStore which has a binding to Vue
const store = new Revue(Vue, reduxStore)
// expost this store instance
export default store

// component.js
// some component using Revue
import store from './store'
new Vue({
  el: '#app',
  data () {
    return {
      counter: store.state.counter
    }
  },
  created () {
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
      // could be a plain object or call an action creator
      store.dispatch({type: 'INCREMENT'})

      // or wrap your action creator as a thunk
      // so you implicitly fire `dispatch action`
      const fire = store.wrap(actions)
      // the `actions` accept an actions object or a single action function
      fire.increment()
      // equal to store.dispatch(actions.increment())
      fire.addTodo({/* your todo */})
      // equal to store.dispatch(actions.addTodo())
    }
  }
})
```

[**More detailed usages**](/example)

## Hot-reload reducers

Just change your `store.js` like this:

Before:

```javascript
import { createStore } from 'redux'
import rootReducer from './reducers'

export default new Revue(Vue, createStore(rootReducer))
```

After:

```javascript
import { createStore } from 'redux'
import rootReducer from './reducers'

function configureStore() {
  const reduxStore = createStore(rootReducer)
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      reduxStore.replaceReducer(nextRootReducer)
    })
  }
  return reduxStore
}

new Revue(configureStore(), Vue)
```

## FAQ

**Do I have to use `this.$subscribe`? It's so verbose.**

Yes. However the Redux store is a single immutable tree, you can think each property in the tree as a single store, to subscribe a state is like to subscribe its store (here we can call it a subscriber). I think Revue is kinda like [Alt.js](http://alt.js.org) somehow.

## Development

- **npm test** for unit test
- **npm run watch** to build example
- **serve example** to view demo
- **make publish** to publish a new version
- **npm run demo** to publish demo to surge

## License

MIT &copy; [EGOIST](https://github.com/egoist)
