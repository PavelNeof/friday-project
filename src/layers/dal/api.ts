import axios, { AxiosResponse } from "axios";
import { SenMessageForgotPasswordType, SetDataType } from "../bll/auth-reducer";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:7542/2.0/"
            : "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
});

export const authAPI = {
    // me() {
    //     return instance.post<{ updatedUser: SetDataType; error?: string }>(
    //         `auth/me`
    //     );
    // },
    logout() {
        return instance.delete<{ info: string; error: string }>(`/auth/me`);
    },
    updateName(name: string) {
        return instance.put(`/auth/me`, { name });
    },
    forgotPassword(newEmail: string) {
        const message = {
            email: newEmail,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='http://localhost:3000/#/set-new-password/$token$'>
            link</a>
            </div>`,
        };
        return axios.post<{ info: string; error: string }>(
            `https://neko-back.herokuapp.com/2.0/auth/forgot`,
            message,
            { withCredentials: true }
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
};
