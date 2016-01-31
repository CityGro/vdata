import Vue from 'vue'
import Revue from '../src/revue'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

const reduxStore = createStoreWithMiddleware(reducer)

const store = new Revue(Vue, reduxStore)

export default store
