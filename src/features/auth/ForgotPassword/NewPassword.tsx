import React, {ChangeEvent, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {setNewPasswordTC} from '../auth-reducer';
import styles from "../Registration/Registration.module.css";
import {Button, FormControl, Grid} from "@mui/material";
import s from "./ForgotPassword.module.css";

export const NewPassword = () => {
    let [newPassword, setNewPassword] = useState('');
    const disable = useAppSelector(state => state.auth.disableButton);

    const dispatch = useAppDispatch();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.currentTarget.value);
    };
    const {token} = useParams<{ token: string }>();

    const onClickHandler = () => {
        dispatch(setNewPasswordTC(newPassword, token!));
    };

    return (
        <>
            <Grid container className={styles.container}>
                <FormControl
                    className={styles.signUpForm}
                    style={{border: '1px white solid'}}
                >
                    <div>
                        <h1>Create new password?</h1>
                        <input onChange={onChangeHandler} value={newPassword} placeholder={'Password'}
                               className={s.input}/>
                    </div>

                    <div className={s.text}>
                        Create new password and we will send you further instructions to email
                    </div>



                        <Button
                            style={{
                                color: 'white',
                                backgroundColor: '#366EFF',
                                borderRadius: '30px',
                                height: '40px',
                                boxShadow:
                                    '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
                                fontSize: '16px',
                                textTransform: 'capitalize',
                                width: '60%',
                            }}
                            onClick={onClickHandler}
                            disabled={disable}>Create</Button>

                </FormControl>
            </Grid>
        </>
    );
};
