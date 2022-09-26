import React from 'react';
import logo from './logo.svg';
import './App.css';
import SuperButton from "./Component/SuperButton";
import SuperInputText from "./Component/SuperInputText";
import SuperCheckbox from "./Component/SuperCheckbox";

function App() {
    return (
        <div className="App">
            <SuperButton/>
            <SuperInputText/>
            <SuperCheckbox />
        </div>
    );
}

    export default App;
