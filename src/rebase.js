import diff from './diff'
import jsonClone from './jsonClone'
import merge from 'lodash/merge'
import tail from 'lodash/tail'

export default function () {
  const base = arguments[0]
  return merge(
    jsonClone(base),
    ...tail(arguments).map((commit) => diff(base, commit))
  )
}
