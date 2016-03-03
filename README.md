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

> Learn [Redux](http://redux.js.org/) before using Revue. That would help you get rid of JavaScript fatigue, sort of.

## Usage

Obviously it works with Redux, install via NPM: `npm i --save redux revue`

You can also hot-link the CDN version: https://npmcdn.com/revue/revue.js, `Revue` is exposed to `window` object.

## The Gist

You can try it online! http://esnextb.in/?gist=b300931ac26da8e9de2f

**store.js**

```js
import Vue from 'vue'
import Revue from 'revue'
import {createStore} from 'redux'
// create the logic how you would update the todos
import todos from './reducers/todos'
// create some redux actions
import actions from './actions'

// create a redux store
const reduxStore = createStore(todos)
// binding the store to Vue instance, actions are optional
const store = new Revue(Vue, reduxStore, actions)
// expose the store for your component to use
export default store
```

**actions/todos.js**

```js
// create actionCreators yourself or use `redux-actions`
export function addTodo(payload) {
  return {type: 'ADD_TODO', payload}
}
export function toggleTodo(payload) {
  return {type: 'TOGGLE_TODO', payload}
}
```

**component.js**

```js
import store from './store'
import * as todoActions from './actions/todo'

export default {
  data() {
    return {
      todo: '',
      todos: this.$select('todos')
      //=> subscribe state.todos to vm.todos
      // if prop is not in top level
      // do this.$select('todos as path.to.todos')
    }
  },
  methods: {
    addTodo() {
      store.dispatch({type: 'ADD_TODO', this.todo})
      // or use the actionCreator
      store.dispatch(todoActions.addTodo(this.todo))
      // also equal to: (if you binded actions when creating the store)
      const {addTodo} = store.actions
      store.dispatch(addTodo(this.todo))
    }
  }
}
```

[**More detailed usages**](/example)

## [Recipes](https://github.com/revue/revue/issues?q=is%3Aissue+is%3Aclosed+label%3Arecipe) 🍳

- [Use webpack alias to resolve store.js](https://github.com/revue/revue/issues/8)
- [Using bindActionCreators](https://github.com/revue/revue/issues/7)

## Development

- **npm test** run unit test
- **npm run watch** build example
- **serve example** serve example
- **make publish** publish a new version
- **npm run cjs** build in CommonJS format
- **npm run umd** build in umd format
- **npm run demo** to publish demo to surge

## License

MIT &copy; [EGOIST](https://github.com/egoist)
