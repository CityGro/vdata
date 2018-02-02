/**
 * takes variable arguments depending on the event type that is emmitted by js-data.
 *
 * @see {@link http://api.js-data.io/js-data/3.0.1/SimpleStore.html#toc85__anchor}
 */
export default () => {
  let data = {
    event: arguments[0],
    collectionName: arguments[1]
  }
  switch (data.event) {
    case 'add':
      // name, data, opts
      data.data = arguments[2]
      data.opts = arguments[3]
      break
    case 'change':
      data.record = arguments[2]
      data.changes = arguments[3]
      break
    case 'remove':
      data.record = arguments[2]
      break
    case 'afterCreate':
      // props, opts, result
      data.props = arguments[2]
      data.opts = arguments[3]
      data.result = arguments[4]
      break
    case 'beforeDestroy':
      // id, opts
      data.id = arguments[2]
      data.opts = arguments[3]
      break
    case 'beforeFind':
      // id, opts
      data.id = arguments[2]
      data.opts = arguments[3]
      break
    case 'afterDestroy':
      // id, opts, result
      data.id = arguments[2]
      data.opts = arguments[3]
      data.result = arguments[4]
      break
    case 'afterFind':
      // id, opts, result
      data.id = arguments[2]
      data.opts = arguments[3]
      data.result = arguments[4]
      break
    case 'afterDestroyAll':
      // data, query, opts, result
      data.data = arguments[2]
      data.query = arguments[3]
      data.opts = arguments[4]
      data.result = arguments[5]
      break
    case 'afterFindAll':
      // query, opts, result
      data.query = arguments[2]
      data.opts = arguments[3]
      data.result = arguments[4]
      break
    case 'afterUpdate':
      // id, props, opts, result
      data.id = arguments[2]
      data.props = arguments[3]
      data.opts = arguments[4]
      data.result = arguments[5]
      break
    case 'beforeUpdate':
      // id, props, opts
      data.id = arguments[2]
      data.props = arguments[3]
      data.opts = arguments[4]
      break
    case 'beforeUpdateAll':
      // props, query, opts
      data.props = arguments[2]
      data.query = arguments[3]
      data.opts = arguments[4]
      break
    case 'afterUpdateAll':
      // props, query, opts, result
      data.props = arguments[2]
      data.query = arguments[3]
      data.opts = arguments[4]
      data.result = arguments[5]
      break
    case 'afterUpdateMany':
      // records, opts, result
      data.records = arguments[2]
      data.opts = arguments[3]
      data.result = arguments[4]
      break
    case 'afterCreateMany':
      // records, opts, result
      data.records = arguments[2]
      data.opts = arguments[3]
      data.result = arguments[4]
      break
    case 'beforeCreateMany':
      // records, opts
      data.records = arguments[2]
      data.opts = arguments[3]
      break
    case 'beforeUpdateMany':
      // records, opts
      data.records = arguments[2]
      data.opts = arguments[3]
      break
    case 'beforeCreate':
      // query, opts
      data.query = arguments[2]
      data.opts = arguments[3]
      break
    case 'beforeDestroyAll':
      // query, opts
      data.query = arguments[2]
      data.opts = arguments[3]
      break
    case 'beforeFindAll':
      // query, opts
      data.query = arguments[2]
      data.opts = arguments[3]
      break
  }
  return data
}
