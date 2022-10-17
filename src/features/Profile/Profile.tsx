import { ChangeEvent, useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { AppStateType, useAppDispatch } from "../../layers/bll/store";
import { logoutTC, updateName } from "../../layers/bll/auth-reducer";
import { PATH } from "../../common/Routing/Route/Route";
import { Button, FormControl, Grid } from "@mui/material";
import styles from "../Registration/Registration.module.css";
import styleProfile from "./Profile.module.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setCurrentName(e.currentTarget.value);
    };

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return (
        <>
            <Grid container className={styles.container}>
                <FormControl
                    className={styles.signUpForm}
                    style={{ border: "1px white solid" }}
                >
                    <div className={styleProfile.profile}>
                        <h1>Personal Information</h1>

                        <div>avatar: {avatar}</div>
                        <div>
                            {!editMode && (
                                <div>
                                    <span onDoubleClick={activateEditMode}>
                                        {currentName || email || "---"}
                                    </span>
                                    <span
                                        style={{ color: "#414141" }}
                                        onClick={activateEditMode}
                                    >
                                        {" "}
                                        <BorderColorIcon />{" "}
                                    </span>
                                </div>
                            )}
                            {editMode && (
                                <div>
                                    <input
                                        autoFocus={true}
                                        onChange={onNameChange}
                                        onBlur={deactivateEditMode}
                                        value={currentName}
                                    />
                                    <button
                                        onClick={deactivateEditMode}
                                        style={{
                                            backgroundColor: "#366eff",
                                            color: "white",
                                            border: "#366eff",
                                        }}
                                    >
                                        SAVE
                                    </button>
                                </div>
                            )}
                        </div>

                        <span style={{ color: "#868686FF" }}> {email} </span>
                        <Button
                            style={{
                                color: "black",
                                backgroundColor: "#ffffff",
                                boxShadow:
                                    "0px 4px 18px rgba(54, 110, 255, 0.6), inset 0px 1px 0px rgba(255, 255, 255, 0.5)",
                                borderRadius: "30px",
                                padding: "5px 25px 5px 25px",
                                fontFamily: "Montserrat",
                                textTransform: "capitalize",
                            }}
                            disabled={disable}
                            onClick={() => {
                                dispatch(logoutTC());
                            }}
                        >
                            LogOut
                        </Button>
                    </div>
                </FormControl>
            </Grid>
        </>
    );
};
