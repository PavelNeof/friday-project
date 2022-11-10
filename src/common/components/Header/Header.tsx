import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../routing/Route/Route';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorSnackbars from '../ErrorSnackbars/ErrorSnackbars';
import { useAppSelector } from '../../hooks/useAppSelector';
import s from './Header.module.css';
import {BackToPackList} from "../BackToPackList/BackToPackList";
import PopoverHeader from "../Popover/PopoverHeader";

export function Header() {

    const status = useAppSelector(state => state.app.status);

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
                <div className={s.header}>
                    <PopoverHeader/>
                </div>
            </AppBar>
        </div>
    );
}
