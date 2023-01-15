import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './reducers/toy.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { reviewReducer } from './reducers/review.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => { }

export const store = createStore(rootReducer, middleware)
