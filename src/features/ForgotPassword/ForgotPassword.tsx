import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../layers/bll/store";
import { forgotPasswordTC } from "../../layers/bll/auth-reducer";

export const ForgotPassword = () => {
    let [newEmail, setNewEmail] = useState("");

    const dispatch = useAppDispatch();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.currentTarget.value);
        console.log(newEmail);
    };

    const onClickHandler = () => {
        dispatch(forgotPasswordTC(newEmail));
    };

    return (
        <>
            <div>
                <input onChange={onChangeHandler} value={newEmail} />
            </div>
            <button onClick={onClickHandler}>Send</button>
        </>
    );
};
