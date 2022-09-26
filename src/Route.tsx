import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Test from "./Component/Test";
import Error404 from "./Component/Error404";


export const PATH = {
    LOGIN: '/login',
    registration: '/registration',
    error: '/error',

    passwordRecovery: '/passwordRecovery',
    enterPassword: '/enterPassword',
    TEST:'/'
    // add paths
}

function Router() {
    return (
        <div>
            <Routes>

                в начале мы попадаем на страницу '/' и переходим сразу на страницу PRE_JUNIOR

                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={PATH.LOGIN} element={<div> LOGIN </div>}/>
                <Route path={PATH.registration} element={<div> registration </div>}/>
                <Route path={PATH.error} element={<div> <Error404/> </div>}/>
                <Route path={PATH.passwordRecovery} element={<div> password Recovery </div>}/>
                <Route path={PATH.enterPassword} element={<div> enter Password </div>}/>
                // add routes

                {/*он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                {/*  <Route path={'/*'} element={<Error404/>}/>*/}
            </Routes>

        </div>
    );
}

export default Router;
