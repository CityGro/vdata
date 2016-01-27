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
</p>

## Example

https://github.com/egoist/how-often

## Usage

**New:** [Time to use Redux-devtools in non-React apps!](https://github.com/egoist/redux-devtools-script)

Obviously it works with Redux, install via NPM: `npm i -D redux revue`

You can also hot-link the CDN version: https://npmcdn.com/revue/revue.js, `Revue` is exposed to `window` object.

```javascript
// App.js
import Revue from 'revue'
import store from './store'
import actions from './actions'
Vue.use(Revue, {
  store,
  // if you want to call your actions from vm instance
  // then your vm you can call like `this.$actions.addTodo(todo)`
  actions
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

Yes. However the Redux store is a single immutable tree, you can think each property in the tree as a single store, to subscribe a state is like to subscribe its store (here we can call it a subscriber). I think Revue is kinda like [Alt.js](http://alt.js.org) somehow.

## Development

- **npm test** for unit test
- **npm run watch** to build example
- **serve example** to view demo
- **make publish** to publish a new version
- **npm run demo** to publish demo to surge

## License

MIT &copy; [EGOIST](https://github.com/egoist)
