import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

export const NewPassword = () => {
    let [newPassword, setNewPassword] = useState("");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.currentTarget.value);
        console.log(e.currentTarget.value);
    };
    const onClickHandler = () => {};
    const object = useParams();

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
