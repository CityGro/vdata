import AsyncDataMixin from './asyncData'
import Q from 'q'
import defaults from 'lodash-es/defaults'
import includes from 'lodash-es/includes'
import isArray from 'lodash-es/isArray'
import property from 'lodash-es/property'
import registerAdapters from './registerAdapters'
import registerSchemas from './registerSchemas'
import throttle from 'lodash-es/throttle'
import {DataStore} from 'js-data'

const getVdata = property('$options.vdata')

const hasVdata = (o: any) => getVdata(o) !== undefined

interface VDataOptions {
    events?: Array<String>;
    adapters: any;
    models: any;
}

let _Vue = {}

/**
 * VData plugin
 */
export default {
    createConfig (fn: (Vue: any) => VDataOptions): VDataOptions {
        return fn(_Vue)
    },
    install (Vue: any, options: VDataOptions): void {
        _Vue = Vue
        options = defaults(options || {}, {
            events: ['add', 'change', 'remove']
        })
        const store = new DataStore()
        Object.defineProperty(Vue, '$store', {
            get () {
                return store
            }
        })
        registerSchemas(store, options.models || {})
        registerAdapters(store, options.adapters)
        console.log('[@citygro/vdata] store ready!', store)
        Vue.mixin(AsyncDataMixin)
        Vue.mixin({
            methods: {
                $vdata (): void {
                    if (hasVdata(this)) {
                        this._vdataHandler('change')
                    }
                }
            },
            beforeCreate (): void {
                if (hasVdata(this)) {
                    const self = this
                    this._vdataHandler = throttle(function (): void {
                        const event = arguments[0]
                        if (includes(options.events, event)) {
                            console.log(`[@citygro/vdata<${self._uid}>] running for ${event}`)
                            self.$options.vdata.call(self, [store, ...arguments])
                        }
                    }.bind(this), 10)
                    store.on('all', self._vdataHandler)
                    console.log(`[@citygro/vdata<${self._uid}>]: ready. listening on`, options.events)
                }
            },
            created () {
                this.$vdata()
            },
            beforeDestroy () {
                if (hasVdata(this)) {
                    store.off('all', this._vdataHandler)
                }
            }
        })
    }
}
