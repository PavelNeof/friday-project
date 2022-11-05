import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../routing/Route/Route';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorSnackbars from '../ErrorSnackbars/ErrorSnackbars';
import { useAppSelector } from '../../hooks/useAppSelector';
import s from './Header.module.css';

export function Header() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const status = useAppSelector(state => state.app.status);
    const avatar = useAppSelector(state => state.auth.data.avatar);
    const name = useAppSelector(state => state.auth.data.name);

    return (
        <div>
            {status === 'loading' && (
                <div className={'linearProgress'}>
                    <LinearProgress color="secondary" />
                </div>
            )}
            <ErrorSnackbars />
            <AppBar
                position="static"
                style={{
                    alignItems: 'flex-end',
                    backgroundColor: 'white',
                }}
            >
                <div>

                    <div >
                        {isLoggedIn ? (
                            <NavLink
                                to={PATH.PROFILE}
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <div className={s.block}>
                                <div className={s.name}>{name}</div>
                                {avatar
                                    ? <img className={s.avatar} src={avatar} alt="avatar"/>
                                    : <div className={s.avatarNoPhoto}></div>}
                                </div>
                                Profile
                            </NavLink>
                        ) : (
                            <NavLink
                                to={PATH.LOGIN}
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                Sign In
                            </NavLink>
                        )}
                    </div>
                </div>
            </AppBar>
        </div>
    );
}
