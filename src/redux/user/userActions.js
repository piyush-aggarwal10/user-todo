import { CREATE_USER, /*LOAD_USER,*/ DELETE_USER, EDIT_USER } from './userTypes';

//Contains all action creators
export const createUser = (user) => {
    return {
        type: CREATE_USER,
        payload: user
    }
}

export const editUser = (key, user) => {
    return {
        type: EDIT_USER,
        payload: { key, user }
    }
}

export const deleteUser = (key) => {
    return {
        type: DELETE_USER,
        payload: key
    }
}



