import React from "react";
import { NavLink } from "react-router-dom";
import s from "../../../components/SuperButton/SuperButton.module.css";
import { PATH } from "../Route/Route";

function Header() {
    return (
        <div className={s.header}>
            <NavLink to={PATH.MAIN} className={s.button5}>
                Test
            </NavLink>

            <NavLink to={PATH.REGISTRATION} className={s.button5}>
                registration
            </NavLink>

            <NavLink to={PATH.ERROR} className={s.button5}>
                error
            </NavLink>

            <NavLink to={PATH.PROFILE} className={s.button5}>
                Profile
            </NavLink>

            <NavLink to={"/forgotPassword"} className={s.button5}>
                forgotPassword
            </NavLink>

            <NavLink to={"/set-new-password/:token"} className={s.button5}>
                newPassword
            </NavLink>

            <NavLink to={PATH.ENTER_PASSWORD} className={s.button5}>
                enterPassword
            </NavLink>
        </div>
    );
}

export default Header;
