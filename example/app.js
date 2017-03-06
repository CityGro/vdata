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
    <div class="input-group">
      <span class="input-group-addon">id: {{value.id}}</span> 
      <input
        :value="value.name"
        @input="changeName"
        class="form-control"
      />
    </div>
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
  },
  watch: {
    value () {
      this.$vdata()
    }
  }
})

const Bx = Vue.component('bx', {
  template: `
    <ul class="btn-group" :id="n">
      <li
        class="btn btn-info disabled">
        {{count}} users
      </li>
      <li
        v-for="user in users"
        :class="getStatus(user.id)"
        @click="handleClick(user.id)">
        {{user.name}}
      </li> 
      <li
        class="btn btn-success"
        @click="createUser">
        +
      </li>
    </ul>
  `,
  props: ['value'],
  data () {
    return {
      users: [],
      n: 0
    }
  },
  methods: {
    handleClick (id) {
      this.$emit('input', id)
    },
    createUser () {
      this.$store.create('users', {name: 'new user'})
    },
    getUsers (store) {
      return store.getAll('users')
    },
    getStatus (id) {
      return {
        'btn': true,
        'btn-default': id != this.value,
        'btn-primary': id == this.value
      }
    }
  },
  computed: {
    count () {
      return this.users.length
    }
  },
  vdata () {
    this.users = this.getUsers(store)
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
      <bx :value="userId" @input="handleInput"/>
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