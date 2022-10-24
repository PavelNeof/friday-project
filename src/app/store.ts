import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from 'redux';
import { AuthActionsType, authReducer } from '../features/auth/auth-reducer';
import { appInitReducer, AppInitActionsType } from './app-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { PacksActionsType, packsReducer } from '../features/packs/Packs-reducer';
import { CardsActionsType, cardsReducer } from '../features/cards/cards-reducer';

const reducers = combineReducers({
    auth: authReducer,
    app: appInitReducer,
    packs: packsReducer,
    cards: cardsReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppActionsType>;
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AppActionsType
>;

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export type AppActionsType =
    | AuthActionsType
    | AppInitActionsType
    | PacksActionsType
    | CardsActionsType;

export default store;

// @ts-ignore
window.store = store; // for dev
