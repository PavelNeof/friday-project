import React from 'react'
import {NavLink, Route} from "react-router-dom";
import s from '../SuperButton/SuperButton.module.css'
import {PATH} from "../../Route";

function Header() {
    return (
        <div className={s.header}>

            <NavLink to={'/'} className={s.button5}>Test</NavLink>

            <NavLink to={'/registration'} className={s.button5}>registration</NavLink>

            <NavLink to={'/error'} className={s.button5}>error</NavLink>

            <NavLink to={'/passwordRecovery'} className={s.button5}>passwordRecovery</NavLink>

            <NavLink to={'/enterPassword'} className={s.button5}>enterPassword</NavLink>

        </div>
    )
}

export default Header
