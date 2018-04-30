@citygro/vdata -- reactive query model
======================================

[![build status](https://gitlab.com/citygro/vdata/badges/latest/build.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![coverage report](https://gitlab.com/citygro/vdata/badges/latest/coverage.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![npm downloads](https://img.shields.io/npm/dt/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)
[![npm version](https://img.shields.io/npm/v/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)
[![license](https://img.shields.io/npm/l/@citygro/vdata.svg)](https://gitlab.com/citygro/vdata/blob/latest/LICENSE)

```sh
yarn add @citygro/vdata
```

> if you are building a `webpack` or `babel` project you can make
> `@citygro/vdata` smaller (via tree shaking and chunking) by aliasing this
> package to `node_modules/@citygro/vdata/src/index.js` rather than using our
> commonjs bundle.

## Modules

<dl>
<dt><a href="#module_createMixinForItemById">createMixinForItemById</a></dt>
<dd></dd>
<dt><a href="#module_Store">Store</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#handleChange">handleChange</a></dt>
<dd></dd>
<dt><a href="#handleKeyChange">handleKeyChange</a></dt>
<dd></dd>
<dt><a href="#handleArrayChange">handleArrayChange</a></dt>
<dd></dd>
<dt><a href="#handleArrayKeyChange">handleArrayKeyChange</a></dt>
<dd></dd>
<dt><a href="#pushToArray">pushToArray</a></dt>
<dd></dd>
<dt><a href="#pushToArrayKey">pushToArrayKey</a></dt>
<dd></dd>
<dt><a href="#removeFromArray">removeFromArray</a></dt>
<dd></dd>
<dt><a href="#removeFromArrayKey">removeFromArrayKey</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createDataFlowMixin">createDataFlowMixin(valueProp)</a></dt>
<dd><p>create a dataflow mixin for a given value prop.</p>
<p>a &#39;value&#39; dataflow implements the <code>v-model</code> interface.</p>
<p>custom dataflows follow a pattern: methods are prefixed with the <code>valueProp</code>
name and <code>update:${valueProp}</code> is emitted.</p>
</dd>
<dt><a href="#add">add(vm)</a></dt>
<dd><p>register handlers that will run on datastore events</p>
</dd>
<dt><a href="#createMixinForItemById">createMixinForItemById(options)</a> ⇒ <code>object</code></dt>
<dd><p>create a mixin that configures a vm to manipulate a single record. you can
use a prop to ask for a record by id or specify a template to create a new
record that is pre-populated with some initial state.</p>
<pre><code class="lang-javascript">// @/queries/UserById.js
import {createMixinForItemById} from &#39;@citygro/vdata&#39;

export default {
  mixins: [
    createMixinForItemById({
      idPropertyName: &#39;userId&#39;,
      collectionName: &#39;users&#39;,
      localPropertyName: &#39;user&#39;,
      requestOptions: {
        capture: false
      }
   })
  ]
}
</code></pre>
<p>a vm which consumes this mixin will have the following props, methods, data,
&amp;c. it will also be configured to react to changes to data in the store and
update itself accordingly.</p>
<pre><code class="lang-javascript">{
  props: {
    userid: String,
    userRequestOptionsOverride: Object
  },
  data: {
    user: Object,
  },
  methods: {
    userSave: Function,
  },
  computed: {
    asyncLoading: Boolean,
    userLoading: Boolean,
    userHasChanges: Boolean
  }
}
</code></pre>
<p><code>@/queries/UserById</code> defines a query that fetches and captures the initial state
for a user record. lets say we have a particular editor that provides read-only
access to a particular resource for some users and read/write access for
others.</p>
<p>for the case where the editor should be read/write we can default some props
in the vm to change its behavior depending on the permissions of the current
user.</p>
<pre><code class="lang-javascript">// UserEditor.js
import UserById from &#39;@/queries/UserById&#39;

export default {
  mixins: [
    UserById
  ],
  props: {
    userRequestOptionsOverride: {
      default () {
        return {
          capture: this.$session.hasPermissionToEditUsers()
        }
      }
    }
  } // ...
}
</code></pre>
</dd>
<dt><a href="#createStore">createStore(options)</a> ⇒ <code>Store</code></dt>
<dd></dd>
<dt><a href="#nullify">nullify(object)</a> ⇒ <code>Object</code></dt>
<dd><p>replace all values in an object with <code>null</code>. used to generate the ORSet for
diffing operations.</p>
</dd>
<dt><a href="#difference">difference(base, object)</a> ⇒ <code>object</code></dt>
<dd></dd>
<dt><a href="#flattenMixinTree">flattenMixinTree(mixins)</a></dt>
<dd></dd>
<dt><a href="#toQueryString">toQueryString(o, prefix)</a></dt>
<dd></dd>
</dl>

<a name="module_createMixinForItemById"></a>

## createMixinForItemById
<a name="module_Store"></a>

## Store
<a name="handleChange"></a>

## handleChange
**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>object</code> | 
| diff | <code>object</code> | 

<a name="handleKeyChange"></a>

## handleKeyChange
**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>object</code> | 
| key | <code>string</code> | 
| diff | <code>object</code> | 

<a name="handleArrayChange"></a>

## handleArrayChange
**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>object</code> | 
| i | <code>number</code> | 
| diff | <code>object</code> | 

<a name="handleArrayKeyChange"></a>

## handleArrayKeyChange
**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>object</code> | 
| i | <code>number</code> | 
| key | <code>string</code> | 
| diff | <code>object</code> | 

<a name="pushToArray"></a>

## pushToArray
**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>array</code> | 
| diff | <code>object</code> | 

<a name="pushToArrayKey"></a>

## pushToArrayKey
**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>object</code> | 
| key | <code>string</code> | 
| diff | <code>object</code> | 

<a name="removeFromArray"></a>

## removeFromArray
**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>array</code> | 
| i | <code>number</code> | 

<a name="removeFromArrayKey"></a>

## removeFromArrayKey
**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>object</code> | 
| i | <code>number</code> | 
| key | <code>string</code> | 

<a name="createDataFlowMixin"></a>

## createDataFlowMixin(valueProp)
create a dataflow mixin for a given value prop.

a 'value' dataflow implements the `v-model` interface.

custom dataflows follow a pattern: methods are prefixed with the `valueProp`
name and `update:${valueProp}` is emitted.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| valueProp | <code>string</code> | bind dataflow to this prop |

<a name="add"></a>

## add(vm)
register handlers that will run on datastore events

**Kind**: global function  

| Param | Type |
| --- | --- |
| vm | <code>Vue.Component</code> | 

<a name="createMixinForItemById"></a>

## createMixinForItemById(options) ⇒ <code>object</code>
create a mixin that configures a vm to manipulate a single record. you can
use a prop to ask for a record by id or specify a template to create a new
record that is pre-populated with some initial state.

```javascript
// @/queries/UserById.js
import {createMixinForItemById} from '@citygro/vdata'

export default {
  mixins: [
    createMixinForItemById({
      idPropertyName: 'userId',
      collectionName: 'users',
      localPropertyName: 'user',
      requestOptions: {
        capture: false
      }
   })
  ]
}
```

a vm which consumes this mixin will have the following props, methods, data,
&c. it will also be configured to react to changes to data in the store and
update itself accordingly.

```javascript
{
  props: {
    userid: String,
    userRequestOptionsOverride: Object
  },
  data: {
    user: Object,
  },
  methods: {
    userSave: Function,
  },
  computed: {
    asyncLoading: Boolean,
    userLoading: Boolean,
    userHasChanges: Boolean
  }
}
```

`@/queries/UserById` defines a query that fetches and captures the initial state
for a user record. lets say we have a particular editor that provides read-only
access to a particular resource for some users and read/write access for
others.

for the case where the editor should be read/write we can default some props
in the vm to change its behavior depending on the permissions of the current
user.

```javascript
// UserEditor.js
import UserById from '@/queries/UserById'

export default {
  mixins: [
    UserById
  ],
  props: {
    userRequestOptionsOverride: {
      default () {
        return {
          capture: this.$session.hasPermissionToEditUsers()
        }
      }
    }
  } // ...
}
```

**Kind**: global function  
**Returns**: <code>object</code> - item-by-id query mixin  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.collectionName | <code>string</code> |  |  |
| options.localPropertyName | <code>string</code> |  | the vm data where the result of the query will be stored |
| [options.idPropertyName] | <code>string</code> | <code>&quot;id&quot;</code> | the name of the prop you will use to specify the id of the requested record |
| [options.requestOptions] | <code>object</code> |  | control some of the behavior of the query |
| [options.requestOptions.force] | <code>boolean</code> | <code>false</code> | always fetch the latest record |
| [options.requestOptions.capture] | <code>boolean</code> | <code>false</code> | capture the initial state of the record, implies `force = true` |
| [options.template] | <code>object</code> | <code>{}</code> | the default template for this query |

<a name="createStore"></a>

## createStore(options) ⇒ <code>Store</code>
**Kind**: global function  
**Returns**: <code>Store</code> - a vdata store instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.models | <code>Object</code> |  |  |
| [options.basePath] | <code>String</code> | <code>&#x27;&#x27;</code> | default prefix for http requests |
| [options.adapter] | <code>function</code> |  | a custom fetch |
| [options.deserialize] | <code>function</code> |  | request post-processing |


* [createStore(options)](#createStore) ⇒ <code>Store</code>
    * [~Store](#createStore..Store)
        * [.createRecord(collection, [data])](#createStore..Store+createRecord) ⇒ <code>Object</code>
        * [.get(collectionName, pkOrId)](#createStore..Store+get) ⇒ <code>Object</code>
        * [.getList(collectionName, [keys])](#createStore..Store+getList) ⇒ <code>Array.&lt;object&gt;</code>
        * [.remove(collectionName, pkOrId, options)](#createStore..Store+remove) ⇒ <code>Object</code>
        * [.removeList(collectionName, keys)](#createStore..Store+removeList) ⇒ <code>Array.&lt;object&gt;</code>
        * [.clear()](#createStore..Store+clear)
        * [.rebase(collection, data)](#createStore..Store+rebase) ⇒ <code>Object</code>
        * [.add(collection, data, options)](#createStore..Store+add) ⇒ <code>Object</code>
        * [.addList(collectionName, data)](#createStore..Store+addList) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.hasChanges(collectionName, data)](#createStore..Store+hasChanges) ⇒ <code>Boolean</code>
        * [.destroy(collectionName, data, options)](#createStore..Store+destroy) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.save(collection, data, options)](#createStore..Store+save) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.find(collection, [query], [options])](#createStore..Store+find) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.findAll(collection, [query], [options])](#createStore..Store+findAll) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
        * [.on(event, handler)](#createStore..Store+on)
        * [.off(event, handler)](#createStore..Store+off)
        * [.emit(event, payload)](#createStore..Store+emit)
        * [.getBasePath(collectionName)](#createStore..Store+getBasePath) ⇒ <code>String</code>
        * [.isValidId(id)](#createStore..Store+isValidId) ⇒ <code>Boolean</code>

<a name="createStore..Store"></a>

### createStore~Store
**Kind**: inner class of [<code>createStore</code>](#createStore)  

* [~Store](#createStore..Store)
    * [.createRecord(collection, [data])](#createStore..Store+createRecord) ⇒ <code>Object</code>
    * [.get(collectionName, pkOrId)](#createStore..Store+get) ⇒ <code>Object</code>
    * [.getList(collectionName, [keys])](#createStore..Store+getList) ⇒ <code>Array.&lt;object&gt;</code>
    * [.remove(collectionName, pkOrId, options)](#createStore..Store+remove) ⇒ <code>Object</code>
    * [.removeList(collectionName, keys)](#createStore..Store+removeList) ⇒ <code>Array.&lt;object&gt;</code>
    * [.clear()](#createStore..Store+clear)
    * [.rebase(collection, data)](#createStore..Store+rebase) ⇒ <code>Object</code>
    * [.add(collection, data, options)](#createStore..Store+add) ⇒ <code>Object</code>
    * [.addList(collectionName, data)](#createStore..Store+addList) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.hasChanges(collectionName, data)](#createStore..Store+hasChanges) ⇒ <code>Boolean</code>
    * [.destroy(collectionName, data, options)](#createStore..Store+destroy) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.save(collection, data, options)](#createStore..Store+save) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.find(collection, [query], [options])](#createStore..Store+find) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.findAll(collection, [query], [options])](#createStore..Store+findAll) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.on(event, handler)](#createStore..Store+on)
    * [.off(event, handler)](#createStore..Store+off)
    * [.emit(event, payload)](#createStore..Store+emit)
    * [.getBasePath(collectionName)](#createStore..Store+getBasePath) ⇒ <code>String</code>
    * [.isValidId(id)](#createStore..Store+isValidId) ⇒ <code>Boolean</code>

<a name="createStore..Store+createRecord"></a>

#### store.createRecord(collection, [data]) ⇒ <code>Object</code>
tag a javascript object with metadata that allows it to be tracked by the vdata store.
`__tmp_id` and the `idAttribute` configured for the given collection are both used to
identify the object. editing either of these will cause vdata to see the resulting
object as something new that needs to be tracked separately from the original object.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type | Default |
| --- | --- | --- |
| collection | <code>String</code> |  | 
| [data] | <code>Object</code> | <code>{}</code> | 

<a name="createStore..Store+get"></a>

#### store.get(collectionName, pkOrId) ⇒ <code>Object</code>
get a particular object from the store using the primary key provided by
your api server, or the temporary local id that vdata uses internally to
track records.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| pkOrId | <code>String</code> | 

<a name="createStore..Store+getList"></a>

#### store.getList(collectionName, [keys]) ⇒ <code>Array.&lt;object&gt;</code>
get all of the records in `collectionName`. if you include a `keys`
parameter, this method returns all of the records that match the ids
listed.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| [keys] | <code>Array.&lt;string&gt;</code> | 

<a name="createStore..Store+remove"></a>

#### store.remove(collectionName, pkOrId, options) ⇒ <code>Object</code>
remove a record from the store, identified by public key or temporary id.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  
**Emits**: <code>Store#event:remove</code>  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| pkOrId | <code>String</code> | 
| options | <code>Object</code> | 
| options.quiet | <code>Boolean</code> | 

<a name="createStore..Store+removeList"></a>

#### store.removeList(collectionName, keys) ⇒ <code>Array.&lt;object&gt;</code>
remove all of the records in `collectionName` or all of the records that match the ids passed into `keys`.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  
**Emits**: <code>Store#event:remove-list</code>  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| keys | <code>Array.&lt;string&gt;</code> | 

<a name="createStore..Store+clear"></a>

#### store.clear()
remove all records from all collections

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  
**Emits**: <code>Store#event:remove-list</code>  
<a name="createStore..Store+rebase"></a>

#### store.rebase(collection, data) ⇒ <code>Object</code>
vdata automatically tracks all of the versions that are created for every
record that it tracks. this version tracking is how `Store#rebase` is able
to implement a simple Observed-Remove Set (ORSet) that enables vdata to
deterministically merge all of the changes to a particular record.

given `data` with a particular `__sym_id` and the current version of the
same record at `data[idAttribute]`, return a merged record containing all
changes, applied to the base record at `__sym_id` in the following order,
diff'd against `base`:

1. current
2. data

at CityGro we use the ORSet implementation in vdata to power the real-time
features of our customer portal application. in most cases, the core
diffing algorithm is able to generate merged outputs with intuitive
results. however, it is important to note the rules that we use to
resolve certain edge cases.

1. Last-write (from the perspective of the writer) wins. in our
   experience, this produces the least surprising results for our users.
2. Array mutations are all-or-nothing. we currently don't have an
   acceptable solution to merging arrays with arbitrary mutations.
   following rule #1, we opt to *replace* any previous values with the
   latest version of the array. if you have thoughts on this, please open
   a ticket on [GitLab](https://gitlab.com/citygro/vdata/issues).

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| collection | <code>String</code> | 
| data | <code>Object</code> | 

<a name="createStore..Store+add"></a>

#### store.add(collection, data, options) ⇒ <code>Object</code>
add a record to the store. you *do not* need to pass your data to
`Store#createRecord` before adding it.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  
**Emits**: <code>Store#event:add</code>  
**See**: {Store.rebase}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| collection | <code>String</code> |  |  |
| data | <code>Object</code> |  |  |
| options | <code>Object</code> |  |  |
| [options.quiet] | <code>Boolean</code> | <code>false</code> | silence store events for this invocation |

<a name="createStore..Store+addList"></a>

#### store.addList(collectionName, data) ⇒ <code>Array.&lt;Object&gt;</code>
add all of the records in `data` to `colectionName` in a single operation.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  
**Emits**: <code>Store#event:add-list</code>  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| data | <code>Array.&lt;Object&gt;</code> | 

<a name="createStore..Store+hasChanges"></a>

#### store.hasChanges(collectionName, data) ⇒ <code>Boolean</code>
check if `data` differs from the current version of the corresponding
record in the store.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| data | <code>Object</code> | 

<a name="createStore..Store+destroy"></a>

#### store.destroy(collectionName, data, options) ⇒ <code>Promise.&lt;Object&gt;</code>
send a `DELETE` request to the endpoint configured for `collectionName`
and remove the corresponding record from the store.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  
**Emits**: <code>Store#event:remove</code>  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| data | <code>Object</code> | 
| options | <code>Object</code> | 

<a name="createStore..Store+save"></a>

#### store.save(collection, data, options) ⇒ <code>Promise.&lt;Object&gt;</code>
persist `data` using the endpoint configured for `collectonName`. if
`data` is *only* identified by a local temporary id send a `POST` request to
`/:basePath/:collectionName`. if `data` has a primary key send a `PUT`
request to `/:basePath/:collectionName/:primaryKey`

when updating an existing record, this methods calls Store#rebase.
this gives vdata some important super-powers that you can use to build
real-time applications. check the method's docs for details.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  
**Emits**: <code>Store#event:add</code>  

| Param | Type |
| --- | --- |
| collection | <code>String</code> | 
| data | <code>Object</code> | 
| options | <code>Object</code> | 

<a name="createStore..Store+find"></a>

#### store.find(collection, [query], [options]) ⇒ <code>Promise.&lt;Object&gt;</code>
fetch a particular record from `/:basePath/:collectionName/:primaryKey`.
if `force === false` immediately return the cached record if present.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type | Default |
| --- | --- | --- |
| collection | <code>String</code> |  | 
| [query] | <code>Object</code> |  | 
| [options] | <code>Object</code> |  | 
| [options.force] | <code>Boolean</code> | <code>false</code> | 

<a name="createStore..Store+findAll"></a>

#### store.findAll(collection, [query], [options]) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
fetch all of the records from the api that match the parameters specified
in `query`. these are sent along with the request as query parameters.
if `force === false` immediately return a cached response if one exists.

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| collection | <code>String</code> | 
| [query] | <code>Object</code> | 
| [options] | <code>Object</code> | 

<a name="createStore..Store+on"></a>

#### store.on(event, handler)
bind an event listener to the store

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| handler | <code>function</code> | 

<a name="createStore..Store+off"></a>

#### store.off(event, handler)
unbind an event listener to the store

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| handler | <code>function</code> | 

<a name="createStore..Store+emit"></a>

#### store.emit(event, payload)
manually emit a message using the store's event bus

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| payload | <code>\*</code> | 

<a name="createStore..Store+getBasePath"></a>

#### store.getBasePath(collectionName) ⇒ <code>String</code>
get the base path for `collectionName`

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 

<a name="createStore..Store+isValidId"></a>

#### store.isValidId(id) ⇒ <code>Boolean</code>
check if the given value is a valid id

**Kind**: instance method of [<code>Store</code>](#createStore..Store)  

| Param | Type |
| --- | --- |
| id | <code>\*</code> | 

<a name="nullify"></a>

## nullify(object) ⇒ <code>Object</code>
replace all values in an object with `null`. used to generate the ORSet for
diffing operations.

**Kind**: global function  

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

<a name="difference"></a>

## difference(base, object) ⇒ <code>object</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| base | <code>object</code> | 
| object | <code>object</code> | 

<a name="flattenMixinTree"></a>

## flattenMixinTree(mixins)
**Kind**: global function  

| Param | Type |
| --- | --- |
| mixins | <code>Array.&lt;Object&gt;</code> | 

<a name="toQueryString"></a>

## toQueryString(o, prefix)
**Kind**: global function  

| Param | Type |
| --- | --- |
| o | <code>object</code> | 
| prefix | <code>string</code> | 

