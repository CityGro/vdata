import Vue from 'vue'
import Revue from '../src/revue'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import thunk from 'redux-thunk'
import * as actions from './actions/todos'

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

const reduxStore = createStoreWithMiddleware(reducer)

const store = new Revue(Vue, reduxStore, actions)

if (typeof __DEV__ !== 'undefined' && __DEV__) {
	window.store = store
}

export default store
