import Vue from 'vue'
import VueRouter from 'vue-router'
import Revue from '../src/revue'
import store from './store'
import App from './app'
Vue.use(Revue, {
  store
})
Vue.use(VueRouter)
if (__DEV__) {
  window.Vue = Vue
  window.ReduxStore = store
}
const router = new VueRouter()
router.map({
  '/': {
    component: require('./views/home')
  }
})
router.start(App, '#app')
