import { CREATE_TODO, DELETE_TODO, EDIT_TODO } from './todoTypes';

const initialState = {
    todoList: []
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TODO: return {
            ...state,
            todoList: [...state.todoList, action.payload]
        }

        case EDIT_TODO: return {
            ...state,
            todoList: state.todoList.map(todo => {
                if (todo.key === action.payload.key) {
                    return { ...todo, action: action.payload.todo.action, dateAdded: action.payload.todo.dateAdded }
                }
                return todo;
            })
        }

        case DELETE_TODO: return {
            ...state,
            todoList: state.todoList.filter(todo => todo.key !== action.payload)
        }

        default: return state

    }
}

export default todoReducer;