import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from "redux";
import { AuthActionsType, authReducer } from "./auth-reducer";
import { appReducer, AppReducerActionsType } from "./app-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = ThunkDispatch<
    AppStateType,
    unknown,
    AppActionsType
>;
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AppActionsType
>;

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export type AppActionsType = AuthActionsType | AppReducerActionsType;

export default store;

// @ts-ignore
window.store = store; // for dev
