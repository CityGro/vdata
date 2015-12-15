// this is a reducer used in test.js
export default function counter (counter = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return counter + 1
    default:
      return counter
  }
}
