import React from 'react';
import '../../../app/App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Error404 from '../../components/Error404/Error404';
import { Profile } from '../../../features/profile/Profile';
import { ForgotPassword } from '../../../features/auth/ForgotPassword/ForgotPassword';
import { NewPassword } from '../../../features/auth/ForgotPassword/NewPassword';
import { Registration } from '../../../features/auth/Registration/Registration';
import Login from '../../../features/auth/Login/Login';

export const PATH = {
    MAIN: '/',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    ERROR_404: '/error',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgotPassword',
    ENTER_PASSWORD: '/enterPassword',
    NEW_PASSWORD: '/set-new-password/:token',
};

function Router() {
    return (
        <div>
            <Routes>
                <Route path={PATH.MAIN} element={<Navigate to={PATH.LOGIN} />} />
                <Route path={PATH.LOGIN} element={<Login />} />
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
                <Route path={PATH.REGISTRATION} element={<Registration />} />
                <Route path={PATH.ERROR_404} element={<Error404 />} />
                <Route path={PATH.PROFILE} element={<Profile />} />
                <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={PATH.ENTER_PASSWORD} element={<div> enter Password </div>} />
                <Route path={'*'} element={<Navigate to={PATH.ERROR_404} />} />
            </Routes>
        </div>
    );
}

export default Router;
