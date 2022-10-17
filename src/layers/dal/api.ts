import axios, { AxiosResponse } from "axios";
import {
    RegisterResponseType,
    SenMessageForgotPasswordType,
    UserDataType,
} from "../bll/auth-reducer";

export const instance = axios.create({
    baseURL:
        process.env.REACT_APP_BACK_URL ||
        "https://neko-back.herokuapp.com/2.0/",
    // baseURL:
    //     process.env.NODE_ENV === "development"
    //         ? "http://localhost:7542/2.0/"
    //         : "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
});

export const authAPI = {
    me() {
        return instance.post<void, AxiosResponse<UserDataType>>(`auth/me`);
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<UserDataType>>(
            `auth/login`,
            data
        );
    },
    logout() {
        return instance.delete<{ info: string; error?: string }>(`/auth/me`);
    },
    updateName(name: string) {
        return instance.put(`/auth/me`, { name });
    },
    forgotPassword(newEmail: string) {
        const message = {
            email: newEmail,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: #98d398; padding: 15px">
            password recovery link: 
            <a href='http://localhost:3000/#/set-new-password/$token$'>
            link</a>
            </div>`,
        };
        return axios.post<{ info: string; error: string }>(
            `https://neko-back.herokuapp.com/2.0/auth/forgot`,
            message
        );
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<{ info: string; error: string }>(
            "auth/set-new-password",
            {
                password,
                resetPasswordToken,
            }
        );
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>(`/auth/register`, {
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
