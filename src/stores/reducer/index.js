import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import User from './User';
import FormMateri from "./FormMateri"
import ListMateri from "./ListMateri"
import ListQuiz from "./ListQuiz"
import FormSoal from "./FormSoal"
import FormKuis from "./FormKuis"
import Editor from "./Editor"
import Pembelajaran from "./Pembelajaran"

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: [
    //     'FormMateri',
    // ],
    timeout: 2000
};

const reducers = combineReducers({
    User,
    FormMateri,
    ListMateri,
    FormKuis,
    FormSoal,
    Editor,
    ListQuiz,
    Pembelajaran
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;