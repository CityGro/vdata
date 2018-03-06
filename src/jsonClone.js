import flow from 'lodash/fp/flow'

export default flow(JSON.stringify, JSON.parse)
