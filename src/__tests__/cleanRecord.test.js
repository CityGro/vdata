/* global test, describe, expect, beforeEach */

import Vue from 'vue'
import cleanRecord from './cleanRecord'
import createApp from '@/createApp'

describe('utils/cleanRecord', () => {
  let App
  beforeEach(() => {
    App = createApp(Vue, true)
  })

  test('removes ids', () => {
    expect(cleanRecord({
      store: App.$store,
      collectionName: 'contacts',
      record: {
        _id: 123,
        name: 'foo'
      }
    })).toEqual({
      name: 'foo'
    })
  })

  test('works with nested objects', () => {
    expect(cleanRecord({
      store: App.$store,
      collectionName: 'campaigns',
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
    })).toEqual({
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
      store: App.$store,
      collectionName: 'smartlinks',
      record: {
        _id: 123,
        tags: ['foo', 'bar']
      }
    })).toEqual({
      tags: ['foo', 'bar']
    })
  })
})
