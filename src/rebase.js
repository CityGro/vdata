import diff from './diff'
import jsonClone from './jsonClone'
import merge from 'lodash/merge'
import tail from 'lodash/tail'

export default function () {
  const base = arguments[0]
  const diffs = tail(arguments).map((checkpoint) => diff(base, checkpoint))
  return merge(jsonClone(base), ...diffs)
}
