// to valid and match like `a as x.y.z`
const re = /^([a-zA-Z0-9_-]+)\s{1,2}as\s{1,2}([a-zA-Z0-9\._-]+)$/i

const isDev = process.env.NODE_ENV !== 'production'

/**
 * Bind reduxStore to Vue instance
 *
 * @param {Vue} Vue
 * @param {object} store - redux store
 */
function bindVue(Vue, store) {
	Vue.prototype.$subscribe = function (...args) {
		if (this._calledOnce) {
			if (isDev) {
				throw new Error('[Revue] You can only subscribe once, pass multi args to subscribe more than one state.')
			}
			return false
		}
		this._calledOnce = true
		const handleChange = () => {
			args.forEach(prop => {
				// realProp: property name/path in your instance
				// storeProp: property name/path in Redux store
				let realProp = prop
				let storeProp = prop
				if (re.test(prop)) {
					[, storeProp, realProp] = prop.match(re)
				}
				if (realProp && storeProp) {
					const currentValue = store.getState()[storeProp]
					this.$set(realProp, currentValue)
				}
			})
		}
		this._unsubscribe = store.subscribe(handleChange)
		Vue.mixin({
			beforeDestroy() {
				if (this._unsubscribe) {
					this._calledOnce = false
					this.unsubscribe()
				}
			}
		})
	}
}

export default class Revue {
	constructor(Vue, reduxStore, reduxActions) {
		this.store = reduxStore
		bindVue(Vue, this.store)
		if (reduxActions) {
			this.reduxActions = reduxActions
		}
	}
	get state() {
		return this.store.getState()
	}
	get actions() {
		if (isDev && !this.reduxActions) {
			throw new Error('[Revue] Binding actions to Revue before calling them!')
		}
		return this.reduxActions
	}
	dispatch(...args) {
		this.store.dispatch.apply(null, args)
		return this
	}
}
