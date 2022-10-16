import React from "react";
import "../../../app/App.css";
import { Route, Routes } from "react-router-dom";
import Test from "../../../features/Test/Test";
import Error404 from "../../../features/Error404/Error404";
import { Profile } from "../../../features/Profile/Profile";
import { ForgotPassword } from "../../../features/ForgotPassword/ForgotPassword";
import { NewPassword } from "../../../features/ForgotPassword/NewPassword";
import Login from "../../../features/Login/Login";

export const PATH = {
    MAIN: "/",
    LOGIN: "/login",
    REGISTRATION: "/registration",
    ERROR: "/error",
    PROFILE: "/profile",
    FORGOT_PASSWORD: "/forgotPassword",
    ENTER_PASSWORD: "/enterPassword",
    NEW_PASSWORD: "/set-new-password/:token",
    // add paths
};

function Router() {
    return (
        <div>
            <Routes>
                <Route path={PATH.MAIN} element={<Test />} />
                <Route path={PATH.LOGIN} element={<Login />} />
                <Route
                    path={PATH.NEW_PASSWORD}
                    element={
                        <div>
                            {" "}
                            <NewPassword />{" "}
                        </div>
                    }
                />

                <Route
                    path={PATH.REGISTRATION}
                    element={<div> registration </div>}
                />

                <Route
                    path={PATH.ERROR}
                    element={
                        <div>
                            {" "}
                            <Error404 />{" "}
                        </div>
                    }
                />
                <Route
                    path={PATH.PROFILE}
                    element={
                        <div>
                            {" "}
                            <Profile />
                        </div>
                    }
                />
                <Route
                    path={PATH.FORGOT_PASSWORD}
                    element={
                        <div>
                            {" "}
                            <ForgotPassword />{" "}
                        </div>
                    }
                />
                <Route
                    path={PATH.ENTER_PASSWORD}
                    element={<div> enter Password </div>}
                />

                {/*он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                {/*  <Route path={'/*'} element={<Error404/>}/>*/}
            </Routes>
        </div>
    );
}

export default Router;
