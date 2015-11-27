export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, done: false }])
    case 'TOGGLE_TODO':
      return state.map((s, i) => {
        if (i === action.index) {
          return {
            text: s.text,
            done: s.done ? false : true
          }
        }
        return s
      })
    default:
      return state
  }
}
