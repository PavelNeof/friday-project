import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { logoutTC } from '../../../features/auth/auth-reducer';
import { Navigate, NavLink } from 'react-router-dom';
import { PATH } from '../../routing/Route/Route';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorSnackbars from '../ErrorSnackbars/ErrorSnackbars';

export function Header() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const status = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();

    const onClickHandlerProfile = () => {};

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
                    <Button
                        style={{
                            color: 'white',
                            backgroundColor: '#366EFF',
                            boxShadow:
                                '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
                            borderRadius: '30px',
                            padding: '5px 25px 5px 25px',
                            fontFamily: 'Montserrat',
                            textTransform: 'capitalize',
                        }}
                    >
                        {isLoggedIn ? (
                            <NavLink
                                to={PATH.PROFILE}
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                            >
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
                    </Button>
                </Toolbar>
                {/*</div>*/}
            </AppBar>
        </div>
    );
}
