import { ChangeEvent, useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType, useAppDispatch } from "../../layers/bll/store";
import { logoutTC, updateName } from "../../layers/bll/auth-reducer";

export const Profile = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(
        (state) => state.auth.isLoggedIn
    );
    const name = useSelector<AppStateType, string>(
        (state) => state.auth.data.name
    );
    const email = useSelector<AppStateType, string>(
        (state) => state.auth.data.email
    );
    const avatar = useSelector<AppStateType, string | undefined>(
        (state) => state.auth.data.avatar
    );
    const disable = useSelector<AppStateType, boolean>(
        (state) => state.auth.disableButton
    );

    const dispatch = useAppDispatch();

    let [editMode, setEditMode] = useState(false);
    let [currentName, setCurrentName] = useState(name);

    useEffect(() => {
        setCurrentName(currentName);
    }, [currentName]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        dispatch(updateName(currentName));
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentName(e.currentTarget.value);
    };

    // if(!isLoggedIn){
    //     return <Navigate to={'/login'}/>
    // }

    return (
        <>
            avatar: {avatar}
            <div>
                {!editMode && (
                    <div>
                        <span onDoubleClick={activateEditMode}>
                            name:{currentName || email || "---"}
                        </span>
                    </div>
                )}
                {editMode && (
                    <div>
                        <input
                            autoFocus={true}
                            onChange={onStatusChange}
                            onBlur={deactivateEditMode}
                            value={name}
                        />
                    </div>
                )}
            </div>
            <button
                disabled={disable}
                onClick={() => {
                    dispatch(logoutTC());
                }}
            >
                LogOut
            </button>
        </>
    );
};
