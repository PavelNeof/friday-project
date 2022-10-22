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
            <div
                style={{
                    position: 'fixed',
                    top: '30%',
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                <CircularProgress />
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
