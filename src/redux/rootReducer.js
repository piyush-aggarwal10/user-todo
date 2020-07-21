import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';   //localStorage


import userReducer from './user/userReducer';
import todoReducer from './todo/todoReducer';

const rootReducer = combineReducers({
    user: userReducer,
    todo: todoReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'todo']
}

export default persistReducer(persistConfig, rootReducer);
