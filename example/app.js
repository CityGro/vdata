import Vue from 'vue'
import {vdata} from '../src/index'
import * as JSData from 'js-data'
import * as JSDataHttp from 'js-data-http'
import map from 'lodash/map'

const ds = new JSData.DataStore()
ds.registerAdapter('http', new JSDataHttp.HttpAdapter(), {default: true})
ds.defineMapper('users')

Vue.use(vdata(ds))

const Ed = Vue.component('ed', {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  render (h) {
    let self = this
    return h('input', {
      domProps: {
        value: self.value.name
      },
      class: {
        'form-control': true
      },
      on: {
        input (event) {
          self.$emit('input', event)
        }
      }
    })
  }
})

const Ax = Vue.component('ax', {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  query (store, force) {
    return {
      user: {
        default: {name: 'kek'},
        value: store.find('users', this.value, {force}),
        constraints: {
          name: {
            presence: true,
            format: {
              pattern: /^[a-z0-9]+$/
            }
          }
        }
      }
    }
  },
  render (h) {
    let self = this
    return h('h1', {
      class: {
        'form-group': true,
        'has-error': !self.$q.user.isValid()
      }
    }, [
      h(Ed, {
        props: {
          value: self.$qs.user
        },
        on: {
          input (event) {
            self.$qs.user.name = event.target.value
            self.$qs.user.commit()
          }
        }
      })
    ])
  }
})

const Bx = Vue.component('bx', {
  render (h) {
    let self = this
    return h('ul', {
      class: {
        'btn-group': true
      }
    }, map(this.$qs.users, (user) => h('li', {
      class: {
        'btn': true,
        'btn-default': true
      },
      on: {
        click () {
          self.$emit('input', {target: {value: user.id}})
        }
      }
    }, String(user.name))))
  },
  query: (store, force) => {
    return {
      users: store.findAll('users', null, {force})
    }
  }
})

new Vue({
  data () {
    return {
      userId: 1
    }
  },
  render (h) {
    let self = this
    return h('div', null, [
      h(Ax, {
        props: {
          value: self.userId
        }
      }),
      h(Bx, {
        on: {
          input (event) {
            self.userId = event.target.value
          }
        }
      })
    ])
  }
}).$mount('#root')