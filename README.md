@citygro/vdata -- reactive query model
======================================

[![build status](https://gitlab.com/citygro/vdata/badges/latest/build.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![coverage report](https://gitlab.com/citygro/vdata/badges/latest/coverage.svg)](https://gitlab.com/citygro/@citygro/vdata/commits/latest)
[![npm downloads](https://img.shields.io/npm/dt/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)
[![npm version](https://img.shields.io/npm/v/@citygro/vdata.svg)](https://npmjs.org/package/@citygro/vdata)
[![license](https://img.shields.io/npm/l/@citygro/vdata.svg)](https://gitlab.com/citygro/vdata/blob/latest/LICENSE)

```sh
yarn add js-data-$adapter @citygro/vdata
```

## Modules

<dl>
<dt><a href="#module_createMixinForItemById">createMixinForItemById</a></dt>
<dd></dd>
<dt><a href="#module_to">to</a></dt>
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
<dt><a href="#createDataFlowMixin">createDataFlowMixin</a></dt>
<dd><p>create a dataflow mixin for a given value prop.</p>
<p>a &#39;value&#39; dataflow implements the <code>v-model</code> interface.</p>
<p>custom dataflows follow a pattern: methods are prefixed with the <code>valueProp</code>
name and <code>update:${valueProp}</code> is emitted.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#convert">convert(data)</a></dt>
<dd></dd>
<dt><a href="#isValidId">isValidId(id)</a></dt>
<dd></dd>
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
<dt><a href="#flattenMixinTree">flattenMixinTree(mixins)</a></dt>
<dd></dd>
<dt><a href="#exp_module_to--to">to(promise)</a> ⇒ <code>Promise</code> ⏏</dt>
<dd></dd>
<dt><a href="#toQueryString">toQueryString(o, prefix)</a></dt>
<dd></dd>
</dl>

<a name="module_createMixinForItemById"></a>

## createMixinForItemById
<a name="module_to"></a>

## to
<a name="exp_module_to--to"></a>

### to(promise) ⇒ <code>Promise</code> ⏏
**Kind**: global method of [<code>to</code>](#module_to)  

| Param | Type |
| --- | --- |
| promise | <code>Promise</code> | 

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

## createDataFlowMixin
create a dataflow mixin for a given value prop.

a 'value' dataflow implements the `v-model` interface.

custom dataflows follow a pattern: methods are prefixed with the `valueProp`
name and `update:${valueProp}` is emitted.

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| valueProp | <code>string</code> | bind dataflow to this prop |

<a name="convert"></a>

## convert(data)
**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>object</code> | 

<a name="isValidId"></a>

## isValidId(id)
**Kind**: global function  

| Param | Type |
| --- | --- |
| id | <code>\*</code> | 

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

