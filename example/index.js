import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'

Vue.use(VueRouter)
if (__DEV__) {
  window.Vue = Vue
}
const router = new VueRouter()
router.map({
  '/': {
    component: require('./views/home')
  }
})
router.start(App, '#app')
