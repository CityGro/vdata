export const ADD_TODO = 'example/todo/ADD_TODO'
export const ADDING_TODO = 'example/todo/ADDING_TODO'
export const TOGGLE_TODO = 'example/todo/TOGGLE_TODO'

/**
 */
export function addingTodo () {
  return {
    type: ADDING_TODO
  }
}

/**
 */
export function toggleTodo (index) {
  return {
    type: TOGGLE_TODO,
    index
  }
}

/**
 */
export function addTodo (text) {
  return (dispatch, getState) => {
    dispatch(addingTodo())
    setTimeout(() => {
      dispatch({
        type: ADD_TODO,
        text
      })
    }, 0)
  }
}

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

/**
 */
export default function reducer (state = {
  isPosting: false,
  items: defaultTodos
},
  action
) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        isPosting: false,
        items: state.items.concat([{ text: action.text, done: false }])
      })
    case ADDING_TODO:
      return Object.assign({}, state, {
        isPosting: true
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        items: state.items.map((todo, i) => {
          if (i === action.index) {
            return {
              text: todo.text,
              done: !todo.done
            }
          }
          return todo
        })
      })
    default:
      return state
  }
}
