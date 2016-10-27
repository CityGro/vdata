/* global __DEV__ */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import todos from './dux/todos'
import counter from './dux/counter'
import admin from './dux/admin'

const rootReducer = combineReducers({
  todos,
  admin,
  counter
})

const store = createStore(rootReducer, applyMiddleware(thunk))

if (typeof __DEV__ !== 'undefined' && __DEV__) {
  window.store = store
}

export default store
