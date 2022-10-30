import React from 'react';
import '../../../app/App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Error404 from '../../components/Error404/Error404';
import { Profile } from '../../../features/profile/Profile';
import { ForgotPassword } from '../../../features/auth/ForgotPassword/ForgotPassword';
import { NewPassword } from '../../../features/auth/ForgotPassword/NewPassword';
import { Registration } from '../../../features/auth/Registration/Registration';
import Login from '../../../features/auth/Login/Login';
import { Packs } from '../../../features/packs/Packs';
import { AddNewCard } from '../../../features/cards/AddNewCard/AddNewCard';
import { Cards } from '../../../features/cards/Cards';
import { MyCards } from '../../../features/cards/MyCards/MyCards';
import { Learn } from '../../../features/learn/Learn';

export const PATH = {
    MAIN: '/',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    ERROR_404: '/error',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgotPassword',
    ENTER_PASSWORD: '/enterPassword',
    NEW_PASSWORD: '/set-new-password/:token',
    PACKS: '/packs',
    CARDS: '/cards',
    MY_CARDS: '/my-cards',
    ADD_NEW_CARD: '/add-new-card',
    LEARN: '/learn',
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
                <Route path={PATH.PACKS} element={<Packs />} />
                <Route path={`${PATH.CARDS}/:cardPackId`} element={<Cards />} />
                <Route path={`${PATH.MY_CARDS}/:cardPackId`} element={<MyCards />} />
                <Route
                    path={`${PATH.ADD_NEW_CARD}/:cardPackId`}
                    element={<AddNewCard />}
                />
                <Route path={`${PATH.LEARN}/:cardPackId`} element={<Learn />} />
                <Route path={'*'} element={<Navigate to={PATH.ERROR_404} />} />
            </Routes>
        </div>
    );
}

export default Router;
