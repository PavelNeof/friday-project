import { AppStateType, AppThunkType } from "./store";
import { authAPI } from "../dal/api";
import { setDataAC, setIsLoggedInAC } from "./auth-reducer";

const initState = {
    isInitialized: false,
};
type InitialStateType = typeof initState;

export const appInitReducer = (
    state = initState,
    action: AppInitActionsType
): InitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED":
            return { ...state, isInitialized: action.isInitialized };
        default:
            return state;
    }
};

export const setIsInitializedAC = (isInitialized: boolean) =>
    ({ type: "APP/INITIALIZED", isInitialized } as const);

export const initializeAppTC =
    (): AppThunkType => (dispatch, getState: () => AppStateType) => {
        authAPI
            .me()
            .then((res) => {
                if (!getState().auth.data.email) {
                    dispatch(setDataAC(res.data));
                }
                dispatch(setIsLoggedInAC(true));
                dispatch(setIsInitializedAC(true));
            })
            .catch((e) => {})
            .finally(() => {
                dispatch(setIsInitializedAC(true));
            });
    };

export type AppInitActionsType = ReturnType<typeof setIsInitializedAC>;
