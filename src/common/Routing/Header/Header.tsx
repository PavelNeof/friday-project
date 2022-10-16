import React from "react";
import { NavLink, Route } from "react-router-dom";
import s from "../../../components/SuperButton/SuperButton.module.css";

function Header() {
    return (
        <div className={s.header}>
            <NavLink to={"/"} className={s.button5}>
                Test
            </NavLink>

            <NavLink to={"/registration"} className={s.button5}>
                registration
            </NavLink>

            <NavLink to={"/error"} className={s.button5}>
                error
            </NavLink>

            <NavLink to={"/profile"} className={s.button5}>
                Profile
            </NavLink>

            <NavLink to={"/forgotPassword"} className={s.button5}>
                forgotPassword
            </NavLink>
            <NavLink to={"/set-new-password/:token"} className={s.button5}>
                newPassword
            </NavLink>

            <NavLink to={"/enterPassword"} className={s.button5}>
                enterPassword
            </NavLink>
        </div>
    );
}

export default Header;
