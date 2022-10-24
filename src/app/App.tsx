import React, { useEffect } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Router from '../common/routing/Route/Route';
import { CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from './store';
import { initializeAppTC } from './app-reducer';
import { Header } from '../common/components/Header/Header';

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
