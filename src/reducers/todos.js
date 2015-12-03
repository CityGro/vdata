const defaultTodos = [
  {
    text: 'Rule the web',
    done: true
  },
  {
    text: 'Conquer the world',
    done: false
  },
  {
    text: 'Meet a girl',
    done: false
  }
]

export default function todos(todos = defaultTodos, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return todos.concat([{ text: action.text, done: false }])
    case 'TOGGLE_TODO':
      return todos.map((todo, i) => {
        if (i === action.index) {
          return {
            text: todo.text,
            done: !todo.done
          }
        }
        return todo
      })
    default:
      return todos
  }
}
