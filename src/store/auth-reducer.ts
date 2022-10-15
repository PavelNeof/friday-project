import {authAPI} from "../dal/api";
import {Dispatch} from "redux";

const initState = {
    isLoggedIn: false,
    disableButton:false,
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
        case "profile/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {...state, disableButton: action.disableButton};
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
    dispatch(disableButtonAC(true))
    authAPI.logout()
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedInAC(false))
                // dispatch(setAppStatusAC('succeeded'))
            }
        })
        .finally(()=>{
            dispatch(disableButtonAC(false))
        })
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'profile/SET-IS-LOGGED-IN', value} as const)

export const setName = (name: string) =>
    ({type: "profile/SET_NAME", name} as const)

export const setDataAC = (data: SetDataType) =>
    ({type: 'profile/SET-DATA', data} as const)

export const disableButtonAC = (disableButton: boolean) =>
    ({type: 'profile/TOGGLE_IS_FOLLOWING_PROGRESS', disableButton} as const)

export type AuthActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setName>
    | ReturnType<typeof setDataAC>
    | ReturnType<typeof disableButtonAC>


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