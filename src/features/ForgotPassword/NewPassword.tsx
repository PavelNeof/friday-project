import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../layers/bll/store";
import { setNewPasswordTC } from "../../layers/bll/auth-reducer";

export const NewPassword = () => {
    let [newPassword, setNewPassword] = useState("");

    const dispatch = useAppDispatch();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.currentTarget.value);
    };
    const { token } = useParams(); //{token: ':token'}

    const onClickHandler = () => {
        dispatch(setNewPasswordTC(newPassword, { token }));
    };

    return (
        <>
            <div>
                New password:
                <input onChange={onChangeHandler} value={newPassword} />
            </div>
            <div>
                <button onClick={onClickHandler}>Create</button>
            </div>
        </>
    );
};
