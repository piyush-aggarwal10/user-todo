import { CREATE_USER, DELETE_USER, EDIT_USER } from './userTypes';

//Action creator for create new user
export const createUser = (user) => {
    return {
        type: CREATE_USER,
        payload: user
    }
}

//Action creator to edit existing user
export const editUser = (key, user) => {
    return {
        type: EDIT_USER,
        payload: { key, user }
    }
}

//Action creator to delete existing user
export const deleteUser = (key) => {
    return {
        type: DELETE_USER,
        payload: key
    }
}



