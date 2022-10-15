import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Test from "./Component/Test";
import Error404 from "./Component/Error404";
import {Profile} from "./Component/Profile/Profile";


export const PATH = {
    LOGIN: '/login',
    registration: '/registration',
    error: '/error',

    Profile: '/profile',
    enterPassword: '/enterPassword',
    TEST:'/'
    // add paths
}

function Router() {
    return (
        <div>
            <Routes>

                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={PATH.LOGIN} element={<div> LOGIN </div>}/>
                <Route path={PATH.registration} element={<div> registration </div>}/>
                <Route path={PATH.error} element={<div> <Error404/> </div>}/>
                <Route path={PATH.Profile} element={<div> <Profile/></div>}/>
                <Route path={PATH.enterPassword} element={<div> enter Password </div>}/>


                {/*он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                {/*  <Route path={'/*'} element={<Error404/>}/>*/}
            </Routes>

        </div>
    );
}

export default Router;
