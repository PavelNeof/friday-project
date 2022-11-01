import axios, { AxiosResponse } from 'axios';
import { RegisterResponseType, UserDataType } from './auth-reducer';
import { instance } from '../../common/api/api-config';

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<UserDataType>>(
            `auth/login`,
            data,
        );
    },
    logout() {
        return instance.delete<{ info: string; error?: string }>(`auth/me`);
    },
    me() {
        return instance.post<UserDataType>(`auth/me`);
    },
    updateName(name: string) {
        return instance.put(`auth/me`, { name });
    },
    forgotPassword(newEmail: string) {
        const message = {
            email: newEmail,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: #98d398; padding: 15px">
            password recovery link: 
            <a href='https://neko-back.herokuapp.com/2.0/#/set-new-password/$token$'>
            link</a>
            </div>`,
        };
        return axios.post<{ info: string; error: string }>(
            `https://neko-back.herokuapp.com/2.0/auth/forgot`,
            message,
        );
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<{ info: string; error: string }>('auth/set-new-password', {
            password,
            resetPasswordToken,
        });
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>(`auth/register`, {
            email,
            password,
        });
    },
};

// types

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
};
