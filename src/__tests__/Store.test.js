/* global jest, describe, expect, test, beforeEach, beforeAll, afterAll */

import fetchMock from 'fetch-mock'
import Store from '../Store'

describe('Store', () => {
  let store
  beforeAll(() => {
    fetchMock.get('/api/myCollection?name=jeff', [
      {
        id: 1,
        name: 'jeff'
      }
    ])
    fetchMock.get('/api/myCollection/9', {id: 9, name: 'cirno'})
    fetchMock.post('/api/myCollection', (url, options) => {
      return {
        ...JSON.parse(options.body),
        id: 13
      }
    })
    fetchMock.put('/api/myCollection/11', (url, options) => {
      return JSON.parse(options.body)
    })
    fetchMock.delete('/api/myCollection/9', {success: true})
  })
  afterAll(() => {
    fetchMock.restore()
  })
  beforeEach(() => {
    store = Store.create({
      basePath: '/api',
      models: {
        myCollection: {
          idAttribute: 'id'
        }
      }
    })
  })

  describe('createRecord', () => {
    test('ADD __tmp_id, but do not add it to the store', () => {
      const record = store.createRecord('myCollection', {
        key: 'value'
      })
      expect(record.__tmp_id).toBeDefined()
      expect(record.__sym_id).not.toBeDefined()
    })
  })

  describe('add', () => {
    test('autogen __sym_id and __tmp_ids', () => {
      const record = store.add('myCollection', {
        name: 'jeff'
      })
      expect(record.__sym_id).toEqual('0-1')
      expect(record.__tmp_id).toBeDefined()
    })

    test('__sym_id increments', () => {
      const recordA = store.add('myCollection', {
        name: 'jeff'
      })
      const recordB = store.add('myCollection', {
        ...recordA,
        name: 'notJeff'
      })
      expect(recordA.__sym_id).toEqual('0-1')
      expect(recordB.__sym_id).toEqual('0-2')
    })
  })

  describe('get', () => {
    test('always the most recent version', () => {
      const recordA = store.add('myCollection', {
        id: 1,
        name: 'jeff'
      })
      store.add('myCollection', {
        ...recordA,
        name: 'notJeff'
      })
      const record = store.get('myCollection', recordA.id)
      expect(record.name).toBe('notJeff')
    })

    test('supports __tmp_id mapping', () => {
      const recordA = store.add('myCollection', {
        name: 'jeff'
      })
      const recordB = store.get('myCollection', recordA.__tmp_id)
      expect(recordB).toEqual(recordA)
    })
  })

  describe('getAll', () => {
    const names = ['jeff', 'cirno', 'fampai']
    test('get every record in a collection', () => {
      names.forEach((name) => {
        store.add('myCollection', {name})
      })
      const records = store.getAll('myCollection')
      expect(records).toBeDefined()
      expect(records).toHaveLength(3)
      expect(records[0].name).toBe('jeff')
    })

    test('get every record in a collection limited to a keylist', () => {
      names.forEach((name, id) => {
        id += 1
        store.add('myCollection', {id, name})
      })
      const records = store.getAll('myCollection', [1, 3])
      expect(records).toBeDefined()
      expect(records).toHaveLength(2)
      expect(records[0].name).toBe('jeff')
    })
  })

  describe('remove', () => {
    test('purge all references to a record by id', () => {
      const record = store.add('myCollection', {
        id: 1,
        name: 'jeff'
      })
      const id = record.id
      const tmpId = record.__tmp_id
      const data = store.remove('myCollection', id)
      expect(store.get('myCollection', id)).toBe(null)
      expect(store.get('myCollection', tmpId)).toBe(null)
      expect(data.__tmp_id).not.toBeDefined()
      expect(data.__sym_id).not.toBeDefined()
    })
  })

  describe('save', async () => {
    test('maps to POST /api/:collectionName for new records', async () => {
      const record = await store.save('myCollection', {
        name: 'tembo'
      })
      expect(record.__sym_id).toBeDefined()
      expect(record.__tmp_id).toBeDefined()
      expect(record.id).toBeDefined()
      expect(record.name).toBe('tembo')
    })

    test('maps to PUT /api/:collectionName/:id for existing records', async () => {
      const data = {
        id: 11,
        name: 'nani?'
      }
      store.add('myCollection', data)
      const record = await store.save('myCollection', data)
      expect(record.__sym_id).toBeDefined()
      expect(record.__tmp_id).toBeDefined()
      expect(record.id).toBeDefined()
      expect(record.name).toBe('nani?')
    })
  })

  describe('find', async () => {
    test('return cached records immediately', async () => {
      const recordA = store.add('myCollection', {
        id: 1,
        name: 'jeff'
      })
      const recordB = await store.find('myCollection', 1)
      expect(recordB.name).toBe('jeff')
      expect(recordB.__sym_id).toBe('0-1')
      expect(recordB.__tmp_id).toBe(recordA.__tmp_id)
    })

    test('maps to GET /api/:collectionName/:id', async () => {
      const record = await store.find('myCollection', 9)
      expect(record.name).toBe('cirno')
    })

    test('force = true bypasses the store', async () => {
      store.add('myCollection', {
        id: 9,
        name: 'jeff'
      })
      const record = await store.find('myCollection', 9, {force: true})
      expect(record.name).toBe('cirno')
    })
  })

  describe('findAll', async () => {
    test('maps to GET /api/:collectionName?name=jeff', async () => {
      const result = await store.findAll('myCollection', {
        name: 'jeff'
      })
      expect(result).toHaveLength(1)
    })
  })

  describe('destroy', async () => {
    test('maps to DELETE /api/:collectionName/:id', async () => {
      const record = store.add('myCollection', {
        id: 9,
        name: 'jeff'
      })
      const data = await store.destroy('myCollection', record)
      expect(data.name).toBe('jeff')
      expect(store.get('myCollection', 9)).toBe(null)
    })
  })

  describe('rebase', () => {
    test('support capture via __sym_id', () => {
      const record = store.add('myCollection', {
        id: 1,
        name: 'jeff',
        key: 'value'
      })
      store.add('myCollection', {
        ...record,
        key: 'foo'
      })
      record.name = 'nani'
      expect(store.rebase('myCollection', record)).toMatchObject({
        id: 1,
        name: 'nani',
        key: 'foo'
      })
    })
  })

  describe('event binding on/off/emit', () => {
    test('listen, emit', () => {
      const handler = jest.fn()
      store.on('myCustomEvent', handler)
      store.emit('myCustomEvent')
      store.off('myCustomEvent', handler)
      expect(handler).toHaveBeenCalled()
    })
  })
})
