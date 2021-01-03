import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from './reducer';

// const middlewares = [thunk, promise];

export const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
// }
export const persistor = persistStore(store);