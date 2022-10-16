import { authAPI } from "../dal/api";
import { Dispatch } from "redux";
import { Params } from "react-router-dom";

const initState = {
    isLoggedIn: false,
    disableButton: false,
    name: "",
    data: {} as SetDataType,
};
type InitialStateType = typeof initState;

export const authReducer = (
    state = initState,
    action: AuthActionsType
): InitialStateType => {
    switch (action.type) {
        case "auth/SET-IS-LOGGED-IN":
            return { ...state, isLoggedIn: action.value };
        case "auth/SET_NAME":
            return { ...state, name: action.name };
        case "auth/SET-DATA":
            return { ...state, data: action.data };
        case "auth/TOGGLE_IS_FOLLOWING_PROGRESS":
            return { ...state, disableButton: action.disableButton };
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
    (password: string, resetPasswordToken: Readonly<Params<string>>) =>
    (dispatch: Dispatch) => {
        // authAPI.setNewPassword(password, { resetPasswordToken });
    };

export const setIsLoggedInAC = (value: boolean) =>
    ({ type: "auth/SET-IS-LOGGED-IN", value } as const);

export const setName = (name: string) =>
    ({ type: "auth/SET_NAME", name } as const);

export const setDataAC = (data: SetDataType) =>
    ({ type: "auth/SET-DATA", data } as const);

export const disableButtonAC = (disableButton: boolean) =>
    ({ type: "auth/TOGGLE_IS_FOLLOWING_PROGRESS", disableButton } as const);

export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setName>
    | ReturnType<typeof setDataAC>
    | ReturnType<typeof disableButtonAC>;

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
