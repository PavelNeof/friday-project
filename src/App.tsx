import React from 'react';
import logo from './logo.svg';
import './App.css';
import SuperButton from "./Component/SuperButton";
import SuperInputText from "./Component/SuperInputText";
import SuperCheckbox from "./Component/SuperCheckbox";

function App() {
    return (
        <div className="App">
            <div>
                <SuperButton/>
            </div>
            <div>
                <SuperInputText/>
            </div>
            <div>
                <SuperCheckbox/>
            </div>
        </div>
    );
}

export default App;
