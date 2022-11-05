import { authAPI, LoginParamsType } from './auth-api';
import { AppDispatchType, AppThunkType } from '../../app/store';
import { AxiosError } from 'axios';
import { setAppStatusAC } from '../../app/app-reducer';
import { errorsHandling } from '../../common/utils/error-utils';

const initState = {
    isLoggedIn: false,
    disableButton: false,
    name: '',
    avatar:'',
    data: {} as UserDataType,
    registrationError: '',
    registrationDone: false,
};
type InitialStateType = typeof initState;

export const authReducer = (
    state = initState,
    action: AuthActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value };
        case 'AUTH/SET_NAME':
            return { ...state, name: action.name };
        case 'AUTH/SET_AVATAR':
            return { ...state, avatar: action.avatar };
        case 'AUTH/SET-DATA':
            return { ...state, data: action.data };
        case 'AUTH/TOGGLE_IS_FOLLOWING_PROGRESS':
            return { ...state, disableButton: action.disableButton };
        case 'AUTH/REGISTRATION_DONE':
            return { ...state, registrationDone: action.registrationDone };
        default:
            return state;
    }
};

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'AUTH/SET-IS-LOGGED-IN', value } as const);

export const setName = (name: string) => ({ type: 'AUTH/SET_NAME', name } as const);

export const setAvatar = (avatar: string) => ({ type: 'AUTH/SET_AVATAR', avatar } as const);

export const setDataAC = (data: UserDataType) =>
    ({ type: 'AUTH/SET-DATA', data } as const);

export const disableButtonAC = (disableButton: boolean) =>
    ({ type: 'AUTH/TOGGLE_IS_FOLLOWING_PROGRESS', disableButton } as const);

export const setRegistrationErrorAC = (error: string) =>
    ({ type: 'AUTH/REGISTRATION_ERROR', error } as const);

export const setRegistrationDoneAC = (registrationDone: boolean) =>
    ({ type: 'AUTH/REGISTRATION_DONE', registrationDone } as const);

// thunks
export const loginTC =
    (data: LoginParamsType): AppThunkType =>
    async dispatch => {
        try {
            dispatch(setAppStatusAC('loading'));
            const res = await authAPI.login(data);
            dispatch(setIsLoggedInAC(true));
            dispatch(setDataAC(res.data));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        } finally {
            dispatch(setAppStatusAC('succeeded'));
        }
    };

export const logoutTC = (): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'));
        dispatch(disableButtonAC(true));
        await authAPI.logout();
        dispatch(setIsLoggedInAC(false));
        dispatch(setDataAC({} as UserDataType));
    } catch (e) {
        errorsHandling(e as Error | AxiosError, dispatch);
    } finally {
        dispatch(disableButtonAC(false));
        dispatch(setAppStatusAC('succeeded'));
    }
};

export const updateName =
    (name: string): AppThunkType =>
    dispatch => {
        dispatch(disableButtonAC(true));
        authAPI
            .updateName(name)
            .then(res => {
                if (!res.data.error) {
                    dispatch(setName(res.data.updatedUser.name));
                }
                //dispatch(setAppStatusAC('succeeded'))
            })
            .finally(() => {
                dispatch(disableButtonAC(false));
            });
    };

export const updateAvatar =
    (avatar: string): AppThunkType =>
        dispatch => {
            dispatch(disableButtonAC(true));
            authAPI
                .updateAvatar(avatar)
                .then(res => {
                    if (!res.data.error) {
                        dispatch(setAvatar(res.data.updatedUser.avatar));
                    }
                    //dispatch(setAppStatusAC('succeeded'))
                })
                .finally(() => {
                    dispatch(disableButtonAC(false));
                });
        };

export const forgotPasswordTC =
    (newEmail: string): AppThunkType =>
    dispatch => {
        dispatch(disableButtonAC(true));
        authAPI
            .forgotPassword(newEmail)
            .then(res => {
                if (res.data.error) {
                    alert(res.data.error);
                }
                if (!res.data.error) {
                    alert('Check your email!');
                }
            })
            .catch(err => {
                alert(err.message);
            })
            .finally(() => {
                dispatch(disableButtonAC(false));
            });
    };

export const setNewPasswordTC =
    (password: string, resetPasswordToken: string): AppThunkType =>
    dispatch => {
        dispatch(disableButtonAC(true));
        authAPI
            .setNewPassword(password, resetPasswordToken)
            .then(res => {
                if (!res.data.error) {
                    alert('Success!');
                }
            })
            .catch(err => {
                alert(err.message);
            })
            .finally(() => {
                dispatch(disableButtonAC(false));
            });
    };

export const setRegistrationTC =
    (email: string, password: string): AppThunkType =>
    async (dispatch: AppDispatchType) => {
        try {
            await authAPI.register(email, password);
            dispatch(setRegistrationDoneAC(true));
        } catch (e) {
            errorsHandling(e as Error | AxiosError, dispatch);
        }
    };

// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setName>
    | ReturnType<typeof setAvatar>
    | ReturnType<typeof setDataAC>
    | ReturnType<typeof disableButtonAC>
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
