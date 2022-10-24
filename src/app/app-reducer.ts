import { AppStateType, AppThunkType } from './store';
import { authAPI } from '../features/auth/auth-api';
import {
    setDataAC,
    setIsLoggedInAC,
    setRegistrationErrorAC,
} from '../features/auth/auth-reducer';
import axios, { AxiosError } from 'axios';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initState = {
    isInitialized: false,
    error: null as null | string,
    status: 'idle' as RequestStatusType,
};
type InitialStateType = typeof initState;

export const appInitReducer = (
    state = initState,
    action: AppInitActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED':
            return { ...state, isInitialized: action.isInitialized };
        case 'APP/SET-ERROR':
            return { ...state, error: action.error };
        case 'APP/SET-STATUS':
            return { ...state, status: action.status };
        case 'AUTH/REGISTRATION_ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

// actions
export const setAppStatusAC = (status: RequestStatusType) =>
    ({ type: 'APP/SET-STATUS', status } as const);

export const setIsInitializedAC = (isInitialized: boolean) =>
    ({ type: 'APP/INITIALIZED', isInitialized } as const);

export const setAppErrorAC = (error: null | string) =>
    ({ type: 'APP/SET-ERROR', error } as const);

// thunks
export const initializeAppTC =
    (): AppThunkType => async (dispatch, getState: () => AppStateType) => {
        try {
            const res = await authAPI.me();
            if (!getState().auth.data.email) {
                dispatch(setDataAC(res.data));
            }
            dispatch(setIsLoggedInAC(true));
        } catch (e) {
            const err = e as Error | AxiosError;
            if (!axios.isAxiosError(err)) {
                dispatch(setAppErrorAC(`Native error: ${err.message}`));
            }
        } finally {
            dispatch(setIsInitializedAC(true));
        }
    };

// types
export type AppInitActionsType =
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setRegistrationErrorAC>;
