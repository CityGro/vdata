// to valid and match like `a as x.y.z`
const re = /^([a-zA-Z0-9_-]+)\s{1,2}as\s{1,2}([a-zA-Z0-9\._-]+)$/i

const isDev = process.env.NODE_ENV !== 'production'

function parseProp(prop) {
	// realProp: property name/path in your instance
	// storeProp: property name/path in Redux store
	let realProp = prop
	let storeProp = prop
	if (re.test(prop)) {
		[, storeProp, realProp] = prop.match(re)
	}
	return {storeProp, realProp}
}

/**
 * Bind reduxStore to Vue instance
 *
 * @param {Vue} Vue
 * @param {object} store - redux store
 */
function bindVue(Vue, store) {
	Vue.mixin({
		created() {
			const handleChange = () => {
				this._bindProps.forEach(prop => {
					const {storeProp, realProp} = prop
					if (realProp && storeProp) {
						const currentValue = store.getState()[storeProp]
						this.$set(realProp, currentValue)
					}
				})
			}
			this._unsubscribe = store.subscribe(handleChange)
		},
		beforeDestroy() {
			if (this._unsubscribe) {
				this._unsubscribe()
			}
		}
	})
	Vue.prototype.$select = function (prop) {
		// realProp: property name/path in your instance
		// storeProp: property name/path in Redux store
		this._bindProps = this._bindProps || []
		prop = parseProp(prop)
		this._bindProps.push(prop)
		return store.getState()[prop.storeProp]
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
