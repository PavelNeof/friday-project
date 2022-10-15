import {authAPI} from "./api";
import {Dispatch} from "redux";

const initState = {
    isLoggedIn: false,
    name: '',
    data: {} as SetDataType
}
type InitialStateType = typeof initState


export const authReducer = (state = initState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case "profile/SET_NAME":
            return {...state, name: action.name};
        case "profile/SET-DATA":
            return {...state, data: action.data};
        default:
            return state
    }
}


export const updateName = (name: string) => (dispatch: Dispatch) => {
    authAPI.updateName(name).then((res) => {
        if (!res.data.error) {
            dispatch(setName(res.data.updatedUser.name))
        }
        //dispatch(setAppStatusAC('succeeded'))
    })
}


export const logoutTC = () => (dispatch: Dispatch) => {
    //dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedInAC(false))
                // dispatch(setAppStatusAC('succeeded'))
            }
        })
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'profile/SET-IS-LOGGED-IN', value} as const)

export const setName = (name: string) =>
    ({type: "profile/SET_NAME", name} as const)

export const setDataAC = (data: SetDataType) =>
    ({type: 'profile/SET-DATA', data} as const)


export type AuthActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setName>
    | ReturnType<typeof setDataAC>


export const fetchAuthTC = () => {
    return (dispatch: Dispatch) => {
        // dispatch(setAppStatusAC('loading'))
        authAPI.me()
            .then((res) => {
                if (!res.data.error) {
                    dispatch(setDataAC(res.data.updatedUser))
                }
                //     dispatch(setAppStatusAC('succeeded'))
            })
    }
}


export type SetDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}