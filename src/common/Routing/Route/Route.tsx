import React from "react";
import "../../../app/App.css";
import { Route, Routes } from "react-router-dom";
import Test from "../../../features/Test/Test";
import Error404 from "../../../features/Error404/Error404";
import { Profile } from "../../../features/Profile/Profile";
import { ForgotPassword } from "../../../features/ForgotPassword/ForgotPassword";
import { NewPassword } from "../../../features/ForgotPassword/NewPassword";

export const PATH = {
    LOGIN: "/login",
    REGISTRATION: "/registration",
    ERROR: "/error",
    PROFILE: "/profile",
    FORGOTPASSWORD: "/forgotPassword",
    ENTER_PASSWORD: "/enterPassword",
    newPassword: "/set-new-password/:token",
    TEST: "/",
    // add paths
};

function Router() {
    return (
        <div>
            <Routes>
                <Route path={PATH.TEST} element={<Test />} />
                <Route path={PATH.LOGIN} element={<div> LOGIN </div>} />
                <Route
                    path={PATH.newPassword}
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
                    path={PATH.FORGOTPASSWORD}
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
