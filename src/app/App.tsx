import React, { useEffect } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Router from '../common/routing/Route/Route';
import { CircularProgress } from '@mui/material';
import { initializeAppTC } from './app-reducer';
import { Header } from '../common/components/Header/Header';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { useAppSelector } from '../common/hooks/useAppSelector';

function App() {
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, []);

    if (!isInitialized) {
        return (
            <div className={'loader'}>
                <CircularProgress color="secondary" />
            </div>
        );
    }

    return (
        <div className="App">
            <HashRouter>
                <Header />
                <Router />
            </HashRouter>
        </div>
    );
}

export default App;
