import { CREATE_USER, /*LOAD_USER,*/ DELETE_USER, EDIT_USER } from './userTypes';

const initialState = {
    userList: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER: return {
            ...state,
            userList: [...state.userList, action.payload]
        }

        case EDIT_USER: return {
            ...state,
            userList: state.userList.map(user => {
                if (user.key === action.payload.key) {
                    return { ...user, name: action.payload.user.name, email: action.payload.user.email }
                }
                return user;
            })
        }

        case DELETE_USER: return {
            ...state,
            userList: state.userList.filter(user => user.key !== action.payload)
        }

        default: return state

    }
}

export default userReducer;