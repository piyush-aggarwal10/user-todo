import { CREATE_TODO, DELETE_TODO, EDIT_TODO } from './todoTypes';

//Action creator for create new todo
export const createTodo = (todo) => {
    return {
        type: CREATE_TODO,
        payload: todo
    }
}

//Action creator to edit existing todo
export const editTodo = (key, todo) => {
    return {
        type: EDIT_TODO,
        payload: { key, todo }
    }
}

//Action creator to delete existing todo
export const deleteTodo = (key) => {
    return {
        type: DELETE_TODO,
        payload: key
    }
}



