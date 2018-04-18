/* global jest, describe, expect, test, beforeEach, beforeAll, afterAll */

import Store from '../Store'
import fetchMock from 'fetch-mock'
import range from 'lodash/range'

describe('Store', () => {
  let store
  beforeAll(() => {
    fetchMock.get('/api/myCollection?name=jeff', [
      {
        id: 1,
        name: 'jeff'
      }
    ])
    fetchMock.get('/api/myCollection?results=yes', [
      {
        id: 30,
        name: 'remiu'
      },
      {
        id: 40,
        name: 'satori'
      },
      {
        id: 50,
        name: 'tenshi'
      }
    ])
    fetchMock.get('/api/myCollection?has=lots', (url, options) => {
      return range(0, 1000).map((i) => ({
        id: i + 1,
        score: (i + 5) * 10
      }))
    })
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

    test('use the same __tmp_id for records with the same pk', () => {
      const object = {
        id: 9
      }
      const recordA = store.createRecord('myCollection', object)
      const recordB = store.createRecord('myCollection', object)
      expect(recordA.id).toBe(recordB.id)
      expect(recordA.__tmp_id).toBe(recordB.__tmp_id)
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

    test('adding and object with the same pk multiple times results in multiple versions on the same local id', () => {
      const dataAt0 = {
        id: 1,
        key: 'foo'
      }
      const dataAt1 = {
        id: 1,
        key: 'bar'
      }
      const recordAt0 = store.add('myCollection', dataAt0)
      expect(store.get('myCollection', 1)).toMatchObject(recordAt0)
      expect(recordAt0.__sym_id).toBe('0-1')
      const recordAt1 = store.add('myCollection', dataAt1)
      expect(store.get('myCollection', 1)).toMatchObject(recordAt1)
      expect(recordAt1.__sym_id).toBe('0-2')
      expect(recordAt0.__tmp_id).toBe(recordAt1.__tmp_id)
    })

    test('add many records quickly', () => {
      range(0, 100).forEach((i) => {
        store.add('myCollection', {
          id: i + 1,
          score: (i + 5) * 10
        })
      })
      expect(store.getAll('myCollection')).toHaveLength(100)
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
      names.forEach((name, i) => {
        store.add('myCollection', {id: i + 1, name})
      })
      const records = store.getAll('myCollection')
      expect(records).toBeDefined()
      expect(records).toHaveLength(3)
      names.forEach((name, i) => {
        expect(records[i]).toMatchObject({
          id: i + 1,
          name
        })
      })
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
      const localRecord = store.add('myCollection', {
        id: 11,
        name: 'nani?'
      })
      expect(localRecord.name).toBe('nani?')
      localRecord.name = 'jeff'
      localRecord.tags = {foo: true}
      expect(store.hasChanges('myCollection', localRecord)).toBe(true)
      const savedRecord = await store.save('myCollection', localRecord)
      expect(localRecord.__sym_id).toBe('0-1')
      expect(savedRecord).not.toBe(localRecord)
      expect(savedRecord.__sym_id).not.toBe(localRecord.__sym_id)
      expect(savedRecord.__sym_id).toBe('0-2')
      expect(savedRecord.__tmp_id).toBe(localRecord.__tmp_id)
      expect(savedRecord.id).toBe(localRecord.id)
      expect(savedRecord.name).toBe('jeff')
      expect(savedRecord.tags).toEqual({foo: true})
    })
  })

  describe('find', async () => {
    test('return null if pk/id is invalid', async () => {
      expect.assertions(1)
      const result = await store.find('myCollection', undefined)
      expect(result).toBe(null)
    })

    test('return cached records immediately', async () => {
      expect.assertions(3)
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
      expect.assertions(1)
      const record = await store.find('myCollection', 9)
      expect(record.name).toBe('cirno')
    })

    test('force = true bypasses the store', async () => {
      expect.assertions(1)
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

    test('handles multiple results', async () => {
      const result = await store.findAll('myCollection', {
        results: 'yes'
      })
      expect(result).toHaveLength(3)
      result.forEach((record) => {
        expect(record.id).toBeDefined()
        expect(record.name).toBeDefined()
      })
    })

    test('handles large result lists', async () => {
      expect.assertions(1)
      const result = await store.findAll('myCollection', {
        has: 'lots'
      })
      expect(result).toHaveLength(1000)
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

  describe('hasChanges', () => {
    test('support change detection', () => {
      const object = {
        id: 1,
        name: 'jeff',
        key: 'value'
      }
      const record = store.add('myCollection', object)
      expect(store.hasChanges('myCollection', record)).toBe(false)
      record.name = 'nani'
      expect(store.hasChanges('myCollection', record)).toBe(true)
      store.add('myCollection', record)
      expect(store.hasChanges('myCollection', record)).toBe(false)
      expect(store.hasChanges('myCollection', object)).toBe(true)
    })
  })

  describe('event binding on/off/emit', () => {
    test('listen, emit', () => {
      const handler = jest.fn()
      store.on('all', handler)
      const record = store.add('myCollection', {
        id: 1
      })
      store.emit('myCustomEvent')
      process.nextTick(() => {
        expect(handler).toHaveBeenCalled()
        expect(handler).toHaveBeenCalledWith({
          event: 'add',
          collectionName: 'myCollection',
          record
        })
        store.off('myCustomEvent', handler)
      })
    })
  })

  test('returns false if data is nil', () => {
    const result = store.hasChanges('myCollection', null)
    expect(result).toBe(false)
  })
})
