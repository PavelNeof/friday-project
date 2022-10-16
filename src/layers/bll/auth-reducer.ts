import {authAPI} from "../dal/api";
import {Dispatch} from "redux";
import {Params} from "react-router-dom";
import {AppDispatchType, AppThunkType} from "./store";

const initState = {
    isLoggedIn: false,
    disableButton: false,
    name: "",
    data: {} as SetDataType,
    registrationError: ''
};
type InitialStateType = typeof initState;

export const authReducer = (
    state = initState,
    action: AuthActionsType
): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value};
        case "AUTH/SET_NAME":
            return {...state, name: action.name};
        case "AUTH/SET-DATA":
            return {...state, data: action.data};
        case "AUTH/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {...state, disableButton: action.disableButton};
        case "AUTH/REGISTRATION_ERROR":
            return {...state, registrationError: action.error}
        default:
            return state;
    }
};

export const updateName = (name: string) => (dispatch: Dispatch) => {
    dispatch(disableButtonAC(true));
    authAPI
        .updateName(name)
        .then((res) => {
            if (!res.data.error) {
                dispatch(setName(res.data.updatedUser.name));
            }
            //dispatch(setAppStatusAC('succeeded'))
        })
        .finally(() => {
            dispatch(disableButtonAC(false));
        });
};

export const logoutTC = () => (dispatch: Dispatch) => {
    //dispatch(setAppStatusAC('loading'))
    dispatch(disableButtonAC(true));
    authAPI
        .logout()
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedInAC(false));
                // dispatch(setAppStatusAC('succeeded'))
            }
        })
        .finally(() => {
            dispatch(disableButtonAC(false));
        });
};

export const forgotPasswordTC = (newEmail: string) => (dispatch: Dispatch) => {
    authAPI.forgotPassword(newEmail).then((res) => {
        if (res.data.error) {
            alert(res.data.error);
        }
    });
};

export const setNewPasswordTC =
    (password: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
        authAPI.setNewPassword(password, resetPasswordToken).then((res) => {
            if (!res.data.error) {
                alert("успех");
            }
        });
    };

export const setRegistrationTC = (email: string, password: string): AppThunkType => (dispatch: AppDispatchType) => {
    return authAPI.register(email, password)
        .then(res => {
            console.log(res)
            dispatch(setIsLoggedInAC(true))
        })
        .catch((e) => {
            const error = e.response.data as RegisterErrorType
            dispatch(setRegistrationErrorAC(error.error))
        })
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: "AUTH/SET-IS-LOGGED-IN", value} as const);

export const setName = (name: string) =>
    ({type: "AUTH/SET_NAME", name} as const);

export const setDataAC = (data: SetDataType) =>
    ({type: "AUTH/SET-DATA", data} as const);

export const disableButtonAC = (disableButton: boolean) =>
    ({type: "AUTH/TOGGLE_IS_FOLLOWING_PROGRESS", disableButton} as const);

export const setRegistrationErrorAC = (error: string) =>
    ({type: "AUTH/REGISTRATION_ERROR", error} as const);

export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setName>
    | ReturnType<typeof setDataAC>
    | ReturnType<typeof disableButtonAC>
    | ReturnType<typeof setRegistrationErrorAC>;

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
};

export type SenMessageForgotPasswordType = {
    email: string;
    from: string;
    message: string;
};

export type RegisterResponseType = {
    addedUser: {}
}

export type RegisterErrorType = {
    email: string
    error: string
    in: string
}