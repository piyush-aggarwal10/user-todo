import { CREATE_TODO, /*LOAD_TODO,*/ DELETE_TODO, EDIT_TODO } from './todoTypes';

//Contains all action creators
export const createTodo = (todo) => {
    return {
        type: CREATE_TODO,
        payload: todo
    }
}

export const editTodo = (key, todo) => {
    return {
        type: EDIT_TODO,
        payload: { key, todo }
    }
}

export const deleteTodo = (key) => {
    return {
        type: DELETE_TODO,
        payload: key
    }
}



