import Vue from 'vue'
import {vdata} from '../src/index'
import * as JSData from 'js-data'
import * as JSDataHttp from 'js-data-http'

const store = new JSData.DataStore()
store.registerAdapter('http', new JSDataHttp.HttpAdapter(), {default: true})
store.defineMapper('users')

Vue.use(vdata(store))

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
      type: Object,
      required: true
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
    <h1 :class="{'form-group': true, 'has-error': !$q.user.isValid()}">
      <ed v-model="$qs.user"/>
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
    this.user = this.$store.get('users', this.value)
  },
  asyncData: {
    user () {
      return this.$store.find('users', this.value)
    }
  }
})

const Bx = Vue.component('bx', {
  template: `
    <ul>
      <li
        v-for="user in users"
        class="btn btn-default"
        @click="$emit('input', {event: {target: {value: user.id}}}">
        {{user.name}}
      </li> 
    </ul>
  `,
  props: ['value'],
  data: {
    users: []
  },
  vdata () {
    this.users = this.$store.getAll('users')
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
      <bx v-model="userId"/>
    </div>
  `,
  components: {Ax, Bx},
  data () {
    return {
      userId: 1
    }
  }
}).$mount('#root')