/* global __DEV__ */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Vdeux from '../src/vdeux'

import App from './App'

Vue.use(VueRouter)
Vue.user(Vdeux)

if (__DEV__) {
  window.Vue = Vue
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component(resolve) {
        require(['./views/home'], resolve)
      }
    }
  ]
})

new Vue({
  router,
  store,
  render(h) {
    return h('app')
  }
}).$mount('#app')
