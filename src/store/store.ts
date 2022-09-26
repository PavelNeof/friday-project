
import thunk from 'redux-thunk'
import {applyMiddleware, combineReducers, createStore} from "redux";


const reducers = combineReducers({


})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
