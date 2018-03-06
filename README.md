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
<dt><a href="#flattenMixinTree">flattenMixinTree(mixins)</a></dt>
<dd></dd>
</dl>

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

<a name="flattenMixinTree"></a>

## flattenMixinTree(mixins)
**Kind**: global function  

| Param | Type |
| --- | --- |
| mixins | <code>Array.&lt;Object&gt;</code> | 

