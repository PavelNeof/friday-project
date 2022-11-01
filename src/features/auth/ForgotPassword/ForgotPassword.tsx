import React, { ChangeEvent, useState } from 'react';
import { forgotPasswordTC } from '../auth-reducer';
import styles from '../Registration/Registration.module.css';
import { Button, FormControl, Grid } from '@mui/material';
import s from './ForgotPassword.module.css';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../../common/routing/Route/Route';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

export const ForgotPassword = () => {
    let [newEmail, setNewEmail] = useState('');
    const disable = useAppSelector(state => state.auth.disableButton);

    const dispatch = useAppDispatch();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.currentTarget.value);
    };

    const onClickHandler = () => {
        dispatch(forgotPasswordTC(newEmail));
    };

    return (
        <>
            <Grid container className={styles.container}>
                <FormControl
                    className={styles.signUpForm}
                    style={{ border: '1px white solid' }}
                >
                    <h1>Forgot your password?</h1>
                    <div>
                        <input
                            onChange={onChangeHandler}
                            value={newEmail}
                            placeholder={'Email'}
                            className={s.input}
                        />
                    </div>
                    <div className={s.text}>
                        Enter your email address and we will send you further instructions
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
                        disabled={disable}
                        onClick={onClickHandler}
                    >
                        Send
                    </Button>
                    <div className={s.text2}>Did you remember your password?</div>
                    <p className={styles.right}>
                        <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
                    </p>
                </FormControl>
            </Grid>
        </>
    );
};
