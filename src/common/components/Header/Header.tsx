import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { logoutTC } from '../../../features/auth/auth-reducer';
import { Navigate, NavLink } from 'react-router-dom';
import { PATH } from '../../routing/Route/Route';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorSnackbars from '../ErrorSnackbars/ErrorSnackbars';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import s from './Header.module.css';

export function Header() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const status = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();

    const onClickHandlerProfile = () => {};

    const name = useAppSelector(state => state.auth.data.name);

    //  return <Navigate to={PATH.PROFILE}

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
                {/*<div style={{ height: '100%', width: '90%', margin: '0 auto' }}>*/}
                <Toolbar>
                    {/*<Button*/}
                    {/*    style={{*/}
                    {/*        color: 'white',*/}
                    {/*        backgroundColor: '#366EFF',*/}
                    {/*        boxShadow:*/}
                    {/*            '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',*/}
                    {/*        borderRadius: '30px',*/}
                    {/*        padding: '5px 25px 5px 25px',*/}
                    {/*        fontFamily: 'Montserrat',*/}
                    {/*        textTransform: 'capitalize',*/}
                    {/*    }}*/}
                    {/*>*/}
                    <div>
                        {isLoggedIn ? (
                            <NavLink
                                to={PATH.PROFILE}
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
                                <div className={s.name}>{name}</div>
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
                    {/*</Button>*/}
                    </div>
                </Toolbar>
                {/*</div>*/}
            </AppBar>
        </div>
    );
}
