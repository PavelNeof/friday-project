import { authAPI, LoginParamsType } from "../dal/api";
import { Dispatch } from "redux";
import { AppDispatchType, AppThunkType } from "./store";
import { AxiosError } from "axios";
import { setAppErrorAC, setAppStatusAC } from "./app-reducer";

const initState = {
    isLoggedIn: false,
    disableButton: false,
    name: "",
    data: {} as UserDataType,
    registrationError: "",
    registrationDone: false,
};
type InitialStateType = typeof initState;

export const authReducer = (
    state = initState,
    action: AuthActionsType
): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN":
            return { ...state, isLoggedIn: action.value };
        case "AUTH/SET_NAME":
            return { ...state, name: action.name };
        case "AUTH/SET-DATA":
            return { ...state, data: action.data };
        case "AUTH/TOGGLE_IS_FOLLOWING_PROGRESS":
            return { ...state, disableButton: action.disableButton };
        case "AUTH/REGISTRATION_ERROR":
            return { ...state, registrationError: action.error };
        case "AUTH/REGISTRATION_DONE":
            return { ...state, registrationDone: action.registrationDone };
        default:
            return state;
    }
};

export const updateName =
    (name: string): AppThunkType =>
    (dispatch) => {
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

export const loginTC =
    (data: LoginParamsType): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatusAC("loading"));
        authAPI
            .login(data)
            .then((res) => {
                dispatch(setIsLoggedInAC(true));
                dispatch(setDataAC(res.data));
            })
            .catch((e: AxiosError) => {
                const error = e.response
                    ? (e.response.data as { error: string }).error
                    : e.message;
                dispatch(setAppErrorAC(error));
            })
            .finally(() => dispatch(setAppStatusAC("succeeded")));
    };

export const logoutTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(disableButtonAC(true));
    authAPI
        .logout()
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedInAC(false));
                dispatch(setDataAC({} as UserDataType));
            }
        })
        .catch((e: AxiosError) => {
            const error = e.response
                ? (e.response.data as { error: string }).error
                : e.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(disableButtonAC(false));
            dispatch(setAppStatusAC("succeeded"));
        });
};

export const forgotPasswordTC = (newEmail: string) => (dispatch: Dispatch) => {
    dispatch(disableButtonAC(true));
    authAPI
        .forgotPassword(newEmail)
        .then((res) => {
            if (res.data.error) {
                alert(res.data.error);
            }
            if (!res.data.error) {
                alert("Check your email!");
            }
        })
        .catch((err) => {
            alert(err.message);
        })
        .finally(() => {
            dispatch(disableButtonAC(false));
        });
};

export const setNewPasswordTC =
    (password: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
        dispatch(disableButtonAC(true));
        authAPI
            .setNewPassword(password, resetPasswordToken)
            .then((res) => {
                if (!res.data.error) {
                    alert("Success!");
                }
            })
            .catch((err) => {
                alert(err.message);
            })
            .finally(() => {
                dispatch(disableButtonAC(false));
            });
    };

export const setRegistrationTC =
    (email: string, password: string): AppThunkType =>
    (dispatch: AppDispatchType) => {
        return authAPI
            .register(email, password)
            .then((res) => {
                console.log(res);
                dispatch(setRegistrationDoneAC(true));
            })
            .catch((e) => {
                const error = e.response.data as RegisterErrorType;
                dispatch(setRegistrationErrorAC(error.error));
            });
    };

export const setIsLoggedInAC = (value: boolean) =>
    ({ type: "AUTH/SET-IS-LOGGED-IN", value } as const);

export const setName = (name: string) =>
    ({ type: "AUTH/SET_NAME", name } as const);

export const setDataAC = (data: UserDataType) =>
    ({ type: "AUTH/SET-DATA", data } as const);

export const disableButtonAC = (disableButton: boolean) =>
    ({ type: "AUTH/TOGGLE_IS_FOLLOWING_PROGRESS", disableButton } as const);

export const setRegistrationErrorAC = (error: string) =>
    ({ type: "AUTH/REGISTRATION_ERROR", error } as const);

export const setRegistrationDoneAC = (registrationDone: boolean) =>
    ({ type: "AUTH/REGISTRATION_DONE", registrationDone } as const);

export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setName>
    | ReturnType<typeof setDataAC>
    | ReturnType<typeof disableButtonAC>
    | ReturnType<typeof setRegistrationErrorAC>
    | ReturnType<typeof setRegistrationDoneAC>;

export type UserDataType = {
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
    token?: string;
    tokenDeathTime?: number;
    __v?: number;
};

export type SenMessageForgotPasswordType = {
    email: string;
    from: string;
    message: string;
};

export type RegisterResponseType = {
    addedUser: {};
};

export type RegisterErrorType = {
    email: string;
    error: string;
    in: string;
};
