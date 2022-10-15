import React from "react";
import "./App.css";
import { HashRouter, Routes } from "react-router-dom";
import Router from "../common/Routing/Route/Route";
import Header from "../common/Routing/Header/Header";

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
