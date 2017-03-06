import Vue from 'vue'
import {vdata} from '../src/index'
import * as JSData from 'js-data'
import * as JSDataHttp from 'js-data-http'

const store = new JSData.DataStore()
store.registerAdapter('http', new JSDataHttp.HttpAdapter(), {default: true})
store.defineMapper('users')

Vue.use(vdata(store), {
  events: ['all']
})

const Ed = Vue.component('ed', {
  template: `
    <input
      :value="value.name"
      @input="changeName"
      class="form-control"
    />
  `,
  props: {
    value: {
      type: Object
    }
  },
  methods: {
    changeName (event) {
      this.value.name = event.target.value
      this.$emit('input', this.value)
    }
  }
})

const Ax = Vue.component('ax', {
  template: `
    <h1 :class="{'form-group': true}">
      <ed v-model="user"/>
    </h1>
  `,
  components: {Ed},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      user: {name: 'top kek'}
    }
  },
  vdata () {
    this.user = this.$store.get('users', this.value) || this.user
  },
  asyncData: {
    user () {
      return this.$store.find('users', this.value)
    }
  }
})

const Bx = Vue.component('bx', {
  template: `
    <ul class="btn-group">
      <li
        v-for="user in users"
        class="btn btn-default"
        @click="handleClick(user.id)">
        {{user.name}}
      </li> 
    </ul>
  `,
  props: ['value'],
  data () {
    return {
      users: []
    }
  },
  methods: {
    handleClick (id) {
      this.$emit('input', id)
    },
    getUsers () {
      return this.$store.getAll('users')
    }
  },
  vdata () {
    this.user = this.getUsers()
  },
  asyncData: {
    users () {
      return this.$store.findAll('users')
    }
  }
})

new Vue({
  template: `
    <div>
      <ax :value="userId"/>
      <bx @input="handleInput"/>
    </div>
  `,
  components: {Ax, Bx},
  methods: {
    handleInput (id) {
      this.userId = id
    }
  },
  data () {
    return {
      userId: 1
    }
  }
}).$mount('#root')