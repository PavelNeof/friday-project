import React from "react";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInput/SuperInputText";
import SuperCheckbox from "../../components/SuperCheckbox/SuperCheckbox";
import { Navigate } from "react-router-dom";
import { PATH } from "../../common/Routing/Route/Route";

function Test() {
    return <Navigate to={PATH.PROFILE} />;

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
