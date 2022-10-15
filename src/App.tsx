import React from "react";
import "./App.css";
import { HashRouter, Routes } from "react-router-dom";
import Router from "./Common/Route";
import Header from "./Component/Header/Header";

function App() {
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
