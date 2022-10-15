import React from "react";
import SuperButton from "./SuperButton/SuperButton";
import SuperInputText from "./SuperInput/SuperInputText";
import SuperCheckbox from "./SuperCheckbox/SuperCheckbox";

function Test() {
    return (
        <div>
            <div>
                <SuperButton />
            </div>
            <div>
                <SuperInputText />
            </div>
            <div>
                <SuperCheckbox />
            </div>
        </div>
    );
}

export default Test;
