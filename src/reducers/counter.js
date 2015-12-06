export default function counter (counter = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return counter + 1
    default:
      return counter
  }
}
