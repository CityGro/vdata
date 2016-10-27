export const INCREMENT = 'example/counter/INCREMENT'

export const increment = () => {
  return { type: INCREMENT }
}

export default function reducer (state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    default:
      return state
  }
}
