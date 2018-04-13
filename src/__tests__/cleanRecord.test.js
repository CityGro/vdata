/* global jest, test, describe, expect, beforeEach, beforeAll, afterAll */

import fetchMock from 'fetch-mock'
import cleanRecord from '../cleanRecord'

describe('cleanRecord', () => {
  let Vue
  let vdata
  beforeAll(() => {
    fetchMock.post('/users', (url, options) => {
      const record = JSON.parse(options.body)
      record.id = 3
      return record
    })
    fetchMock.put('/users/3', (url, options) => {
      return JSON.parse(options.body)
    })
  })
  afterAll(() => {
    fetchMock.restore()
  })

  beforeEach(() => {
    jest.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
    vdata = require('../vdata').default
    Vue = require('vue/dist/vue.js')
    Vue.config.productionTip = false
    Vue.use(vdata, {
      models: {
        users: {
          idAttribute: '_id'
        },
        comments: {
          idAttribute: '_id'
        },
        categories: {
          idAttribute: '_id'
        }
      }
    })
  })

  test('removes ids', () => {
    expect(cleanRecord({
      store: Vue.$store,
      collectionName: 'users',
      record: {
        _id: 123,
        name: 'foo'
      }
    })).toMatchObject({
      name: 'foo'
    })
  })

  test('works with nested objects', () => {
    expect(cleanRecord({
      store: Vue.$store,
      collectionName: 'comments',
      record: {
        _id: 123,
        name: 'foo',
        message: {
          _id: 456,
          content: {
            text: 'nani?'
          }
        }
      }
    })).toMatchObject({
      name: 'foo',
      message: {
        content: {
          text: 'nani?'
        }
      }
    })
  })

  test('handles arrays correctly', () => {
    expect(cleanRecord({
      store: Vue.$store,
      collectionName: 'categories',
      record: {
        _id: 123,
        tags: ['foo', 'bar']
      }
    })).toMatchObject({
      tags: ['foo', 'bar']
    })
  })
})
