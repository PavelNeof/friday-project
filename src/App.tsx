import React from 'react';
import logo from './logo.svg';
import './App.css';
import SuperButton from "./Component/SuperButton";
import SuperInputText from "./Component/SuperInputText";
import SuperCheckbox from "./Component/SuperCheckbox";
import {HashRouter, Routes} from "react-router-dom";
import Router from "./Route";
import Header from "./store/Header";

export const PATH = {
    LOGIN: '/login',
    registration: '/registration',
    error: '/error',
    MAIN:'/'
    // add paths
}
/*логинизация
регистрация
профайл
404 (можно застилизовать заранее)
восстановление пароля
ввод нового пароля
тестовая - отобразить/продемонстрировать все SuperКопмоненты*/
function App() {
    return (
        <div className="App">
            <HashRouter>
                <Header />
            <Router/>
        </HashRouter>

        </div>
    );
}

export default App;
