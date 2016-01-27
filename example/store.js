import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(
)(createStore)

export default createStoreWithMiddleware(reducer)
