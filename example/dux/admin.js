export const CHANGE_NAME = 'example/admin/CHANGE_NAME'

export const changeName = (name) => {
  return {
    type: CHANGE_NAME,
    name
  }
}

export default function reducer (admin = { name: 'xj9' }, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return Object.assign({}, admin, { name: action.name })
    default:
      return admin
  }
}
