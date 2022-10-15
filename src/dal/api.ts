import axios, { AxiosResponse } from "axios";
import { SetDataType } from "../store/auth-reducer";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:7542/2.0/"
            : "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
});

export const authAPI = {
    me() {
        return instance.post<{ updatedUser: SetDataType; error?: string }>(
            `auth/me`
        );
    },
    logout() {
        return instance.delete<{ info: string; error: string }>(`/auth/me`);
    },
    updateName(name: string) {
        return instance.put(`/auth/me`, { name });
    },
};
