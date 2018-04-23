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
<dt><a href="#module_Store">Store</a></dt>
<dd></dd>
<dt><a href="#module_createMixinForItemById">createMixinForItemById</a></dt>
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
<dt><a href="#Store">Store</a></dt>
<dd><p>vdata store constructor</p>
</dd>
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

<a name="module_Store"></a>

## Store
<a name="module_createMixinForItemById"></a>

## createMixinForItemById
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

<a name="Store"></a>

## Store
vdata store constructor

**Kind**: global constant  

* [Store](#Store)
    * [.create(options)](#Store.create) ⇒ [<code>Store</code>](#Store)
        * [~Store](#Store.create..Store)
            * [.createRecord(collection, [data])](#Store.create..Store+createRecord) ⇒ <code>Object</code>
            * [.get(collectionName, pkOrId)](#Store.create..Store+get) ⇒ <code>Object</code>
            * [.getList(collectionName, [keys])](#Store.create..Store+getList) ⇒ <code>Array.&lt;object&gt;</code>
            * [.remove(collectionName, pkOrId, options)](#Store.create..Store+remove) ⇒ <code>Object</code>
            * [.removeList(collectionName, keys)](#Store.create..Store+removeList) ⇒ <code>Array.&lt;object&gt;</code>
            * [.clear()](#Store.create..Store+clear)
            * [.rebase(collection, data)](#Store.create..Store+rebase) ⇒ <code>Object</code>
            * [.add(collection, data, options)](#Store.create..Store+add) ⇒ <code>Object</code>
            * [.addList(collectionName, data)](#Store.create..Store+addList) ⇒ <code>Array.&lt;Object&gt;</code>
            * [.hasChanges(collectionName, data)](#Store.create..Store+hasChanges) ⇒ <code>Boolean</code>
            * [.destroy(collectionName, data, options)](#Store.create..Store+destroy) ⇒ <code>Promise.&lt;Object&gt;</code>
            * [.save(collection, data, options)](#Store.create..Store+save) ⇒ <code>Promise.&lt;Object&gt;</code>
            * [.find(collection, [query], [options])](#Store.create..Store+find) ⇒ <code>Promise.&lt;Object&gt;</code>
            * [.findAll(collection, [query], [options])](#Store.create..Store+findAll) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
            * [.on(event, handler)](#Store.create..Store+on)
            * [.off(event, handler)](#Store.create..Store+off)
            * [.emit(event, payload)](#Store.create..Store+emit)
            * [.getBasePath(collectionName)](#Store.create..Store+getBasePath) ⇒ <code>String</code>
            * [.isValidId(id)](#Store.create..Store+isValidId) ⇒ <code>Boolean</code>

<a name="Store.create"></a>

### Store.create(options) ⇒ [<code>Store</code>](#Store)
**Kind**: static method of [<code>Store</code>](#Store)  
**Returns**: [<code>Store</code>](#Store) - a vdata store instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.models | <code>Object</code> |  |  |
| [options.basePath] | <code>String</code> | <code>&#x27;&#x27;</code> | default prefix for http requests |
| [options.adapter] | <code>function</code> |  | a custom fetch |
| [options.deserialize] | <code>function</code> |  | request post-processing |


* [.create(options)](#Store.create) ⇒ [<code>Store</code>](#Store)
    * [~Store](#Store.create..Store)
        * [.createRecord(collection, [data])](#Store.create..Store+createRecord) ⇒ <code>Object</code>
        * [.get(collectionName, pkOrId)](#Store.create..Store+get) ⇒ <code>Object</code>
        * [.getList(collectionName, [keys])](#Store.create..Store+getList) ⇒ <code>Array.&lt;object&gt;</code>
        * [.remove(collectionName, pkOrId, options)](#Store.create..Store+remove) ⇒ <code>Object</code>
        * [.removeList(collectionName, keys)](#Store.create..Store+removeList) ⇒ <code>Array.&lt;object&gt;</code>
        * [.clear()](#Store.create..Store+clear)
        * [.rebase(collection, data)](#Store.create..Store+rebase) ⇒ <code>Object</code>
        * [.add(collection, data, options)](#Store.create..Store+add) ⇒ <code>Object</code>
        * [.addList(collectionName, data)](#Store.create..Store+addList) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.hasChanges(collectionName, data)](#Store.create..Store+hasChanges) ⇒ <code>Boolean</code>
        * [.destroy(collectionName, data, options)](#Store.create..Store+destroy) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.save(collection, data, options)](#Store.create..Store+save) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.find(collection, [query], [options])](#Store.create..Store+find) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.findAll(collection, [query], [options])](#Store.create..Store+findAll) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
        * [.on(event, handler)](#Store.create..Store+on)
        * [.off(event, handler)](#Store.create..Store+off)
        * [.emit(event, payload)](#Store.create..Store+emit)
        * [.getBasePath(collectionName)](#Store.create..Store+getBasePath) ⇒ <code>String</code>
        * [.isValidId(id)](#Store.create..Store+isValidId) ⇒ <code>Boolean</code>

<a name="Store.create..Store"></a>

#### create~Store
**Kind**: inner class of [<code>create</code>](#Store.create)  

* [~Store](#Store.create..Store)
    * [.createRecord(collection, [data])](#Store.create..Store+createRecord) ⇒ <code>Object</code>
    * [.get(collectionName, pkOrId)](#Store.create..Store+get) ⇒ <code>Object</code>
    * [.getList(collectionName, [keys])](#Store.create..Store+getList) ⇒ <code>Array.&lt;object&gt;</code>
    * [.remove(collectionName, pkOrId, options)](#Store.create..Store+remove) ⇒ <code>Object</code>
    * [.removeList(collectionName, keys)](#Store.create..Store+removeList) ⇒ <code>Array.&lt;object&gt;</code>
    * [.clear()](#Store.create..Store+clear)
    * [.rebase(collection, data)](#Store.create..Store+rebase) ⇒ <code>Object</code>
    * [.add(collection, data, options)](#Store.create..Store+add) ⇒ <code>Object</code>
    * [.addList(collectionName, data)](#Store.create..Store+addList) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.hasChanges(collectionName, data)](#Store.create..Store+hasChanges) ⇒ <code>Boolean</code>
    * [.destroy(collectionName, data, options)](#Store.create..Store+destroy) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.save(collection, data, options)](#Store.create..Store+save) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.find(collection, [query], [options])](#Store.create..Store+find) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.findAll(collection, [query], [options])](#Store.create..Store+findAll) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.on(event, handler)](#Store.create..Store+on)
    * [.off(event, handler)](#Store.create..Store+off)
    * [.emit(event, payload)](#Store.create..Store+emit)
    * [.getBasePath(collectionName)](#Store.create..Store+getBasePath) ⇒ <code>String</code>
    * [.isValidId(id)](#Store.create..Store+isValidId) ⇒ <code>Boolean</code>

<a name="Store.create..Store+createRecord"></a>

##### store.createRecord(collection, [data]) ⇒ <code>Object</code>
tag a javascript object with metadata that allows it to be tracked by the vdata store.
`__tmp_id` and the `idAttribute` configured for the given collection are both used to
identify the object. editing either of these will cause vdata to see the resulting
object as something new that needs to be tracked separately from the original object.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type | Default |
| --- | --- | --- |
| collection | <code>String</code> |  | 
| [data] | <code>Object</code> | <code>{}</code> | 

<a name="Store.create..Store+get"></a>

##### store.get(collectionName, pkOrId) ⇒ <code>Object</code>
get a particular object from the store using the primary key provided by
your api server, or the temporary local id that vdata uses internally to
track records.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| pkOrId | <code>String</code> | 

<a name="Store.create..Store+getList"></a>

##### store.getList(collectionName, [keys]) ⇒ <code>Array.&lt;object&gt;</code>
get all of the records in `collectionName`. if you include a `keys`
parameter, this method returns all of the records that match the ids
listed.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| [keys] | <code>Array.&lt;string&gt;</code> | 

<a name="Store.create..Store+remove"></a>

##### store.remove(collectionName, pkOrId, options) ⇒ <code>Object</code>
remove a record from the store, identified by public key or temporary id.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  
**Emits**: <code>Store#event:remove</code>  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| pkOrId | <code>String</code> | 
| options | <code>Object</code> | 
| options.quiet | <code>Boolean</code> | 

<a name="Store.create..Store+removeList"></a>

##### store.removeList(collectionName, keys) ⇒ <code>Array.&lt;object&gt;</code>
remove all of the records in `collectionName` or all of the records that match the ids passed into `keys`.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  
**Emits**: <code>Store#event:remove-list</code>  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| keys | <code>Array.&lt;string&gt;</code> | 

<a name="Store.create..Store+clear"></a>

##### store.clear()
remove all records from all collections

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  
**Emits**: <code>Store#event:remove-list</code>  
<a name="Store.create..Store+rebase"></a>

##### store.rebase(collection, data) ⇒ <code>Object</code>
given `data` with a particular `__sym_id` and the current version of the
same record at `data[idAttribute]`, return a merged record containing all
changes, applied to the base record at `__sym_id` in the following order,
diff'd against `base`:

1. current
2. data

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| collection | <code>String</code> | 
| data | <code>Object</code> | 

<a name="Store.create..Store+add"></a>

##### store.add(collection, data, options) ⇒ <code>Object</code>
add a record to the store. you *do not* need to pass your data to
`Store.createRecord` before adding it.

vdata automatically tracks all of the versions that are created for every
record that it tracks. this version tracking is how `store.rebase` is able
to implement a simple `ORSet` that enables vdata to deterministically merge
all of the changes to a particular record.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  
**Emits**: <code>Store#event:add</code>  
**See**: {Store.rebase}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| collection | <code>String</code> |  |  |
| data | <code>Object</code> |  |  |
| options | <code>Object</code> |  |  |
| [options.quiet] | <code>Boolean</code> | <code>false</code> | silence store events for this invocation |

<a name="Store.create..Store+addList"></a>

##### store.addList(collectionName, data) ⇒ <code>Array.&lt;Object&gt;</code>
add all of the records in `data` to `colectionName` in a single operation.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  
**Emits**: <code>Store#event:add-list</code>  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| data | <code>Array.&lt;Object&gt;</code> | 

<a name="Store.create..Store+hasChanges"></a>

##### store.hasChanges(collectionName, data) ⇒ <code>Boolean</code>
check if `data` differs from the current version of the corresponding
record in the store.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| data | <code>Object</code> | 

<a name="Store.create..Store+destroy"></a>

##### store.destroy(collectionName, data, options) ⇒ <code>Promise.&lt;Object&gt;</code>
send a `DELETE` request to the endpoint configured for `collectionName`
and remove the corresponding record from the store.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  
**Emits**: <code>Store#event:remove</code>  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 
| data | <code>Object</code> | 
| options | <code>Object</code> | 

<a name="Store.create..Store+save"></a>

##### store.save(collection, data, options) ⇒ <code>Promise.&lt;Object&gt;</code>
persist `data` using the endpoint configured for `collectonName`. if
`data` is *only* identified by a local temporary id send a `POST` request to
`/:basePath/:collectionName`. if `data` has a primary key send a `PUT`
request to `/:basePath/:collectionName/:primaryKey`

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  
**Emits**: <code>Store#event:add</code>  

| Param | Type |
| --- | --- |
| collection | <code>String</code> | 
| data | <code>Object</code> | 
| options | <code>Object</code> | 

<a name="Store.create..Store+find"></a>

##### store.find(collection, [query], [options]) ⇒ <code>Promise.&lt;Object&gt;</code>
fetch a particular record from `/:basePath/:collectionName/:primaryKey`.
if `force === false` immediately return the cached record if present.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type | Default |
| --- | --- | --- |
| collection | <code>String</code> |  | 
| [query] | <code>Object</code> |  | 
| [options] | <code>Object</code> |  | 
| [options.force] | <code>Boolean</code> | <code>false</code> | 

<a name="Store.create..Store+findAll"></a>

##### store.findAll(collection, [query], [options]) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
fetch all of the records from the api that match the parameters specified
in `query`. these are sent along with the request as query parameters.
if `force === false` immediately return a cached response if one exists.

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| collection | <code>String</code> | 
| [query] | <code>Object</code> | 
| [options] | <code>Object</code> | 

<a name="Store.create..Store+on"></a>

##### store.on(event, handler)
bind an event listener to the store

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| handler | <code>function</code> | 

<a name="Store.create..Store+off"></a>

##### store.off(event, handler)
unbind an event listener to the store

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| handler | <code>function</code> | 

<a name="Store.create..Store+emit"></a>

##### store.emit(event, payload)
manually emit a message using the store's event bus

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| payload | <code>\*</code> | 

<a name="Store.create..Store+getBasePath"></a>

##### store.getBasePath(collectionName) ⇒ <code>String</code>
get the base path for `collectionName`

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| collectionName | <code>String</code> | 

<a name="Store.create..Store+isValidId"></a>

##### store.isValidId(id) ⇒ <code>Boolean</code>
check if the given value is a valid id

**Kind**: instance method of [<code>Store</code>](#Store.create..Store)  

| Param | Type |
| --- | --- |
| id | <code>\*</code> | 

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

