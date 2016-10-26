// to valid and match like `a as x.y.z`
const re = /^([\w\.-]+)\s+as\s+([\w\.-]+)$/i

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

function deepProp(obj, path){
	return path.split('.').reduce((o, p) => o[p], obj);
};

/**
 * Bind reduxStore to Vue instance
 *
 * @param {Vue} Vue
 * @param {object} store - redux store
 */
function bindVue(Vue, store) {
	Vue.mixin({
		created() {
			if (this._bindProps) {
				const handleChange = () => {
					this._bindProps.forEach(prop => {
						const {storeProp, realProp} = prop
						if (realProp && storeProp) {
							this.$set(realProp, deepProp(store.getState(), storeProp))
						}
					})
				}
				this._unsubscribe = store.subscribe(handleChange)
			}
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
		return deepProp(store.getState(), prop.storeProp)
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
		return this.store.dispatch(...args)
	}
}
